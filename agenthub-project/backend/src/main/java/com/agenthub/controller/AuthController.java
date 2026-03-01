package com.agenthub.controller;
import com.agenthub.model.dto.*;
import com.agenthub.model.entity.Usuario;
import com.agenthub.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/auth")
@RequiredArgsConstructor @CrossOrigin(origins = "*")
public class AuthController {
    private final UsuarioService usuarioService;

    // obtener todos los usuarios dados de alta en el sistema
    @GetMapping
<<<<<<< HEAD
    public List<UsuarioResponse> getAllUsuarios(){
=======
    public List<Usuario> getAllUsuarios(){
>>>>>>> 275ebce8301cf32bd9a23eeebd5d43d1da9c70dd
        return usuarioService.getAllUsuarios();
    }
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
