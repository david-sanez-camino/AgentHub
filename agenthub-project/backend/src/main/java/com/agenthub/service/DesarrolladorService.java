package com.agenthub.service;

import com.agenthub.model.entity.Desarrollador;
import com.agenthub.model.dto.DesarrolladorResponse;
import com.agenthub.repository.DesarrolladorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service @RequiredArgsConstructor
public class DesarrolladorService {
    private final DesarrolladorRepository desarrolladorRepository;

    // Obtener todos los desarrolladores
    public List<DesarrolladorResponse> getAllDesarrolladores(){
        return desarrolladorRepository.findAll().stream().map(this::toResponse).toList();
    }

    private DesarrolladorResponse toResponse(Desarrollador desarrollador) {
        DesarrolladorResponse response = new DesarrolladorResponse();
        response.setId(desarrollador.getId());
         response.setNif(desarrollador.getNif());
        response.setWeb(desarrollador.getWeb());
        response.setDescripcion(desarrollador.getDescripcion());
        response.setExperiencia(desarrollador.getExperiencia());
        response.setEstado(desarrollador.getEstado());
        
        // Datos del usuario relacionado
        if (desarrollador.getUsuario() != null) {
            response.setNombre(desarrollador.getUsuario().getNombre());
            response.setApellido(desarrollador.getUsuario().getApellido());
            response.setEmail(desarrollador.getUsuario().getEmail());
            response.setEmpresa(desarrollador.getUsuario().getEmpresa());
        }
        
        return response;
    }
}