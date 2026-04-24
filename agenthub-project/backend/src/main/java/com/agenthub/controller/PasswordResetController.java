package com.agenthub.controller;

import com.agenthub.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    // POST /api/auth/forgot-password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        try {
            passwordResetService.solicitarReset(body.get("email"));
            // Siempre devuelve OK aunque el email no exista (seguridad)
            return ResponseEntity.ok(Map.of("message", "Si el correo existe, recibirás un enlace en breve"));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("message", "Si el correo existe, recibirás un enlace en breve"));
        }
    }

    // POST /api/auth/reset-password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        try {
            passwordResetService.confirmarReset(body.get("token"), body.get("nuevaContrasenia"));
            return ResponseEntity.ok(Map.of("message", "Contraseña actualizada correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}