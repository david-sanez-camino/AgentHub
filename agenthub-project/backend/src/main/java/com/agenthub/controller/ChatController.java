package com.agenthub.controller;

import com.agenthub.model.dto.ChatRequest;
import com.agenthub.model.entity.Conversacion;
import com.agenthub.model.entity.MensajeEntity;
import com.agenthub.service.ChatService;
import com.agenthub.model.dto.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChatController {
    private final ChatService chatService;

    // enviar mensjae -- crear una conversacion si la conversacionId es null
    @PostMapping
    public ResponseEntity<ChatResponse> chatearConAgente(@RequestBody ChatRequest request) {
        ChatResponse response = chatService.procesarChat(
            request.getAgenteId(),
            request.getMensajeUsuario(),
            request.getConversacionId()
        );
    return ResponseEntity.ok(response);
}

    // Listar conversaciones del usuario con un agente concreto
    @GetMapping("/conversaciones/{agenteId}")
    public ResponseEntity<List<Conversacion>> listarConversaciones(@PathVariable Integer agenteId) {
        return ResponseEntity.ok(chatService.listarConversaciones(agenteId));
    }

    // Cargar historial de mensajes de una conversación
    @GetMapping("/conversacion/{conversacionId}")
    public ResponseEntity<List<MensajeEntity>> obtenerHistorial(@PathVariable Integer conversacionId) {
        return ResponseEntity.ok(chatService.obtenerHistorial(conversacionId));
    }

    // Eliminar una conversación y todos sus mensajes
    @DeleteMapping("/conversacion/{conversacionId}")
    public ResponseEntity<Void> eliminarConversacion(@PathVariable Integer conversacionId) {
        chatService.eliminarConversacion(conversacionId);
        return ResponseEntity.noContent().build();
    }
}
