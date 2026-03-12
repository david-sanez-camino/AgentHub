package com.agenthub.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="desarrollador")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
@EqualsAndHashCode(exclude = "usuario")   // evita ciclo infinito
@ToString(exclude = "usuario")            // evita ciclo infinito
public class Desarrollador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Conexion con tabla usuario
    @OneToOne
    @JoinColumn(name="id_usuario", nullable = false, unique = true)
    private Usuario usuario;

    private String nif;
    private String web;
    private String descripcion;
    private String experiencia;
    
    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'pendiente'")
    @Builder.Default
    private String estado = "pendiente";
    
}
