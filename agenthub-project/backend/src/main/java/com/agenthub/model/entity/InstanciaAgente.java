package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "instancia_agente")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class InstanciaAgente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "JSON")
    private String configuracion;

    private String estado;
    private LocalDate fechaCreacion;

    @ManyToOne
    @JoinColumn(name = id_usuario, nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_agente")
    private Agente agente; 
}