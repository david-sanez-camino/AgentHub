package com.agenthub.repository;
import com.agenthub.model.entity.Herramienta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HerramientaRepository extends JpaRepository<Herramienta, Integer> {


    
}
