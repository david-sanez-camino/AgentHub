package com.agenthub.model.dto;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data 
@NoArgsConstructor
@AllArgsConstructor
public class AgenteRequest {
    @NotBlank 
    private String nombre;

    private String descripcion;
    private String systemPromt;
    private String modelo;

    @NotBlank
    private String categoria;
    
    @NotNull
    private Integer precio;
}