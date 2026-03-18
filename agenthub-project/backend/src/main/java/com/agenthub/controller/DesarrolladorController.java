package com.agenthub.controller;

import com.agenthub.model.dto.DesarrolladorResponse;
import com.agenthub.service.DesarrolladorService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/desarrolladores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DesarrolladorController {
    private final DesarrolladorService desarrolladorService;

    //GET /api/desarrolladores - Obtener todos los desarrolladores
    @GetMapping
    public List<DesarrolladorResponse> getDesarrolladores() {
        return desarrolladorService.getAllDesarrolladores();
    }

        // PUT /api/desarrolladores/{id}/aprobado
    @PutMapping("/{id}/aprobado")
    public ResponseEntity<DesarrolladorResponse> aprobar(@PathVariable Integer id) {
        return ResponseEntity.ok(desarrolladorService.aprobar(id));
    }

    // PUT /api/desarrolladores/{id}/rechazado
    @PutMapping("/{id}/rechazado")
    public ResponseEntity<DesarrolladorResponse> rechazar(@PathVariable Integer id) {
        return ResponseEntity.ok(desarrolladorService.rechazar(id));
    }
}
