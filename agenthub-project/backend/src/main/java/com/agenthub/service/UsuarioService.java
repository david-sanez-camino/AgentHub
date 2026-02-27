package com.agenthub.service;
import com.agenthub.model.dto.*;
import com.agenthub.model.entity.Usuario;
import com.agenthub.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // HU 1 registro de usuario
    @Transactional 
    public UsuarioResponse registrar(RegistroUsuarioRequest req) {
        if (usuarioRepository.existsByEmail(req.getEmail()))
            throw new IllegalArgumentException("El email ya esta registrado, nice try didi");
        Usuario u = Usuario.builder()
            .email(req.getEmail())
            .contrasenia(passwordEncoder.encode(req.getContrasenia()))
            .nombre(req.getNombre())
            .empresa(req.getEmpresa())
            .telefono(req.getTelefono())
            .build();
        return toResponse(usuarioRepository.save(u));
    }

    // Login 
    public LoginResponse login(LoginRequest req) {
        Usuario u = usuarioRepository.findByEmail(req.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Credenciales incorrectas, nice try diddi"));
        if (!passwordEncoder.matches(req.getContrasenia(), u.getContrasenia()))
            throw new IllegalArgumentException("Credenciales incorrectas");
        return LoginResponse.builder()
            .token(jwtService.generateToken(u.getEmail()))
            .type("Bearer")
            .usuario(toResponse(u))
            .build();
    }

    private UsuarioResponse toResponse(Usuario u){
        return UsuarioResponse.builder()
            .id(u.getId()).email(u.getEmail())
            .nombre(u.getNombre()).empresa(u.getEmpresa())
            .telefono(u.getTelefono()).build();
    }
}