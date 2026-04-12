package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "mensaje")
@Data @NoArgsConstructor @AllArgsConstructor @Builder

public class MensajeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String rol;
    private String contenido;
    private String nombreHerramienta;
    private String llamadaHerramienta;
    private LocalDate fechaMensaje;

    @ManyToOne
    @JoinColumn(name = "id_conversacion", nullable = false)
    private Conversacion conversacion;
}