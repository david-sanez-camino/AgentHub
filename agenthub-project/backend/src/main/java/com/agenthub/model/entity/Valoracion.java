package com.agenthub.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "valoracion", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"usuario_id", "agente_id"})
})
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Valoracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "agente_id", nullable = false)
    private Agente agente;

    @Column(nullable = false)
    private Integer estrellas; // 1-5

    @Column(length = 500)
    private String comentario;

    @Column(name = "fecha_valoracion")
    private LocalDateTime fechaValoracion;
}