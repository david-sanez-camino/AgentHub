package com.agenthub.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OpenRouterRequest {
    @JsonProperty("model")
    private String modelo;

    @JsonProperty("messages")
    private List<Mensaje> mensajes;

    @JsonProperty("tools")
    private List<Tool> tools;

    @JsonProperty("tool_choice")
    private String toolChoice = "auto"; 

    @JsonProperty("temperature")
    private Double temperature = 0.1;

    public String getModelo() { return modelo; }
    public void setModelo(String modelo) { this.modelo = modelo; }

    public List<Mensaje> getMensajes() { return mensajes; }
    public void setMensajes(List<Mensaje> mensajes) { this.mensajes = mensajes; }

    public List<Tool> getTools() { return tools; }
    public void setTools(List<Tool> tools) { this.tools = tools; }

    public String getToolChoice() { return toolChoice; }
    public void setToolChoice(String toolChoice) { this.toolChoice = toolChoice; }

    public Double getTemperature() { return temperature; }
    public void setTemperature(Double temperature) { this.temperature = temperature; }
}