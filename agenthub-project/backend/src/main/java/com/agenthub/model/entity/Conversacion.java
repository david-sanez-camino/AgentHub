package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

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
    private InstanciaAgente instanciaAgente;
}