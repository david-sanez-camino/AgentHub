package com.agenthub.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="desarrollador")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Desarrollador {
    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private Usuario usuario;

    private String nif;
    private String web;
    private String descripcion;
    private String experiencia;
    
    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'pendiente'")
    @Builder.Default
    private String estado = "pendiente";
    
}
