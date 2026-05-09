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

    // POST /api/agentes — el desarrollador crea un agente (queda PENDIENTE)
    @PostMapping
    public ResponseEntity<AgenteResponse> crear(@Valid @RequestBody AgenteRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(agenteService.crear(req));
    }

    // GET /api/agentes — agentes aprobados del marketplace
    @GetMapping
    public ResponseEntity<List<AgenteResponse>> listarAprobados(){
        return ResponseEntity.ok(agenteService.listarAprobados());
    }

    // GET /api/agentes/mis-agentes — agentes propios del desarrollador autenticado
    @GetMapping("/mis-agentes")
    public ResponseEntity<List<AgenteResponse>> listarMisAgentes(){
        return ResponseEntity.ok(agenteService.listarMisAgentes());
    }

    // GET /api/agentes/todos — todos los agentes (admin)
    @GetMapping("/todos")
    public ResponseEntity<List<AgenteResponse>> listarTodos() {
        return ResponseEntity.ok(agenteService.listarTodos());
    }

    // GET /api/agentes/pendientes — agentes pendientes de revisión (admin)
    @GetMapping("/pendientes")
    public ResponseEntity<List<AgenteResponse>> listarPendientes() {
        return ResponseEntity.ok(agenteService.listarPendientes());
    }

    // GET /api/agentes/mis-metricas — métricas del desarrollador autenticado
    @GetMapping("/mis-metricas")
    public ResponseEntity<MetricasDesarrolladorResponse> obtenerMetricas() {
        return ResponseEntity.ok(agenteService.obtenerMetricas());
    }

    // GET /api/agentes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<AgenteResponse> obtener(@PathVariable Integer id){
        return ResponseEntity.ok(agenteService.obtener(id));
    }

    // PUT /api/agentes/{id} — el desarrollador edita su agente
    @PutMapping("/{id}")
    public ResponseEntity<AgenteResponse> actualizar(
            @PathVariable Integer id,
            @Valid @RequestBody AgenteRequest req) {
        return ResponseEntity.ok(agenteService.actualizar(id, req));
    }

    // DELETE /api/agentes/{id} — el desarrollador elimina su agente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        agenteService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // PUT /api/agentes/{id}/aprobar — el admin aprueba un agente
    @PutMapping("/{id}/aprobar")
    public ResponseEntity<AgenteResponse> aprobar(@PathVariable Integer id) {
        return ResponseEntity.ok(agenteService.aprobar(id));
    }

    // PUT /api/agentes/{id}/rechazar — el admin rechaza un agente
    @PutMapping("/{id}/rechazar")
    public ResponseEntity<AgenteResponse> rechazar(@PathVariable Integer id) {
        return ResponseEntity.ok(agenteService.rechazar(id));
    }

    // GET /api/agentes/buscar (HU-02)
    @GetMapping("/buscar")
    public ResponseEntity<List<AgenteResponse>> buscar(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) Integer precioMin,
            @RequestParam(required = false) Integer precioMax) {

        AgenteBusquedaRequest req = new AgenteBusquedaRequest();
        req.setKeyword(keyword);
        req.setCategoria(categoria);
        req.setPrecioMin(precioMin);
        req.setPrecioMax(precioMax);

        return ResponseEntity.ok(agenteService.buscar(req));
    }
}
