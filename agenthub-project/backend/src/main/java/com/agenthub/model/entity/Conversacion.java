package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "conversacion")
@Data @NoArgsConstructor @AllArgsConstructor @Builder

public class Conversacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;

    @ManyToOne
    @JoinColumn(name = "id_instancia_agente", nullable = false)
    @JsonIgnoreProperties({"agente", "usuario", "mensajes", "conversaciones"})
    private InstanciaAgente instanciaAgente;
}