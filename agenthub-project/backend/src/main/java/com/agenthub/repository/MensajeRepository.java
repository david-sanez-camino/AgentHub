package com.agenthub.repository;
import com.agenthub.model.entity.Conversacion;
import com.agenthub.model.entity.Mensaje;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Integer> {
    List<Conversacion> findByInstanciaAgenteId(Integer instanciaId);
}
