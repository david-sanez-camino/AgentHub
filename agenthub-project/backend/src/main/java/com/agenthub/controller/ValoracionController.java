package com.agenthub.controller;

import com.agenthub.service.ValoracionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/valoraciones")
@RequiredArgsConstructor
public class ValoracionController {

    private final ValoracionService valoracionService;

    // Listar valoraciones de un agente (público)
    @GetMapping("/agente/{agenteId}")
    public ResponseEntity<?> getValoraciones(@PathVariable Integer agenteId) {
        return ResponseEntity.ok(valoracionService.getResumenByAgente(agenteId));
    }

    // Crear valoración (requiere auth)
    @PostMapping("/agente/{agenteId}")
    public ResponseEntity<?> crearValoracion(
            @PathVariable Integer agenteId,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Integer estrellas = Integer.valueOf(body.get("estrellas").toString());
            String comentario = body.getOrDefault("comentario", "").toString();

            if (estrellas < 1 || estrellas > 5) {
                return ResponseEntity.badRequest().body(Map.of("error", "Las estrellas deben ser entre 1 y 5"));
            }

            valoracionService.crearValoracion(userDetails.getUsername(), agenteId, estrellas, comentario);
            return ResponseEntity.ok(Map.of("ok", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Verificar si el usuario ya valoró
    @GetMapping("/agente/{agenteId}/ya-valoro")
    public ResponseEntity<?> yaValoro(
            @PathVariable Integer agenteId,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) return ResponseEntity.ok(Map.of("yaValoro", false));
        return ResponseEntity.ok(Map.of("yaValoro", valoracionService.yaValoro(userDetails.getUsername(), agenteId)));
    }
}