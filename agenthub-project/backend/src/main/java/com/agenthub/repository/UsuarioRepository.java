package com.agenthub.repository;
import com.agenthub.model.entity.Usuario;
import org.springframework.stereotype.data.jpa.repository.JpaRepostory;
import org.hibernate.action.internal.OrphanRemovalAction;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository  extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail (String email);
    boolean existByEmail(String email);
}
