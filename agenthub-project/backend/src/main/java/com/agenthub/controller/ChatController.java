package com.agenthub.controller;

import com.agenthub.model.dto.ChatRequest;
import com.agenthub.service.ChatService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {
    private final ChatService chatService;

    @PostMapping
    public String chatearConAgente(@RequestBody ChatRequest request) {
        return chatService.procesarChat(request.getAgenteId(), request.getMensajeUsuario());
    }
}
