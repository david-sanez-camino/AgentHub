package com.agenthub.security;

import com.agenthub.service.JwtService;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component @RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final com.agenthub.repository.UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest req,
            @NonNull HttpServletResponse res, @NonNull FilterChain chain)
            throws IOException, ServletException {
        String header = req.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res); return;
        }
        
        try {
            String jwt = header.substring(7);
            String email = jwtService.extractUsername(jwt);
            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                com.agenthub.model.entity.Usuario usuarioReal = usuarioRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario No encontrado, nice try didi"));

                UserDetails ud = User.builder()
                    .username(email)
                    .password("")
                    .roles(usuarioReal.getRol())
                    .build();
                    
                if (jwtService.validateToken(jwt, ud)) {
                    var auth = new UsernamePasswordAuthenticationToken(
                        ud, null, ud.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception e) {
            // Token inválido o expirado, continuar sin autenticación
        }
        
        chain.doFilter(req, res);
    }
}