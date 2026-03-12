package com.agenthub.model.dto;
import lombok.*;

@Data @Builder @AllArgsConstructor @NoArgsConstructor

public class AgenteResponse {
    private Integer id;
    private String nombre;
    private String descripcion;
    private String modelo;
    private String categoria;
    private Integer precio;
    private Boolean publicado;
    private String estadoVerificacion;  // Pendiente, Aprobado, Rechazado
}