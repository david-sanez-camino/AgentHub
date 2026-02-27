package com.agenthub.controller;

import com.agenthub.model.dto.LoginRequest;
import com.agenthub.model.dto.LoginResponse;
import com.agenthub.model.dto.RegistroUsuarioRequest;
import com.agenthub.model.dto.UsuarioResponse;
import com.agenthub.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse registro(@Valid @RequestBody RegistroUsuarioRequest request) {
        return authService.registro(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}