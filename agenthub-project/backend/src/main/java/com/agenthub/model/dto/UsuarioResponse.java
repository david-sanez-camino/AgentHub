package com.agenthub.model.dto;
import lombok.*;

@Data @Builder @AllArgsConstructor

public class UsuarioResponse {
    private Integer id;
    private String email;
    private String nombre;
    private String apellido;
    private String empresa;
    private Integer telefono;
    private String rol;
}