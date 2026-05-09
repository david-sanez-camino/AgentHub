package com.agenthub.service;
import com.agenthub.exception.ResourceNotFoundException;
import com.agenthub.model.dto.*;
import com.agenthub.model.entity.*;
import com.agenthub.repository.*;
import lombok.RequiredArgsConstructor;
import java.util.ArrayList;

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
    private final HerramientaRepository herramientaRepository;
    private final CompraRepository compraRepository;
    private final InstanciaAgenteRepostory instanciaAgenteRepository;
    private final ConversacionRepository conversacionRepository;
    private final MensajeRepository mensajeRepository;

    @Transactional
    public AgenteResponse crear(AgenteRequest req){
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
        .herramientas(new ArrayList<>())
        .build();

        Agente saved = agenteRepository.save(a);

        if (req.getUrlMcp() != null && !req.getUrlMcp().isBlank()) {
            Herramienta herramienta = Herramienta.builder()
                .nombre("mcp_agente_" + saved.getId())
                .descripcion("Servidor MCP del agente: " + saved.getNombre())
                .mcpServerUrl(req.getUrlMcp())
                .build();
            herramientaRepository.save(herramienta);
            saved.getHerramientas().add(herramienta);
            saved = agenteRepository.save(saved);
        }

        return toResponse(saved);
    }

    @Transactional
    public AgenteResponse actualizar(Integer id, AgenteRequest req) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Agente agente = agenteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado"));

        if (!agente.getDesarrollador().getUsuario().getEmail().equals(email)) {
            throw new IllegalStateException("No tienes permisos para editar este agente");
        }

        agente.setNombre(req.getNombre());
        agente.setDescripcion(req.getDescripcion());
        agente.setSystemPromt(req.getSystemPromt());
        agente.setModelo(req.getModelo());
        agente.setCategoria(req.getCategoria());
        agente.setPrecio(req.getPrecio());

        if ("APROBADO".equals(agente.getEstadoVerificacion())) {
            agente.setEstadoVerificacion("PENDIENTE");
            agente.setPublicado(false);
        }

        return toResponse(agenteRepository.save(agente));
    }

    @Transactional
    public void eliminar(Integer id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Agente agente = agenteRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado"));

        if (!agente.getDesarrollador().getUsuario().getEmail().equals(email)) {
            throw new IllegalStateException("No tienes permisos para eliminar este agente");
        }

        if (compraRepository.countByAgenteId(id) > 0) {
            throw new IllegalStateException("No puedes eliminar un agente que ya tiene compras activas");
        }

        List<InstanciaAgente> instancias = instanciaAgenteRepository.findByAgenteId(id);
        for (InstanciaAgente instancia : instancias) {
            List<Conversacion> convs = conversacionRepository.findByInstanciaAgenteId(instancia.getId());
            for (Conversacion conv : convs) {
                mensajeRepository.deleteAll(mensajeRepository.findByConversacionId(conv.getId()));
            }
            conversacionRepository.deleteAll(convs);
        }
        instanciaAgenteRepository.deleteAll(instancias);

        agenteRepository.delete(agente);
    }

    public MetricasDesarrolladorResponse obtenerMetricas() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Desarrollador desarrollador = usuario.getDesarrollador();
        if (desarrollador == null) {
            throw new IllegalStateException("No eres desarrollador");
        }

        List<Agente> misAgentes = agenteRepository.findByDesarrollador(desarrollador);

        List<MetricasDesarrolladorResponse.MetricaAgente> metricasAgentes = misAgentes.stream().map(a -> {
            int ventas = (int) compraRepository.countByAgenteId(a.getId());
            int ingresos = ventas * (a.getPrecio() != null ? a.getPrecio() : 0);
            return MetricasDesarrolladorResponse.MetricaAgente.builder()
                .id(a.getId())
                .nombre(a.getNombre())
                .categoria(a.getCategoria())
                .precio(a.getPrecio())
                .estadoVerificacion(a.getEstadoVerificacion())
                .ventas(ventas)
                .ingresos(ingresos)
                .build();
        }).collect(Collectors.toList());

        int totalVentas = metricasAgentes.stream().mapToInt(MetricasDesarrolladorResponse.MetricaAgente::getVentas).sum();
        int totalIngresos = metricasAgentes.stream().mapToInt(MetricasDesarrolladorResponse.MetricaAgente::getIngresos).sum();

        return MetricasDesarrolladorResponse.builder()
            .totalAgentes(misAgentes.size())
            .totalVentas(totalVentas)
            .totalIngresos(totalIngresos)
            .agentes(metricasAgentes)
            .build();
    }

    public List<AgenteResponse> listarAprobados() {
        return agenteRepository.findByEstadoVerificacionAndPublicado("APROBADO", true)
        .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public AgenteResponse aprobar(Integer id){
        Agente a = agenteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado"));
        a.setEstadoVerificacion("APROBADO");
        a.setPublicado(true);
        return toResponse(agenteRepository.save(a));
    }

    @Transactional
    public AgenteResponse rechazar(Integer id){
        Agente a = agenteRepository.findById(id)
        .orElseThrow(()-> new ResourceNotFoundException("Agente no encontrado"));
        a.setEstadoVerificacion("RECHAZADO");
        a.setPublicado(false);
        return toResponse(agenteRepository.save(a));
    }

    public AgenteResponse obtener(Integer id){
        return toResponse(agenteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Agente no encontrado")));
    }

    public List<AgenteResponse> listarPendientes() {
        return agenteRepository.findByEstadoVerificacion("PENDIENTE").stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AgenteResponse> buscar(AgenteBusquedaRequest req) {
        Specification<Agente> spec = AgenteSpecification.conFiltros(
            req.getKeyword(),
            req.getCategoria(),
            req.getPrecioMin(),
            req.getPrecioMax()
        );
        return agenteRepository.findAll(spec).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AgenteResponse> listarMisAgentes() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        Desarrollador desarrollador = usuario.getDesarrollador();
        if (desarrollador == null) {
            throw new IllegalStateException("No eres desarrollador bro");
        }

        return agenteRepository.findByDesarrollador(desarrollador).stream()
            .map(a -> {
                AgenteResponse r = toResponse(a);
                r.setVentas((int) compraRepository.countByAgenteId(a.getId()));
                return r;
            })
            .collect(Collectors.toList());
    }

    private AgenteResponse toResponse(Agente a) {
        return AgenteResponse.builder()
            .id(a.getId())
            .nombre(a.getNombre())
            .descripcion(a.getDescripcion())
            .systemPromt(a.getSystemPromt())
            .modelo(a.getModelo())
            .categoria(a.getCategoria())
            .precio(a.getPrecio())
            .publicado(a.getPublicado())
            .estadoVerificacion(a.getEstadoVerificacion())
            .build();
    }

    public List<AgenteResponse> listarTodos(){
        return agenteRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }
}
