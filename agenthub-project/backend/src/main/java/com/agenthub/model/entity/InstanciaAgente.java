package com.agenthub.model.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "instancia_agente")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class InstanciaAgente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JdbcTypeCode(SqlTypes.JSON)          
    @Column(columnDefinition = "jsonb")
    private String configuracion;

    private String estado;
    private LocalDate fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_agente")
    private Agente agente; 
}