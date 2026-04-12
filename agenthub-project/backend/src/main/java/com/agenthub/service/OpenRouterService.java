package com.agenthub.service;

import com.agenthub.model.dto.Mensaje;
import com.agenthub.model.dto.OpenRouterRequest;
import com.agenthub.model.dto.OpenRouterResponse;
import com.agenthub.model.dto.Tool;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

/**
 * OpenRouterService — Gestiona toda la comunicación con la API de OpenRouter.
 *
 * OpenRouter es un proxy que da acceso unificado a múltiples LLMs (Claude, GPT, Gemini, etc.)
 * usando el mismo formato de API compatible con OpenAI.
 *
 * Este servicio implementa el patrón de "tool use" en dos fases:
 *
 *   FASE 1 — Petición inicial:
 *     Enviamos al LLM el system prompt, el mensaje del usuario y las herramientas disponibles.
 *     El LLM decide si responde directamente o si necesita llamar a una herramienta.
 *
 *   FASE 2 — Si el LLM llama a una herramienta (tool_call):
 *     Ejecutamos la herramienta via McpClientService (POST al servidor MCP correspondiente).
 *     Enviamos el resultado de vuelta al LLM para que redacte la respuesta final.
 *
 * Flujo visual:
 *   Usuario → [FASE 1] LLM → tool_call → McpClientService → resultado → [FASE 2] LLM → respuesta
 *   Usuario → [FASE 1] LLM → respuesta directa (sin herramientas)
 */

@Service
@RequiredArgsConstructor
public class OpenRouterService {

    // URL de la API de OpenRouter — configurada en application.properties
    @Value("${openrouter.api.url}")
    private String apiUrl;

    @Value("${openrouter.api.key}")
    private String apiKey;

    // Cliente HTTP de Spring para hacer peticiones REST a OpenRouter
    private final RestTemplate restTemplate = new RestTemplate();

    // Servicio que ejecuta las herramientas en el servidor MCP correspondiente
    private final McpClientService mcpClientService; 

    /**
     * Envía un mensaje al LLM y gestiona el ciclo completo de tool use.
     *
     * @param systemPrompt  Personalidad y reglas del agente (guardadas en BD)
     * @param mensajeUsuario Texto que escribió el usuario
     * @param herramientas  Lista de tools disponibles para este agente (null si no tiene)
     * @param modeloAgente  Modelo de IA a usar, guardado por agente en BD
     *                      Ejemplo: "anthropic/claude-3-haiku", "openai/gpt-oss-20b:free"
     * @return Respuesta final en texto para mostrar al usuario
     */

    public String chatearConAgente(String systemPrompt, String mensajeUsuario, List<Tool> herramientas, String modeloAgente) {

        // ── CABECERAS HTTP ────────────────────────────────────────────────────
        // OpenRouter requiere Authorization Bearer + cabeceras opcionales de identificación
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey.trim()); // .trim() evita espacios ocultos 
        headers.set("HTTP-Referer", "http://localhost:8080"); // Identifica el origen de la petición
        headers.set("X-Title", "AgentHub"); // Nombre visible en el dashboard de OpenRouter

        // ── CONSTRUCCIÓN DEL CONTEXTO ─────────────────────────────────────────
        // OpenRouter (como OpenAI) usa una lista de mensajes con roles:
        //   "system"    → instrucciones del agente (no visible para el usuario)
        //   "user"      → mensaje del usuario
        Mensaje mensajeSistema = new Mensaje("system", systemPrompt);
        Mensaje preguntaUsuario = new Mensaje("user", mensajeUsuario);

        // ── PETICIÓN A OPENROUTER (FASE 1) ────────────────────────────────────
        OpenRouterRequest requestBody = new OpenRouterRequest();
        requestBody.setModelo(modeloAgente); // Modelo específico del agente
        requestBody.setMensajes(List.of(mensajeSistema, preguntaUsuario)); // Contexto de la conversación

        // Si el agente tiene herramientas, las incluimos en el request.
        // OpenRouter las pasa al LLM en formato OpenAI function calling.
        // temperature=0.1 está configurado en OpenRouterRequest para respuestas consistentes.
        if (herramientas != null && !herramientas.isEmpty()) {
            requestBody.setTools(herramientas);
        }

        HttpEntity<OpenRouterRequest> requestEntity = new HttpEntity<>(requestBody, headers);

        // Log de debug — muestra el JSON exacto que se envía a OpenRouter
        try {
            ObjectMapper mapperEnvio = new ObjectMapper();
            System.out.println("📤 PAQUETE ENVIADO A LA IA:");
            System.out.println(mapperEnvio.writerWithDefaultPrettyPrinter().writeValueAsString(requestBody));
        } catch (Exception e) {
            System.out.println("Error imprimiendo el paquete de envío");
        }

        try {
            // Pedimos el JSON como String puro para poder loggearlo antes de deserializar.
            // Esto facilita el debug cuando el LLM devuelve campos inesperados.
            String jsonPuro = restTemplate.postForObject(apiUrl, requestEntity, String.class);
            System.out.println("JSON PURO DE OPENROUTER:");
            System.out.println(jsonPuro);

            // Deserializamos ignorando campos desconocidos — distintos modelos devuelven
            // campos extra (reasoning, refusal, etc.) que no están en nuestro DTO
            ObjectMapper mapper = new ObjectMapper();
            mapper.configure(com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            OpenRouterResponse response = mapper.readValue(jsonPuro, OpenRouterResponse.class);

            if (response != null && response.getElecciones() != null && !response.getElecciones().isEmpty()) {
                Mensaje respuestaIA = response.getElecciones().get(0).getMensaje();
            
                // ── RAMA A: EL LLM QUIERE USAR UNA HERRAMIENTA (tool_call) ───
                // Comprobamos tool_calls ANTES que contenido — cuando hay tool_call,
                // el campo content puede venir como texto parcial ("Voy a consultar...")
                // que NO es la respuesta final. Si comprobásemos content primero,
                // devolveríamos ese texto incompleto al usuario.
                if (respuestaIA != null && respuestaIA.getToolCalls() != null && !respuestaIA.getToolCalls().isEmpty()) {
            
                    // Extraemos qué herramienta quiere usar el LLM y con qué argumentos
                    // Ejemplo: nombre="buscar_boe", argumentos={"query":"despido improcedente"}
                    String nombreHerramienta = respuestaIA.getToolCalls().get(0).getFunction().getName();
                    String argumentos = respuestaIA.getToolCalls().get(0).getFunction().getArguments();
            
                    System.out.println("Herramienta solicitada: " + nombreHerramienta + " | Args: " + argumentos);


                    // Buscamos la URL del servidor MCP para esta herramienta.
                    // Cada Tool tiene guardada su mcpServerUrl (@JsonIgnore, no va a OpenRouter).
                    // Ejemplo: "http://mcp-legal:8001" (nombre de servicio Docker, no localhost)
                    String mcpServerUrl = herramientas == null ? null : herramientas.stream()
                        .filter(t -> t.getFunction().getName().equals(nombreHerramienta))
                        .map(Tool::getMcpServerUrl)
                        .findFirst()
                        .orElse(null);
            
                    if (mcpServerUrl == null) {
                        return "Error: no se encontró servidor MCP para la herramienta " + nombreHerramienta;
                    }
            
                    // ── EJECUCIÓN DE LA HERRAMIENTA VÍA MCP ──────────────────
                    // McpClientService hace POST a {mcpServerUrl}/tools/{nombreHerramienta}
                    // con los argumentos JSON. El servidor MCP (FastAPI + Tavily) ejecuta
                    // la búsqueda real y devuelve el resultado en texto.
                    String resultadoHerramienta = mcpClientService.ejecutarHerramienta(
                        mcpServerUrl, nombreHerramienta, argumentos
                    );
                    System.out.println("Resultado MCP: " + resultadoHerramienta);
            
                    // ── PETICIÓN A OPENROUTER (FASE 2) ────────────────────────
                    // Enviamos al LLM el resultado de la herramienta para que redacte
                    // la respuesta final. En esta segunda llamada NO enviamos las tools
                    // para evitar que el LLM vuelva a llamar a una herramienta en bucle.
                    Mensaje mensajeResultados = new Mensaje("user",
                        "Resultado de la herramienta " + nombreHerramienta + ":\n"
                        + resultadoHerramienta
                        + "\n\nRedacta la respuesta final para el usuario basándote en estos datos.");
            
                    // Mantenemos el contexto completo: system + pregunta original + resultado
                    List<Mensaje> conversacionFase2 = new java.util.ArrayList<>(requestBody.getMensajes());
                    conversacionFase2.add(mensajeResultados);
            
                    OpenRouterRequest requestFase2 = new OpenRouterRequest();
                    requestFase2.setModelo(modeloAgente); // Mismo modelo que en la fase 1
                    requestFase2.setMensajes(conversacionFase2);
                    // Sin tools en fase 2 — el LLM solo debe redactar, no volver a buscar
            
                    HttpEntity<OpenRouterRequest> entityFase2 = new HttpEntity<>(requestFase2, headers);
                    OpenRouterResponse responseFase2 = restTemplate.postForObject(apiUrl, entityFase2, OpenRouterResponse.class);
            
                    // Devolvemos la respuesta final redactada por el LLM al usuario
                    return responseFase2.getElecciones().get(0).getMensaje().getContenido();
            
                /// ── RAMA B: RESPUESTA DIRECTA DEL LLM (sin herramientas) ─────
                // El LLM respondió directamente sin necesitar herramientas externas
                } else if (respuestaIA != null && respuestaIA.getContenido() != null) {
                    return respuestaIA.getContenido();
                }
            }

            // Fallback — el LLM devolvió una respuesta vacía o mal formateada
            return "El agente no responde";

        } catch (Exception e) {
            System.err.println("Error en comunicacion con OpenRouter: " + e.getMessage());
            return "Error en la conexion con la IA";
        }
    }
}