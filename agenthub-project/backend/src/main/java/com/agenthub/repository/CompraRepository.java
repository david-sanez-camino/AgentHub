package com.agenthub.repository;

import com.agenthub.model.entity.Compra;
import com.agenthub.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CompraRepository extends JpaRepository<Compra, Integer> {
    List<Compra> findByUsuario(Usuario usuario);
    boolean existsByUsuarioAndAgenteId(Usuario usuario, Integer agenteId);
    Optional<Compra> findByStripePaymentIntentId(String paymentIntentId);
    long countByAgenteId(Integer agenteId);
    List<Compra> findByAgenteId(Integer agenteId);
}