package com.agenthub.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Tool {
    private String type = "function";
    private ToolFunction function;

    @JsonIgnore // OpenRouter no debe ver este campo
    private String mcpServerUrl;

    public Tool() {}

    public Tool(String type, ToolFunction function, String mcpServerUrl) {
        this.type = type;
        this.function = function;
        this.mcpServerUrl = mcpServerUrl;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public ToolFunction getFunction() { return function; }
    public void setFunction(ToolFunction function) { this.function = function; }

    public String getMcpServerUrl() { return mcpServerUrl; }
    public void setMcpServerUrl(String mcpServerUrl) { this.mcpServerUrl = mcpServerUrl; }
}