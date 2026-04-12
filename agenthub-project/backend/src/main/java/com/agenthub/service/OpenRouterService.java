package com.agenthub.service;

import com.agenthub.model.dto.Mensaje;
import com.agenthub.model.dto.OpenRouterRequest;
import com.agenthub.model.dto.OpenRouterResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor

public class OpenRouterService {
    @Value("${openrouter.api.url}")
    private String apiUrl;

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.model}")
    private String modelo;

    // Comunicacion para hacer peticiones a la API de OpenRouter
    private final RestTemplate restTemplate = new RestTemplate();

    public String chatearConAgente(String systemPrompt, String mensajeUsuario) {

        // Header de peticiones
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("HTTP-Referer", "http://localhost:8080");
        headers.set("X-Title", "AgentHub");

       // Mensaje
       Mensaje mensajeSistema = new Mensaje("system", systemPrompt);
       Mensaje preguntaUsuario = new Mensaje("user", mensajeUsuario);

       // Empaquetar peticion
       OpenRouterRequest requestBody = new OpenRouterRequest();
       requestBody.setModelo(modelo);
       requestBody.setMensajes(List.of(mensajeSistema, preguntaUsuario));

       // creacion de la peticion, headers + body
       HttpEntity<OpenRouterRequest> requestEntity = new HttpEntity<>(requestBody, headers);

       
       try {
        OpenRouterResponse response = restTemplate.postForObject(
            apiUrl, 
            requestEntity, 
            OpenRouterResponse.class);

            if (response != null && response.getElecciones() != null && !response.getElecciones().isEmpty()) {
                Mensaje respuestaIA = response.getElecciones().get(0).getMensaje();
                if (respuestaIA != null && respuestaIA.getContenido() != null) {
                    return respuestaIA.getContenido();
                }
            }
            return "El agente no responde";
       } catch (Exception e) {
            System.err.println("Error en comunicacion con OpenRouter: " + e.getMessage());
            return "Error en la conexion con la IA";
       }
    }
}
