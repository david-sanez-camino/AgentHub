package com.agenthub.service;

import com.agenthub.model.entity.Agente;
import com.agenthub.repository.AgenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final AgenteRepository agenteRepository;
    private final OpenRouterService openRouterService;

    public String procesarChat(Integer agenteId, String mensajeusuario) {

        // buscar agente en la bbdd
        Agente agente = agenteRepository.findById(agenteId).orElseThrow(() -> new RuntimeException("Error: No se ha encontrado el agente con el ID: " + agenteId));

        if (!agente.getPublicado() || !"APROBADO".equals(agente.getEstadoVerificacion())) {
            return "El agente que busca aun no esta disponible en AgentHUB, nice try didi";
        }

        // extraer systemPropmpt del agente ()
        String systemPrompt = agente.getSystemPromt();

        // paso de prompt a openrouter (LLM)
        return openRouterService.chatearConAgente(systemPrompt, mensajeusuario);
    }
}
