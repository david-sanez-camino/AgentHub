package com.agenthub.model.dto;

public class ChatRequest {
    private Integer agenteId;
    private String mensajeUsuario;

    // null = nueva conversacion | Numero = continuar una conversacion existente
    private Integer conversacionId;

    public Integer getAgenteId() { return agenteId; }
    public void setAgenteId(Integer agenteId) { this.agenteId = agenteId; }

    public String getMensajeUsuario() { return mensajeUsuario; }
    public void setMensajeUsuario(String mensajeUsuario) { this.mensajeUsuario = mensajeUsuario; }

    public Integer getConversacionId() { return conversacionId; }
    public void setConversacionId(Integer conversacionId) { this.conversacionId = conversacionId; }
}

