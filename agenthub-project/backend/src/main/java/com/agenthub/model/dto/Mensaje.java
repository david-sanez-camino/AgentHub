package com.agenthub.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Mensaje {
    @JsonProperty("role")
    private String role; // "system" (contexto), "user" (pregunta), "assistant" (respuesta)

    @JsonProperty("content")
    private String contenido;

    @JsonProperty("tool_calls")
    private List<ToolCall> toolCalls;

    public Mensaje() {}

    public Mensaje(String role, String contenido) {
        this.role = role;
        this.contenido = contenido;
    }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public List<ToolCall> getToolCalls() { return toolCalls; }
    public void setToolCalls(List<ToolCall> toolCalls) { this.toolCalls = toolCalls; }
}
