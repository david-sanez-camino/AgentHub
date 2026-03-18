package com.agenthub.repository;

import com.agenthub.model.entity.Agente;
import com.agenthub.model.entity.Desarrollador;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AgenteRepository extends JpaRepository<Agente, Integer>, JpaSpecificationExecutor<Agente>{

    // Agentes publicados (para HU-02)
    List<Agente> findByPublicadoTrue();

    // Por categoría
    List<Agente> findByCategoria(String categoria);

    // NUEVO: por estado de verificación (para el marketplace y el admin)
    List<Agente> findByEstadoVerificacion(String estadoVerificacion);

    // NUEVO: aprobados y publicados (lo que ve el cliente en la tienda)
    List<Agente> findByEstadoVerificacionAndPublicado(String estadoVerficacion, Boolean publicado);

    // buscar agentes vinculados al desarrollador 
    List<Agente> findByDesarrollador(Desarrollador desarrollador);
}
