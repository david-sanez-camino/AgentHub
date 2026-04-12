package com.agenthub.repository;
import com.agenthub.model.entity.MensajeEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MensajeRepository extends JpaRepository<MensajeEntity, Integer> {
    List<MensajeEntity> findByConversacionId(Integer conversacionId);
}
