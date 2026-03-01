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
    private String contrasenia;

    private String empresa;
    private String nombre;
    private String apellido;
    private Integer telefono;

    @Column(name = "rol", nullable = false)
    private String rol;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Desarrollador desarrollador;
}