package com.agenthub.model.dto;

import lombok.Data;

@Data
public class DesarrolladorResponse {
    private Integer id;
    private String nif;
    private String web;
    private String descripcion;
    private String experiencia;
    private String estado;
    // datos del usuario
    private String nombre;
    private String apellido;
    private String email;
    private String empresa;
}
