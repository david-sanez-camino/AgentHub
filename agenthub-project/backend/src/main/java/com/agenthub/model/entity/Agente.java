package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Table(name = "agente")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Agente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;
    private String descripcion;
    private String systemPromt; //------ CORREGIR EN LA BD --------- PROMPT****
    private String modelo;
    private String categoria;
    private Integer precio;

    @Column(nullable = false)
    @Builder.Default
    private Boolean publicado = false;

    // relacion n->n con entidad Herramienta 
    @ManyToMany
    @JoinTable(name = "agente_herramienta", joinColumns = @JoinColumn(name = "id_agente"), inverseJoinColumns = @JoinColumn(name = "id_herramienta"))
    private Set<Herramienta> herramientas;
}