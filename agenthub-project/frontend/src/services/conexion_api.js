// services/usuarios.js
// Servicio centralizado para consumir la API de AgentHub (registro, login, agentes).

const API_BASE_URL = "https://agenthub-production-e274.up.railway.app";

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
    });
    return handleResponse(response);
}

// Aprobar agente
// PUT /api/agentes/{id}/aprobar
export async function aprobarAgente(id, token) {
    const response = await fetch(`${AGENTES_ENDPOINT}/${id}/aprobar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return handleResponse(response);
}

// Rechazar agente
// PUT /api/agentes/{id}/rechazar
export async function rechazarAgente(id, token) {
    const response = await fetch(`${AGENTES_ENDPOINT}/${id}/rechazar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return handleResponse(response);
}

// Obtener todos los usuarios
// GET /api/auth
export async function obtenerUsuarios(token) {
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return handleResponse(response);
}

// Obtener todos los desarrolladores
// GET /api/desarrolladores
export async function obtenerDesarrolladores(token) {
    const response = await fetch(`${API_BASE_URL}/api/desarrolladores`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return handleResponse(response);
}

// Aprobar desarrollador
// PUT /api/desarrolladores/{id}/aprobado
export async function aprobarDesarrollador(id, token) {
    const response = await fetch(`${API_BASE_URL}/api/desarrolladores/${id}/aprobado`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return handleResponse(response);
}

// Rechazar desarrollador
// PUT /api/desarrolladores/{id}/rechazado
export async function rechazarDesarrollador(id, token) {
    const response = await fetch(`${API_BASE_URL}/api/desarrolladores/${id}/rechazado`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return handleResponse(response);
}

// Crear un agente nuevo
// POST /api/agentes

export async function publicarAgente(payload, token = null) {
    const response = await fetch(AGENTES_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
    });

    return handleResponse(response);
}

export async function obtenerMisAgentes(token) {
    const response = await fetch(`${API_BASE_URL}/api/agentes/mis-agentes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
    });
    return handleResponse(response);
}

// Enviar mensaje al chat de un agente
// POST /api/chat
export async function enviarMensajeChat(agenteId, mensaje, token, conversacionId = null) {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
            agenteId: agenteId,
            mensajeUsuario: mensaje,
            conversacionId: conversacionId  
        }),
    });
    return handleResponse(response);
}

// Obtener informacion de un solo agente por su ID
export async function obtenerAgentePorId(id) {
    const response = await fetch(`${API_BASE_URL}/api/agentes/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return handleResponse(response);
}