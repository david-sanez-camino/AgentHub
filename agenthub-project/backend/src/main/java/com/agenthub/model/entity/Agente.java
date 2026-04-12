package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "agente")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Agente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Conexion de cada agente que se crea con el desarrollador 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Desarrollador desarrollador;

    private String nombre;
    private String descripcion;
    private String systemPromt; //------ CORREGIR EN LA BD --------- PROMPT****
    private String modelo;
    private String categoria;
    private Integer precio;

    @Column(nullable = false)
    @Builder.Default
    private Boolean publicado = false;

    //  Control para el admin que aprueba el agente antes de salir al marketplace 
    @Column(name = "estado_verificacion", nullable = false)
    @Builder.Default
    private String estadoVerificacion = "PENDIENTE"; // valores posibles: pendiente, aprobado, rechazado

    // --- NUEVA RELACIÓN PARA LAS HERRAMIENTAS ---
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "agente_herramienta", // Nombre de la tabla intermedia que creará PostgreSQL
        joinColumns = @JoinColumn(name = "agente_id"),
        inverseJoinColumns = @JoinColumn(name = "herramienta_id")
    )
    private List<Herramienta> herramientas;
}