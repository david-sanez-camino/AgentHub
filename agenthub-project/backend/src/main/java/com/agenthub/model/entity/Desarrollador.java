package com.agenthub.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="desarrollador")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Desarrollador {
    @Id
    private Integer id;

    @MapsId
    // Conexion con tabla usuario
    @OneToOne
    @JoinColumn(name="id_usuario")
    private Usuario usuario;

    private String nif;
    private String web;
    private String descripcion;
    private String experiencia;
    
    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'pendiente'")
    @Builder.Default
    private String estado = "pendiente";
    
}
