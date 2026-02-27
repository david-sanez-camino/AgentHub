package com.agenthub.repository;
import com.agenthub.model.entity.InstanciaAgente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InstanciaAgenteRepostory extends JpaRepository<IntanciaAgente, Integer>{
    List<InstanciaAgente> findByUsuarioId(Integer usuarioId);
}
