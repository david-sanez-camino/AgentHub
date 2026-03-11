package com.agenthub.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OpenRouterRequest {
    @JsonProperty("model")
    private String modelo;

    @JsonProperty("messages")
    private List<Mensaje> mensajes;

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public List<Mensaje> getMensajes() { return mensajes; }
    public void setMensajes(List<Mensaje> mensajes) { this.mensajes = mensajes; }
}