package com.agenthub.model.dto;
import lombok.*;

@Data @Builder @AllArgsConstructor

public class LoginResponse{
    private String token;
    private String type; // BEARER
    private UsuarioResponse usuario;
}