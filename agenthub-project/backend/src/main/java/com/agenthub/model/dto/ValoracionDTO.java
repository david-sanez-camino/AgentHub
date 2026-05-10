package com.agenthub.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ValoracionDTO {
    private Integer id;
    private String nombreUsuario;
    private Integer estrellas;
    private String comentario;
    private LocalDateTime fechaValoracion;
}