package com.agenthub.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AgenteSimpleDTO {
    private Integer id;
    private String nombre;
    private String descripcion;
    private String categoria;
    private String modelo;
    private Integer precio;
}