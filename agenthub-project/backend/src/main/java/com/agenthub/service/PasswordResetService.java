package com.agenthub.service;

import com.agenthub.model.entity.PasswordResetToken;
import com.agenthub.model.entity.Usuario;
import com.agenthub.repository.PasswordResetTokenRepository;
import com.agenthub.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Transactional
    public void solicitarReset(String email) {
        usuarioRepository.findByEmail(email).ifPresent(usuario -> {
            tokenRepository.deleteByUsuario_Id(usuario.getId());

            String token = UUID.randomUUID().toString();

            PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .usuario(usuario)
                .expiracion(LocalDateTime.now().plusMinutes(30))
                .usado(false)
                .build();

            tokenRepository.save(resetToken);

            String link = frontendUrl + "/reset-password?token=" + token;
            enviarEmail(usuario.getEmail(), usuario.getNombre(), link);
        });
    }

    private void enviarEmail(String destinatario, String nombre, String link) {
        // Añade timeouts para no colgar la petición
        if (mailSender instanceof JavaMailSenderImpl sender) {
            sender.getJavaMailProperties().put("mail.smtp.timeout", "5000");
            sender.getJavaMailProperties().put("mail.smtp.connectiontimeout", "5000");
            sender.getJavaMailProperties().put("mail.smtp.writetimeout", "5000");
        }

        try {
            SimpleMailMessage mensaje = new SimpleMailMessage();
            mensaje.setTo(destinatario);
            mensaje.setSubject("Restablecer contraseña — AgentHub");
            mensaje.setText(
                "Hola " + nombre + ",\n\n" +
                "Recibimos una solicitud para restablecer tu contraseña.\n\n" +
                "Haz clic en el siguiente enlace (válido 30 minutos):\n" +
                link + "\n\n" +
                "Si no solicitaste esto, ignora este correo.\n\n" +
                "— El equipo de AgentHub"
            );
            mailSender.send(mensaje);
            System.out.println(">>> EMAIL ENVIADO a: " + destinatario);
        } catch (Exception e) {
            System.out.println(">>> ERROR ENVIANDO EMAIL: " + e.getClass().getName() + " - " + e.getMessage());
        }
    }

    @Transactional
    public void confirmarReset(String token, String nuevaContrasenia) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isUsado()) {
            throw new RuntimeException("El enlace ya fue usado");
        }
        if (resetToken.getExpiracion().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("El enlace ha expirado");
        }

        Usuario usuario = resetToken.getUsuario();
        usuario.setContrasenia(passwordEncoder.encode(nuevaContrasenia));
        usuarioRepository.save(usuario);

        resetToken.setUsado(true);
        tokenRepository.save(resetToken);
    }
}