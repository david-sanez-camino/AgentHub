package com.agenthub.model.dto;

public class ChatRequest {
    private Integer agenteId;
    private String mensajeUsuario;

    public Integer getAgenteId() { return agenteId; }
    public void setAgenteId(Integer agenteId) { this.agenteId = agenteId; }

    public String getMensajeUsuario() { return mensajeUsuario; }
    public void setMensajeUsuario(String mensajeUsuario) { this.mensajeUsuario = mensajeUsuario; }
}

