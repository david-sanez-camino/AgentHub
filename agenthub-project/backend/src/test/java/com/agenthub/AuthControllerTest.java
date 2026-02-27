package com.agenthub;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class AuthControllerTest {
    @Autowired private MockMvc mockMvc;
    
    @Test
    void registro_datosValido_devuevle201() throws Exception {
        String body = """
            {
              "email": "ana@test.com",
              "contrasenia": "123456",
              "nombre": "Ana García"
            }
            """;
        
            mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value("ana@test.com"))
            .andExpect(jsonPath("$.nombre").value("Ana García"))
            .andExpect(jsonPath("$.id").exists());
    }

    @Test
    void registro_emailInvalido_devuelve400() throws Exception {
        String body = "{\"email\":\"no-valido\",\"contrasenia\":\"123456\",\"nombre\":\"Test\"}";
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isBadRequest());
    }

    @Test
    void registro_contraseniaMuyCorta_devuelve400() throws Exception {
        String body = "{\"email\":\"b@t.com\",\"contrasenia\":\"123\",\"nombre\":\"Test\"}";
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isBadRequest());
    }

    @Test
    void registro_emailDuplicado_devuelve400() throws Exception {
        String body = "{\"email\":\"dup@t.com\",\"contrasenia\":\"123456\",\"nombre\":\"Dup\"}";
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(body));
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error").exists());
    }

    @Test
    void registro_conEmpresaYTelefono_guarda() throws Exception {
        String body = """
            {
              "email": "dev@empresa.com",
              "contrasenia": "pass123",
              "nombre": "Carlos Dev",
              "empresa": "TechCorp SL",
              "telefono": 612345678
            }
            """;
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.empresa").value("TechCorp SL"));
    }

    // ─── Login ──────────────────────────────────────────────────

    @Test
    void login_credencialesValidas_devuelveToken() throws Exception {
        // Primero registrar
        String reg = "{\"email\":\"u@t.com\",\"contrasenia\":\"pass123\",\"nombre\":\"U\"}";
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(reg));
        // Luego login
        String login = "{\"email\":\"u@t.com\",\"contrasenia\":\"pass123\"}";
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON).content(login))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").exists())
            .andExpect(jsonPath("$.type").value("Bearer"))
            .andExpect(jsonPath("$.usuario.email").value("u@t.com"));
    }

    @Test
    void login_contraseniaIncorrecta_devuelve400() throws Exception {
        String reg = "{\"email\":\"x@t.com\",\"contrasenia\":\"buena\",\"nombre\":\"X\"}";
        mockMvc.perform(post("/api/auth/registro")
                .contentType(MediaType.APPLICATION_JSON).content(reg));
        String login = "{\"email\":\"x@t.com\",\"contrasenia\":\"mala\"}";
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON).content(login))
            .andExpect(status().isBadRequest());
    }

    @Test
    void login_usuarioNoExiste_devuelve400() throws Exception {
        String login = "{\"email\":\"noexiste@t.com\",\"contrasenia\":\"pass\"}";
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON).content(login))
            .andExpect(status().isBadRequest());
    }



}
