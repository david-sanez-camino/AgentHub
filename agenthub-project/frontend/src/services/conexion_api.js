// services/usuarios.js
// Servicio centralizado para consumir la API de AgentHub (registro, login, agentes).

const API_BASE_URL = "http://127.0.0.1:8080";

// Endpoints del backend
const AUTH_REGISTRO_ENDPOINT = `${API_BASE_URL}/api/auth/registro`;
const AUTH_LOGIN_ENDPOINT = `${API_BASE_URL}/api/auth/login`;
const AGENTES_ENDPOINT = `${API_BASE_URL}/api/agentes`;

// Función para manejar respuestas de la API (JSON o texto)
async function handleResponse(response) {
    const contentType = response.headers.get("content-type") || "";

    // Intentamos parsear según tipo
    const data = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : await response.text().catch(() => "");

    // Si la respuesta no es OK, lanzamos error con mensaje usable
    if (!response.ok) {
        const message =
            typeof data === "string"
                ? data
                : data?.message || data?.error || "Error en la petición";
        throw new Error(message);
    }

    return data;
}

// Registro usuario (normal o desarrollador)
// POST /api/auth/registro
export async function registrarUsuario(payload) {
    const response = await fetch(AUTH_REGISTRO_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Si tu backend usa cookies/sesión, descomenta:
        // credentials: "include",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
}

// Login usuario
// POST /api/auth/login
export async function loginUsuario(payload) {
    const response = await fetch(AUTH_LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Si tu backend usa cookies/sesión, descomenta:
        // credentials: "include",
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
}

// Obtener agentes
// GET /api/agentes
export async function obtenerAgentes(token) {
    const response = await fetch(AGENTES_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // Si tu backend usa cookies/sesión, descomenta:
        // credentials: "include",
    });

    return handleResponse(response);
}