package com.agenthub.repository;

import com.agenthub.model.entity.Agente;
import com.agenthub.model.entity.Usuario;
import com.agenthub.model.entity.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ValoracionRepository extends JpaRepository<Valoracion, Integer> {
    List<Valoracion> findByAgenteId(Integer agenteId);
    Optional<Valoracion> findByUsuarioAndAgenteId(Usuario usuario, Integer agenteId);
    boolean existsByUsuarioAndAgenteId(Usuario usuario, Integer agenteId);

    @Query("SELECT AVG(v.estrellas) FROM Valoracion v WHERE v.agente.id = :agenteId")
    Double promedioEstrellasByAgenteId(@Param("agenteId") Integer agenteId);
}