package com.agenthub.service;

import com.agenthub.model.dto.Tool;
import com.agenthub.model.dto.ToolFunction;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import com.agenthub.model.entity.Agente;
import com.agenthub.model.entity.Herramienta;
import com.agenthub.repository.AgenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * ChatService — Núcleo del sistema de chat de AgentHub.
 *
 * Responsabilidades:
 *   1. Buscar y validar el agente solicitado en la BD.
 *   2. Cargar sus herramientas (tools) y el modelo de IA asociado.
 *   3. Delegar la conversación a OpenRouterService para que el LLM responda.
 *
 * Flujo completo:
 *   ChatController → ChatService → OpenRouterService → OpenRouter API
 *                                                     ↘ McpClientService → mcp-legal (si hay tool_call)
 */

@Service
@RequiredArgsConstructor
public class ChatService {

    // Repositorio JPA para consultar agentes en PostgreSQL
    private final AgenteRepository agenteRepository;

    // Servicio que gestiona la comunicación con la API de OpenRouter (LLM)
    private final OpenRouterService openRouterService;

    // ObjectMapper de Jackson — disponible por si se necesita serializar/deserializar JSON
    private final ObjectMapper objectMapper = new ObjectMapper();


    /**
     * Procesa un mensaje de usuario dirigido a un agente especifico
     *
     * @param agenteId       ID del agente en la BD (viene del frontend)
     * @param mensajeusuario Texto que escribe el usuario en el chat
     * @return Respuesta final generada por el LLM (con o sin uso de herramientas)
     */

    @Transactional
    public String procesarChat(Integer agenteId, String mensajeusuario) {

        // ── 1. BUSCAR AGENTE ──────────────────────────────────────────────────
        // Si no existe el ID en la BD lanzamos una excepcion
        Agente agente = agenteRepository.findById(agenteId).orElseThrow(() -> new RuntimeException("Error: No se ha encontrado el agente con el ID: " + agenteId));

        // ── 2. VALIDAR QUE EL AGENTE ESTÁ DISPONIBLE ─────────────────────────
        // Solo los agentes aprobados por el admin y marcados como publicados
        // son accesibles en el marketplace. Doble check por seguridad.
        if (!agente.getPublicado() || !"APROBADO".equals(agente.getEstadoVerificacion())) {
            return "El agente que busca aun no esta disponible en AgentHUB, nice try didi";
        }

        // ── 3. LOG DE TRAZABILIDAD ────────────────────────────────────────────
        // Permite ver en los logs qué agente responde y con que modelo
        // Ejemplo:  Agente: [LexAdvisor] | Modelo: anthropic/claude-3-haiku | ID: 1
        System.out.println("Agente: [" + agente.getNombre() + "] | Modelo: " + agente.getModelo() + " | ID: " + agenteId);

        // ── 4. EXTRAER SYSTEM PROMPT ──────────────────────────────────────────
        // El system prompt define la personalidad y reglas del agente.
        // Esta guardado en la BD y lo configura el desarrollador al crear el agente.
        String systemPrompt = agente.getSystemPromt();

        // ── 5. CARGAR HERRAMIENTAS DEL AGENTE ────────────────────────────────
        // Cada agente puede tener 0 o mas herramientas asignadas (relacion ManyToMany).
        // Las herramientas se convierten al formato Tool que entiende OpenRouter (OpenAI-compatible).
        // Cada Tool contiene: nombre, descripcion, esquema JSON de parámetros y URL del servidor MCP.
        List<Tool> herramientasIA = null;

        if (agente.getHerramientas() != null && !agente.getHerramientas().isEmpty()) {
            herramientasIA = new ArrayList<>();
            
            System.out.println("Herramientas de [" + agente.getNombre() + "]: " + agente.getHerramientas().size());

            for (Herramienta h : agente.getHerramientas()) {
                try {
                    // Construimos el objeto ToolFunction con el esquema JSON de parámetros.
                    // El esquemaParametros es un JSON raw guardado en TEXT en la BD.
                    // Ejemplo: {"type":"object","properties":{"query":{"type":"string"}},"required":["query"]}
                    ToolFunction funcion = new ToolFunction(h.getNombre(), h.getDescripcion(), h.getEsquemaParametros());

                    // Añadimos la Tool a la lista incluyendo la URL del servidor MCP.
                    // mcpServerUrl se usa en McpClientService para saber a qué servidor llamar
                    // cuando el LLM decide usar esta herramienta. No se envía a OpenRouter (@JsonIgnore).
                    // Ejemplo URL: http://mcp-legal:8001
                    herramientasIA.add(new Tool("function", funcion, h.getMcpServerUrl())); 

                    System.out.println("Herramienta cargada: " + h.getNombre() + " → " + h.getMcpServerUrl());

                } catch (Exception e) {
                    // Si falla una herramienta, continuamos con las demás — no bloqueamos el chat
                    System.err.println("Error al cargar la herramienta: " + h.getNombre() + " - " + e.getMessage());
                }
            }
        } else {
            // El agente no tiene herramientas — respondera solo con su conocimiento
            System.out.println("[" + agente.getNombre() + "] no tiene herramientas asignadas, responderá sin tools.");
        }

        // ── 6. DELEGAR A OPENROUTER ───────────────────────────────────────────
        // Pasamos al LLM:
        //   - systemPrompt: personalidad y reglas del agente
        //   - mensajeusuario: lo que escribió el usuario
        //   - herramientasIA: lista de tools disponibles (null si no tiene)
        //   - agente.getModelo(): modelo guardado en BD para este agente específico
        //                         Ejemplo: "anthropic/claude-3-haiku" o "openai/gpt-oss-20b:free"
        return openRouterService.chatearConAgente(systemPrompt, mensajeusuario, herramientasIA, agente.getModelo());
    }
}
