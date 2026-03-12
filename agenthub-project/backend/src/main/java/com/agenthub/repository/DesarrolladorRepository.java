package com.agenthub.repository;

import com.agenthub.model.entity.Desarrollador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DesarrolladorRepository extends JpaRepository<Desarrollador, Integer> {
    List<Desarrollador> findByEstado(String estado);
}