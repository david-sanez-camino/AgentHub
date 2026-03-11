package com.agenthub.model.dto;

import lombok.Data;

@Data
public class AgenteBusquedaRequest {
    private String keyword;
    private String categoria;
    private Integer precioMin;
    private Integer precioMax;
}
