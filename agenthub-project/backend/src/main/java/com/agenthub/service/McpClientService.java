package com.agenthub.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

/**
 * McpClientService — Cliente HTTP que ejecuta herramientas en los servidores MCP.
 *
 * En AgentHub, cada herramienta (Tool) tiene asociada una URL de servidor MCP
 * guardada en la BD (campo mcp_server_url de la tabla herramienta).
 *
 * Cuando el LLM decide usar una herramienta, este servicio:
 *   1. Construye la URL del endpoint: {mcpServerUrl}/tools/{nombreHerramienta}
 *   2. Deserializa los argumentos JSON que envió el LLM
 *   3. Hace un POST al servidor MCP con esos argumentos
 *   4. Devuelve el resultado en texto al OpenRouterService
 *
 * Arquitectura MCP en AgentHub:
 *   OpenRouterService → McpClientService → mcp-legal:8001 (FastAPI + Tavily)
 *
 * Nota: Aunque se llama "MCP" por el estándar Model Context Protocol,
 * la comunicación interna usa REST simple (FastAPI) en lugar del protocolo
 * MCP completo. Esto simplifica la integración con el backend Java
 * y evita problemas de compatibilidad con el SDK oficial de MCP.
 *
 * En producción (Railway), la URL cambia de:
 *   http://mcp-legal:8001  →  https://mcp-legal.agenthub.com
 * y se actualiza en la BD sin tocar código.
 */

@Service
@RequiredArgsConstructor
public class McpClientService {

    // Cliente HTTP de Spring para comunicarse con el servidor MCP
    private final RestTemplate restTemplate = new RestTemplate();
    // ObjectMapper de Jackson para deserializar el JSON de argumentos que manda el LLM
    private final ObjectMapper objectMapper = new ObjectMapper();


    /**
     * Ejecuta una herramienta en el servidor MCP correspondiente.
     *
     * @param mcpServerUrl      URL base del servidor MCP del agente
     *                          Ejemplo: "http://mcp-legal:8001"
     * @param nombreHerramienta Nombre técnico de la herramienta a ejecutar
     *                          Ejemplo: "buscar_boe", "consultar_articulo"
     * @param argumentosJson    JSON con los argumentos que generó el LLM
     *                          Ejemplo: {"query": "despido improcedente"}
     * @return Resultado de la herramienta en texto plano, listo para enviarlo al LLM
     */
    public String ejecutarHerramienta(String mcpServerUrl, String nombreHerramienta, String argumentosJson) {
        try {
            // ── 1. CONSTRUIR URL DEL ENDPOINT ────────────────────────────────
            // Cada herramienta expone su propio endpoint REST en el servidor MCP.
            // Convenio de rutas: /tools/{nombreHerramienta}
            // Ejemplo: http://mcp-legal:8001/tools/buscar_boe
            // Nota: "mcp-legal" es el nombre del servicio en docker-compose,
            // los contenedores se comunican por nombre de servicio, no por localhost.
            String url = mcpServerUrl + "/tools/" + nombreHerramienta;

            // ── 2. DESERIALIZAR ARGUMENTOS ────────────────────────────────────
            // El LLM devuelve los argumentos como String JSON.
            // Los convertimos a Map<String, Object> para enviarlos como body del POST.
            // Ejemplo de argumentosJson: {"query": "despido improcedente"}
            // Resultado: {"query" -> "despido improcedente"}
            Map<String, Object> argumentos = objectMapper.readValue(argumentosJson, Map.class);

            // ── 3. CONSTRUIR Y ENVIAR PETICIÓN HTTP ───────────────────────────
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(argumentos, headers);

            // POST al servidor MCP con los argumentos del LLM.
            // El servidor MCP (FastAPI) recibe el body, ejecuta la lógica
            // (en este caso, búsqueda en Tavily) y devuelve {"result": "..."}
            ResponseEntity<Map> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Map.class
            );

            // ── 4. EXTRAER Y DEVOLVER EL RESULTADO ───────────────────────────
            // El servidor MCP siempre devuelve {"result": "texto con el resultado"}.
            // Este texto lo recibirá OpenRouterService y lo mandará al LLM
            // para que redacte la respuesta final al usuario
            if (response.getBody() != null && response.getBody().containsKey("result")) {
                return (String) response.getBody().get("result");
            }

            // El servidor respondió 200 pero sin el campo "result" esperado
            return "La herramienta no devolvió resultado";

        } catch (Exception e) {
            // Capturamos cualquier error (timeout, servidor caído, JSON inválido...)
            // y lo devolvemos como texto para que el LLM pueda informar al usuario
            // en lugar de lanzar una excepción que rompa el flujo del chat.
            System.err.println("Error ejecutando herramienta: " + e.getMessage());
            return "Error ejecutando herramienta: " + e.getMessage();
        }
    }
}