package com.agenthub.model.entity;

import lombok.Data;

@Data
public class DesarrolladorResponse {
    private Integer id;
    private String nif;
    private String web;
    private String descripcion;
    private String experiencia;
    // datos del usuario
    private String nombre;
    private String apellido;
    private String email;
    private String empresa;
}
