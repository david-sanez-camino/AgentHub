package com.agenthub.service;

import com.agenthub.model.dto.ValoracionDTO;
import com.agenthub.model.entity.Agente;
import com.agenthub.model.entity.Usuario;
import com.agenthub.model.entity.Valoracion;
import com.agenthub.repository.AgenteRepository;
import com.agenthub.repository.CompraRepository;
import com.agenthub.repository.UsuarioRepository;
import com.agenthub.repository.ValoracionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ValoracionService {

    private final ValoracionRepository valoracionRepository;
    private final UsuarioRepository usuarioRepository;
    private final AgenteRepository agenteRepository;
    private final CompraRepository compraRepository;

    public Valoracion crearValoracion(String email, Integer agenteId, Integer estrellas, String comentario) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar que ha comprado el agente
        if (!compraRepository.existsByUsuarioAndAgenteId(usuario, agenteId)) {
            throw new RuntimeException("Solo puedes valorar agentes que hayas comprado");
        }

        // Verificar que no ha valorado ya
        if (valoracionRepository.existsByUsuarioAndAgenteId(usuario, agenteId)) {
            throw new RuntimeException("Ya has valorado este agente");
        }

        Agente agente = agenteRepository.findById(agenteId)
            .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

        Valoracion valoracion = Valoracion.builder()
            .usuario(usuario)
            .agente(agente)
            .estrellas(estrellas)
            .comentario(comentario)
            .fechaValoracion(LocalDateTime.now())
            .build();

        return valoracionRepository.save(valoracion);
    }

    public List<ValoracionDTO> getValoracionesByAgente(Integer agenteId) {
        return valoracionRepository.findByAgenteId(agenteId)
            .stream()
            .map(v -> new ValoracionDTO(
                v.getId(),
                v.getUsuario().getNombre(),
                v.getEstrellas(),
                v.getComentario(),
                v.getFechaValoracion()
            ))
            .toList();
    }

    public Map<String, Object> getResumenByAgente(Integer agenteId) {
        List<ValoracionDTO> valoraciones = getValoracionesByAgente(agenteId);
        Double promedio = valoracionRepository.promedioEstrellasByAgenteId(agenteId);
        return Map.of(
            "valoraciones", valoraciones,
            "promedio", promedio != null ? Math.round(promedio * 10.0) / 10.0 : 0.0,
            "total", valoraciones.size()
        );
    }

    public boolean yaValoro(String email, Integer agenteId) {
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return valoracionRepository.existsByUsuarioAndAgenteId(usuario, agenteId);
    }
}