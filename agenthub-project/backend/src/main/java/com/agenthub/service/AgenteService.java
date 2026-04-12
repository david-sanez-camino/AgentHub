package com.agenthub.service;
import com.agenthub.exception.ResourceNotFoundException;
import com.agenthub.model.dto.*;
import com.agenthub.model.entity.Agente;
import com.agenthub.model.entity.Desarrollador;
import com.agenthub.model.entity.Usuario;
import com.agenthub.repository.AgenteRepository;
import com.agenthub.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service @RequiredArgsConstructor
public class AgenteService {
    private final AgenteRepository agenteRepository;
    private final UsuarioRepository usuarioRepository;

    // Creacion de agente
    @Transactional
    public AgenteResponse crear(AgenteRequest req){
        // Obtener el usuario autenticado
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        
        Desarrollador desarrollador = usuario.getDesarrollador();
        if (desarrollador == null) {
            throw new IllegalStateException("Solo los desarrolladores pueden crear agentes");
        }
        
        Agente a = Agente.builder()
        .desarrollador(desarrollador)
        .nombre(req.getNombre())
        .descripcion(req.getDescripcion())
        .systemPromt(req.getSystemPromt())
        .modelo(req.getModelo())
        .categoria(req.getCategoria())
        .precio(req.getPrecio())
        .publicado(false)
        .estadoVerificacion("PENDIENTE")
        .build();
        return toResponse(agenteRepository.save(a));
    }

    //Listar todos los agente aprobados en el marketplace
    public List<AgenteResponse> listarAprobados() {
        return agenteRepository.findByEstadoVerificacionAndPublicado("APROBADO", true)
        .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // Aprobar agente (Admin)
    @Transactional
    public AgenteResponse aprobar(Integer id){
        Agente a = agenteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado"));
        a.setEstadoVerificacion("APROBADO");
        a.setPublicado(true);
        return toResponse(agenteRepository.save(a));
    }

    //Rechazar agente (admin)
    @Transactional
    public AgenteResponse rechazar(Integer id){
        Agente a = agenteRepository.findById(id)
        .orElseThrow(()-> new ResourceNotFoundException("Agente no encontrado"));
        a.setEstadoVerificacion("RECHAZADO");
        a.setPublicado(false);
        return toResponse(agenteRepository.save(a));
    }

    //Obtener por id
    public AgenteResponse obtener(Integer id){
        return toResponse(agenteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado")));
        
    }

    //Listar pendientes (Admin)
    public List<AgenteResponse> listarPendientes() {
        return agenteRepository.findByEstadoVerificacion("PENDIENTE").stream().map(this::toResponse).collect(Collectors.toList());
    }


    //HU-02: Búsqueda y filtrado
    public List<AgenteResponse> buscar(AgenteBusquedaRequest req) {
        Specification<Agente> spec = AgenteSpecification.conFiltros(
            req.getKeyword(),
            req.getCategoria(),
            req.getPrecioMin(),
            req.getPrecioMax()
        );
        return agenteRepository.findAll(spec).stream().map(this::toResponse).collect(Collectors.toList());
    }

    // obtener agentes propios usando el jwt
    public List<AgenteResponse> listarMisAgentes() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Desarrollador desarrollador = usuario.getDesarrollador();
        if (desarrollador == null) {
            throw new IllegalStateException("No eres desarrollador bro");
        }

        //buscar agentes en la bbdd
        return agenteRepository.findByDesarrollador(desarrollador).stream().map(this::toResponse).collect(Collectors.toList());
    }

    //Mapper
    private AgenteResponse toResponse(Agente a) {
        return AgenteResponse.builder().id(a.getId()).nombre(a.getNombre()).descripcion(a.getDescripcion())
        .modelo(a.getModelo()).categoria(a.getCategoria()).precio(a.getPrecio()).publicado(a.getPublicado())
        .estadoVerificacion(a.getEstadoVerificacion()).build();
    }
    

}