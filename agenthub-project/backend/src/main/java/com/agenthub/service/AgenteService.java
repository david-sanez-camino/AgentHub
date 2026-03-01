package com.agenthub.service;
import com.agenthub.exception.ResourceNotFoundException;
import com.agenthub.model.dto.*;
import com.agenthub.model.entity.Agente;
import com.agenthub.repository.AgenteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class AgenteService {
    private final AgenteRepository agenteRepository;

    public List<AgenteResponse> listarPublicados() {
        return agenteRepository.findByPublicadoTrue()
            .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AgenteResponse> listarPorCategoria(String categoria) {
        return agenteRepository.findByCategoria(categoria)
            .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public AgenteResponse obtener(Integer id) {
        return toResponse(agenteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado")));
    }

    @Transactional
    public AgenteResponse crear(AgenteRequest req) {
        Agente a = Agente.builder()
            .nombre(req.getNombre()).descripcion(req.getDescripcion())
            .systemPromt(req.getSystemPromt()).modelo(req.getModelo())
            .categoria(req.getCategoria()).precio(req.getPrecio())
            .publicado(false).build();
        return toResponse(agenteRepository.save(a));
    }

    @Transactional
    public AgenteResponse publicar(Integer id) {
        Agente a = agenteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado"));
        a.setPublicado(true);
        return toResponse(agenteRepository.save(a));
    }

    private AgenteResponse toResponse(Agente a) {
        return AgenteResponse.builder()
            .id(a.getId()).nombre(a.getNombre()).descripcion(a.getDescripcion())
            .modelo(a.getModelo()).categoria(a.getCategoria())
            .precio(a.getPrecio()).publicado(a.getPublicado()).build();
    }
}