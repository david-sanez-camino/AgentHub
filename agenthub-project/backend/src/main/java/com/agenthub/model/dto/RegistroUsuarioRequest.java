package com.agenthub.model.dto;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data 
public class RegistroUsuarioRequest {
    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, message = "Minimo 6 caracteres")
    private String contrasenia;

    @NotBlank 
    private String nombre;
    private String apellido;

    private String empresa;
    private Integer telefono;

    @NotBlank(message = "El rol es obligatorio")
    private String rol;

    // campos especificos para registro de desarrollador
    private String nif;
    private String web;
    private String descripcion;
    private String experiencia;
}