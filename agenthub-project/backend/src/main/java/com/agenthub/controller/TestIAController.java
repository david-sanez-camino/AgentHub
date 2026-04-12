package com.agenthub.controller;

import com.agenthub.service.OpenRouterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.agenthub.model.dto.Mensaje;
import java.util.List;

@RestController
@RequestMapping("/api/test-ia")
@RequiredArgsConstructor
public class TestIAController {
    
private final OpenRouterService openRouterService;

@PostMapping("/chat")
public String probarChat(@RequestBody Map<String, String> request) {
    String systemPrompt = request.get("systemPrompt");
    String mensajeUsuario = request.get("mensajeUsuario");
    String modelo = request.getOrDefault("modelo", "anthropic/claude-3-haiku");

    // Construimos la lista de mensajes igual que ChatService
    List<Mensaje> mensajes = new java.util.ArrayList<>();
    mensajes.add(new Mensaje("system", systemPrompt));
    mensajes.add(new Mensaje("user", mensajeUsuario));

    return openRouterService.chatearConAgente(mensajes, null, modelo);
}


}
