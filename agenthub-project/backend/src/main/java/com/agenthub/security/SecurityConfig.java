package com.agenthub.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable())
            .authorizeHttpRequests(a -> a
                .requestMatchers("/api/auth", "/api/auth/**").permitAll()
                .requestMatchers("/api/agentes", "/api/agentes/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/desarrolladores").permitAll()
                .requestMatchers("/api/test-ia/**").permitAll() 
                .requestMatchers("/api/chat", "/api/chat/**").authenticated()
                .requestMatchers("/api/payments", "/api/payments/**").authenticated()
                .requestMatchers(
                    "/api/desarrolladores/pendientes",
                    "/api/desarrolladores/aprobados",
                    "/api/desarrolladores/rechazados",
                    "/api/desarrolladores/*/aprobado",
                    "/api/desarrolladores/*/rechazado"
                ).authenticated()
                .anyRequest().authenticated())
            .sessionManagement(s -> s
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}