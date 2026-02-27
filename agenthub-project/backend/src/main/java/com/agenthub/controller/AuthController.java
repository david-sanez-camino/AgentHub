package com.agenthub.controller;
import com.agenthub.model.dto.*;
import com.agenthub.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/auth")
@RequiredArgsConstructor @CrossOrigin(origins = "*")
public class AuthController {
    private final UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<UsuarioResponse> registrar(
            @Valid @RequestBody RegistroUsuarioRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(usuarioService.registrar(req));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(usuarioService.login(req));
    }
}
