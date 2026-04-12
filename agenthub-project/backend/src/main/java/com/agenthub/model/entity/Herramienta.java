package com.agenthub.model.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "herramienta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Herramienta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // El nombre tecnico de la funcion
    @Column(nullable = false, unique = true)
    private String nombre;

    // Lo que hace la funcion
    @Column(nullable = false)
    private String descripcion;

    // Aqui guardaremos un JSON en texto con los parametros que necesita (ej: { "ciudad": "string" })
    @Column(columnDefinition = "TEXT")
    private String esquemaParametros;

    // URL del servidor MCP que ejecuta esta herramienta
    @Column(name = "mcp_server_url")
    private String mcpServerUrl;
}