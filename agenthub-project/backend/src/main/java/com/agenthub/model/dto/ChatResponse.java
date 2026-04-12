package com.agenthub.model.dto;

public class ChatResponse {
    private String respuesta;
    private Integer conversacionId;

    public ChatResponse(String respuesta, Integer conversacionId) {
        this.respuesta = respuesta;
        this.conversacionId = conversacionId;
    }

    public String getRespuesta() { return respuesta; }
    public Integer getConversacionId() { return conversacionId; }
}
