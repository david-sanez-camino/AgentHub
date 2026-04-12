package com.agenthub.model.dto;

import com.fasterxml.jackson.annotation.JsonRawValue;

public class ToolFunction {
    private String name;
    private String description;
    
    // --- LA MAGIA ESTÁ AQUÍ ---
    @JsonRawValue
    private String parameters; 
    // -------------------------

    // Constructor vacío
    public ToolFunction() {}

    // Constructor con los 3 parámetros
    public ToolFunction(String name, String description, String parameters) {
        this.name = name;
        this.description = description;
        this.parameters = parameters;
    }

    // Getters y Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getParameters() { return parameters; }
    public void setParameters(String parameters) { this.parameters = parameters; }
}