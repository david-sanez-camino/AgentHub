package com.agenthub.service;

import com.agenthub.model.entity.Agente;
import org.springframework.data.jpa.domain.Specification;

public class AgenteSpecification {

    public static Specification<Agente> conFiltros(String keyword, String categoria, Integer precioMin, Integer precioMax) {
        return (root, query, cb) -> {
            Specification<Agente> spec = Specification.where(null);

            // Solo agentes aprobados y publicados
            spec = spec.and((r, q, c) -> 
                c.and(
                    c.equal(r.get("estadoVerificacion"), "APROBADO"),
                    c.equal(r.get("publicado"), true)
                )
            );

            // Filtro por keyword (busca en nombre o descripción)
            if (keyword != null && !keyword.isEmpty()) {
                spec = spec.and((r, q, c) -> 
                    c.or(
                        c.like(c.lower(r.get("nombre")), "%" + keyword.toLowerCase() + "%"),
                        c.like(c.lower(r.get("descripcion")), "%" + keyword.toLowerCase() + "%")
                    )
                );
            }

            // Filtro por categoría
            if (categoria != null && !categoria.isEmpty()) {
                spec = spec.and((r, q, c) -> 
                    c.equal(r.get("categoria"), categoria)
                );
            }

            // Filtro por precio mínimo
            if (precioMin != null) {
                spec = spec.and((r, q, c) -> 
                    c.greaterThanOrEqualTo(r.get("precio"), precioMin)
                );
            }

            // Filtro por precio máximo
            if (precioMax != null) {
                spec = spec.and((r, q, c) -> 
                    c.lessThanOrEqualTo(r.get("precio"), precioMax)
                );
            }

            return spec.toPredicate(root, query, cb);
        };
    }
}
