package com.agenthub.model.dto;

import lombok.*;
import java.util.List;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class MetricasDesarrolladorResponse {
    private Integer totalAgentes;
    private Integer totalVentas;
    private Integer totalIngresos;
    private List<MetricaAgente> agentes;

    @Data @Builder @AllArgsConstructor @NoArgsConstructor
    public static class MetricaAgente {
        private Integer id;
        private String nombre;
        private String categoria;
        private Integer precio;
        private String estadoVerificacion;
        private Integer ventas;
        private Integer ingresos;
    }
}
