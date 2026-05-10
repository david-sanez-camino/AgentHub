package com.agenthub.service;

import com.agenthub.model.dto.AgenteSimpleDTO;
import com.agenthub.model.entity.Agente;
import com.agenthub.model.entity.Compra;
import com.agenthub.model.entity.Usuario;
import com.agenthub.repository.AgenteRepository;
import com.agenthub.repository.CompraRepository;
import com.agenthub.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompraService {

    private final CompraRepository compraRepository;
    private final UsuarioRepository usuarioRepository;
    private final AgenteRepository agenteRepository;

    public Compra confirmarCompra(String email, Integer agenteId, String paymentIntentId) {
        // Idempotente: si ya existe esta compra, no la duplicamos
        return compraRepository.findByStripePaymentIntentId(paymentIntentId)
            .orElseGet(() -> {
                Usuario usuario = usuarioRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                Agente agente = agenteRepository.findById(agenteId)
                    .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

                Compra compra = Compra.builder()
                    .usuario(usuario)
                    .agente(agente)
                    .stripePaymentIntentId(paymentIntentId)
                    .fechaCompra(LocalDateTime.now())
                    .estado("completado")
                    .build();

                return compraRepository.save(compra);
            });
    }

    public List<AgenteSimpleDTO> getAgentesComprados(String email) {
    Usuario usuario = usuarioRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    return compraRepository.findByUsuario(usuario)
        .stream()
        .map(c -> new AgenteSimpleDTO(
            c.getAgente().getId(),
            c.getAgente().getNombre(),
            c.getAgente().getDescripcion(),
            c.getAgente().getCategoria(),
            c.getAgente().getModelo(),
            c.getAgente().getPrecio()
        ))
        .toList();
}

    public boolean haComprado(String email, Integer agenteId) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return compraRepository.existsByUsuarioAndAgenteId(usuario, agenteId);
    }
}