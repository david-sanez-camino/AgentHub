package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="herramienta")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Herramienta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;

    @Column (columnDefinition = "JSON")
    private String parametrosJson;

    private String implementacion;
}