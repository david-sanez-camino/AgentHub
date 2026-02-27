package com.agenthub.repository;
import com.agenthub.model.entity.Conversacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConversacionRepository extends JpaRepository<Conversacion, Integer> {
    List<Conversacion> findByInstanciaAgenteId(Integer instanciaId);
}
