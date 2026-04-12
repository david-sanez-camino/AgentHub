package com.agenthub.model.dto;

public class FunctionCall {
    private String name;
    private String arguments;

    public FunctionCall() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getArguments() { return arguments; }
    public void setArguments(String arguments) { this.arguments = arguments; }
}
