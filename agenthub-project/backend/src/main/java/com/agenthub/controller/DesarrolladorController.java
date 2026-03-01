package com.agenthub.controller;

import com.agenthub.model.dto.DesarrolladorResponse;
import com.agenthub.service.DesarrolladorService;
import lombok.RequiredArgsConstructor;
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
}
