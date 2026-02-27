package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@Data @NoArgsConstructor @AllArgsConstructor @Builder

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "contrasenia", nullable = false)
    private String password;

    private String empresa;
    private String nombre;
    private String apellido;
    private Integer telefono;
}