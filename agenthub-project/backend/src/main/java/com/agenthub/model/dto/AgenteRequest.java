package com.agenthub.model.dto;
import lombok.*;
import jakarta.validation.constraints.NotBlank;

@Data 

public class AgenteRequest {
    @NotBlank 

    private String nombre;
    private String descripcion;
    private String systemPromt;
    private String modelo;
    private String categoria;
    private Integer precio;
}