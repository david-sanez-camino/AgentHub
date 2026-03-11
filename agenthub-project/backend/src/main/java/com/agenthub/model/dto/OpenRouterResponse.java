package com.agenthub.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OpenRouterResponse {
    @JsonProperty("choices")
    private List<Eleccion> elecciones;

    public List<Eleccion> getElecciones() {
        return elecciones;
    }

    public void setElecciones(List<Eleccion> elecciones) {
        this.elecciones = elecciones;
    }

    public static class Eleccion {
        @JsonProperty("message")
        private Mensaje mensaje;

        public Mensaje getMensaje() {
            return mensaje;
        }

        public void setMensaje(Mensaje mensaje) {
            this.mensaje = mensaje;
        }
    }
}