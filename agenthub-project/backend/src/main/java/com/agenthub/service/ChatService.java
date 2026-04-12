package com.agenthub.service;

import com.agenthub.model.dto.Tool;
import com.agenthub.model.dto.ToolFunction;
import com.agenthub.model.dto.Mensaje;
import com.agenthub.model.dto.ChatResponse;
import com.agenthub.model.entity.*;
import com.agenthub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ChatService — Núcleo del sistema de chat de AgentHub.
 *
 * Ahora gestiona también el historial de conversaciones:
 *   1. Busca o crea la InstanciaAgente del usuario con el agente
 *   2. Crea una nueva Conversacion o recupera una existente
 *   3. Carga el historial de mensajes y lo incluye en el contexto del LLM
 *   4. Guarda cada mensaje (usuario + IA) en la BD
 */
@Service
@RequiredArgsConstructor
public class ChatService {

    private final AgenteRepository agenteRepository;
    private final OpenRouterService openRouterService;
    private final UsuarioRepository usuarioRepository;
    private final InstanciaAgenteRepostory instanciaAgenteRepository;
    private final ConversacionRepository conversacionRepository;
    private final MensajeRepository mensajeRepository;

    /**
     * Procesa un mensaje y gestiona el historial de conversación.
     *
     * @param agenteId       ID del agente con el que se chatea
     * @param mensajeUsuario Texto del usuario
     * @param conversacionId null = nueva conversación, número = continuar existente
     */
    @Transactional
    public ChatResponse procesarChat(Integer agenteId, String mensajeUsuario, Integer conversacionId) {

        // ── 1. BUSCAR Y VALIDAR AGENTE ────────────────────────────────────────
        Agente agente = agenteRepository.findById(agenteId)
            .orElseThrow(() -> new RuntimeException("Agente no encontrado: " + agenteId));

        if (!agente.getPublicado() || !"APROBADO".equals(agente.getEstadoVerificacion())) {
            return new ChatResponse("El agente que busca aun no esta disponible en AgentHUB", null);
        }

        System.out.println("==== Agente: [" + agente.getNombre() + "] | Modelo: " + agente.getModelo() + " | ID: " + agenteId);

        // ── 2. OBTENER USUARIO AUTENTICADO ────────────────────────────────────
        // El usuario viene del JWT — no hace falta mandarlo desde el frontend
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("==== Usuario no encontrado: " + email));

        // ── 3. BUSCAR O CREAR INSTANCIA AGENTE ───────────────────────────────
        // Una InstanciaAgente representa la relación usuario-agente.
        // Si el usuario ya había chateado con este agente, reutilizamos la instancia.
        InstanciaAgente instancia = instanciaAgenteRepository
            .findByUsuarioIdAndAgenteId(usuario.getId(), agenteId)
            .orElseGet(() -> {
                System.out.println("==== Creando nueva InstanciaAgente para usuario " + email);
                return instanciaAgenteRepository.save(
                    InstanciaAgente.builder()
                        .usuario(usuario)
                        .agente(agente)
                        .estado("ACTIVA")
                        .fechaCreacion(LocalDate.now())
                        .build()
                );
            });

        // ── 4. BUSCAR O CREAR CONVERSACION ───────────────────────────────────
        // Si conversacionId es null, creamos una conversación nueva.
        // Si viene con ID, cargamos la conversación existente para continuar.
        Conversacion conversacion;
        if (conversacionId == null) {
            System.out.println("===== Creando nueva conversación =====");
            conversacion = conversacionRepository.save(
                Conversacion.builder()
                    .instanciaAgente(instancia)
                    .fechaInicio(LocalDate.now())
                    .estado("ACTIVA")
                    .build()
            );
        } else {
            conversacion = conversacionRepository.findById(conversacionId)
                .orElseThrow(() -> new RuntimeException("==== Conversación no encontrada: " + conversacionId));
        }

        // ── 5. CARGAR HISTORIAL DE MENSAJES ──────────────────────────────────
        // Recuperamos todos los mensajes anteriores de esta conversación
        // y los convertimos al formato Mensaje DTO que entiende OpenRouter.
        List<MensajeEntity> historial = mensajeRepository.findByConversacionId(conversacion.getId());

        List<Mensaje> mensajesContexto = new ArrayList<>();

        // System prompt del agente — siempre primero
        mensajesContexto.add(new Mensaje("system", agente.getSystemPromt()));

        // Historial anterior de la conversación
        for (MensajeEntity m : historial) {
            mensajesContexto.add(new Mensaje(m.getRol(), m.getContenido()));
        }

        // Nuevo mensaje del usuario
        mensajesContexto.add(new Mensaje("user", mensajeUsuario));

        System.out.println("==== Historial cargado: " + historial.size() + " mensajes anteriores");

        // ── 6. CARGAR HERRAMIENTAS ────────────────────────────────────────────
        List<Tool> herramientasIA = null;
        if (agente.getHerramientas() != null && !agente.getHerramientas().isEmpty()) {
            herramientasIA = new ArrayList<>();
            System.out.println("==== Herramientas de [" + agente.getNombre() + "]: " + agente.getHerramientas().size());
            for (Herramienta h : agente.getHerramientas()) {
                try {
                    ToolFunction funcion = new ToolFunction(h.getNombre(), h.getDescripcion(), h.getEsquemaParametros());
                    herramientasIA.add(new Tool("function", funcion, h.getMcpServerUrl()));
                    System.out.println("   ==== Tool cargada: " + h.getNombre() + " → " + h.getMcpServerUrl());
                } catch (Exception e) {
                    System.err.println("   ==== Error al cargar tool: " + h.getNombre() + " - " + e.getMessage());
                }
            }
        } else {
            System.out.println("==== [" + agente.getNombre() + "] no tiene herramientas asignadas. ====");
        }

        // ── 7. LLAMAR AL LLM CON EL HISTORIAL COMPLETO ───────────────────────
        String respuesta = openRouterService.chatearConAgente(
            mensajesContexto,
            herramientasIA,
            agente.getModelo()
        );

        // ── 8. GUARDAR MENSAJES EN LA BD ──────────────────────────────────────
        // Guardamos el mensaje del usuario y la respuesta de la IA
        mensajeRepository.save(MensajeEntity.builder()
            .conversacion(conversacion)
            .rol("user")
            .contenido(mensajeUsuario)
            .fechaMensaje(LocalDate.now())
            .build());

        mensajeRepository.save(MensajeEntity.builder()
            .conversacion(conversacion)
            .rol("assistant")
            .contenido(respuesta)
            .fechaMensaje(LocalDate.now())
            .build());

        System.out.println("==== Mensajes guardados en conversación ID: " + conversacion.getId());

        return new ChatResponse(respuesta, conversacion.getId());
    }

    // Lista todas las conversaciones del usuario con un agente concreto
    public List<Conversacion> listarConversaciones(Integer agenteId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return instanciaAgenteRepository
            .findByUsuarioIdAndAgenteId(usuario.getId(), agenteId)
            .map(instancia -> conversacionRepository.findByInstanciaAgenteId(instancia.getId()))
            .orElse(List.of());
    }

    // Devuelve el historial de mensajes de una conversación
    public List<MensajeEntity> obtenerHistorial(Integer conversacionId) {
        return mensajeRepository.findByConversacionId(conversacionId);
    }

    // Elimina una conversación y todos sus mensajes
    @Transactional
    public void eliminarConversacion(Integer conversacionId) {
        List<MensajeEntity> mensajes = mensajeRepository.findByConversacionId(conversacionId);
        mensajeRepository.deleteAll(mensajes);
        conversacionRepository.deleteById(conversacionId);
        System.out.println("==== Conversación " + conversacionId + " eliminada ====");
    }
}