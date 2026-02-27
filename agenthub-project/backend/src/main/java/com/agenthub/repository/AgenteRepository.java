package com.agenthub.repository;
import com.agenthub.model.entity.Agente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AgenteRepository extends JpaRepository<Agente, Integer>{
    List<Agente> findByPublicadoTrue();
    List<Agente> findByCategoria(String categoria);
}
