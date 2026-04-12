package com.agenthub.repository;
import com.agenthub.model.entity.InstanciaAgente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InstanciaAgenteRepostory extends JpaRepository<InstanciaAgente, Integer>{
    List<InstanciaAgente> findByUsuarioId(Integer usuarioId);

    // Buscar la instancia de un usuario con un agente especifico
    // usada para recuperar o crear una instancia al inciar un chat
    Optional<InstanciaAgente> findByUsuarioIdAndAgenteId(Integer usuarioId, Integer agenteId);
}
