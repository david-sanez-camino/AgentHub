package com.agenthub;

import com.agenthub.model.entity.Agente;
import com.agenthub.repository.AgenteRepository;
import com.agenthub.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AgenteControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private AgenteRepository agenteRepository;
    @Autowired private JwtService jwtService;

    private String token;
    private Integer agenteId;

    @BeforeEach
    void setUp() {
        // Token de prueba para endpoints protegidos
        token = jwtService.generateToken("test@test.com");

        // Agente de prueba en BD
        Agente a = Agente.builder()
            .nombre("Agente Test").descripcion("Descripción test")
            .categoria("soporte").precio(10).publicado(false).build();
        agenteId = agenteRepository.save(a).getId();

        // Agente publicado para test de listado
        Agente pub = Agente.builder()
            .nombre("Agente Publico").categoria("ventas")
            .precio(20).publicado(true).build();
        agenteRepository.save(pub);
    }

    // ─── Listado público (sin token) ────────────────────────────

    @Test
    void listarPublicados_sinToken_devuelve200() throws Exception {
        mockMvc.perform(get("/api/agentes/publicos"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].publicado").value(true));
    }

    @Test
    void listarPorCategoria_devuelveAgentesCorrectos() throws Exception {
        mockMvc.perform(get("/api/agentes/categoria/ventas")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].categoria").value("ventas"));
    }

    // ─── Obtener por ID ─────────────────────────────────────────

    @Test
    void obtenerAgente_existente_devuelve200() throws Exception {
        mockMvc.perform(get("/api/agentes/" + agenteId)
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Agente Test"));
    }

    @Test
    void obtenerAgente_inexistente_devuelve404() throws Exception {
        mockMvc.perform(get("/api/agentes/99999")
                .header("Authorization", "Bearer " + token))
            .andExpect(status().isNotFound());
    }

    @Test
    void obtenerAgente_sinToken_devuelve403() throws Exception {
        mockMvc.perform(get("/api/agentes/" + agenteId))
            .andExpect(status().isForbidden());
    }

    // ─── Crear agente ────────────────────────────────────────────

    @Test
    void crearAgente_datosValidos_devuelve201() throws Exception {
        String body = """
            {
              "nombre": "Mi Agente",
              "descripcion": "Ayuda con soporte",
              "modelo": "gpt-4",
              "categoria": "soporte",
              "precio": 15
            }
            """;
        mockMvc.perform(post("/api/agentes")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.nombre").value("Mi Agente"))
            .andExpect(jsonPath("$.publicado").value(false));
    }

    @Test
    void crearAgente_sinNombre_devuelve400() throws Exception {
        String body = "{\"descripcion\":\"Sin nombre\",\"precio\":5}";
        mockMvc.perform(post("/api/agentes")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isBadRequest());
    }

    // ─── Publicar agente ─────────────────────────────────────────

    @Test
    void publicarAgente_devuelvePublicadoTrue() throws Exception {
        mockMvc.perform(patch("/api/agentes/" + agenteId + "/publicar")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.publicado").value(true));
    }
}
