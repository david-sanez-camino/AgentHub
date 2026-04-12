package com.agenthub.controller;

import com.agenthub.service.OpenRouterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

        return openRouterService.chatearConAgente(systemPrompt, mensajeUsuario, null, modelo);
    }

}
