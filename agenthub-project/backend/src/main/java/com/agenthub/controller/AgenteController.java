package com.agenthub.controller;
import com.agenthub.model.dto.*;
import com.agenthub.service.AgenteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/agentes")
@RequiredArgsConstructor @CrossOrigin(origins = "*")
public class AgenteController {
    private final AgenteService agenteService;

    @GetMapping("/publicos")
    public ResponseEntity<List<AgenteResponse>> listarPublicados() {
        return ResponseEntity.ok(agenteService.listarPublicados());
    }

    @GetMapping("/categoria/{cat}")
    public ResponseEntity<List<AgenteResponse>> listarPorCategoria(
            @PathVariable String cat) {
        return ResponseEntity.ok(agenteService.listarPorCategoria(cat));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgenteResponse> obtener(@PathVariable Integer id) {
        return ResponseEntity.ok(agenteService.obtener(id));
    }

    @PostMapping
    public ResponseEntity<AgenteResponse> crear(
            @Valid @RequestBody AgenteRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(agenteService.crear(req));
    }

    @PatchMapping("/{id}/publicar")
    public ResponseEntity<AgenteResponse> publicar(@PathVariable Integer id) {
        return ResponseEntity.ok(agenteService.publicar(id));
    }
}
