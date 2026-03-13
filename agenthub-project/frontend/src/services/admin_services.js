// src/services/adminService.js

const API_BASE_URL = "http://localhost:8080/api";

/**
 * Función genérica para manejar respuestas HTTP
 */
async function handleResponse(response) {
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        throw new Error(data?.message || data || `Error HTTP: ${response.status}`);
    }

    return data;
} 

//
// ==============================
// DESARROLLADORES
// ==============================
//

/**
 * Ver desarrolladores pendientes
 * GET /api/desarrolladores/pendientes
 */
export async function obtenerDesarrolladoresPendientes() {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/pendientes`, {
        method: "GET",
    });

    return handleResponse(response);
}

/**
 * Ver desarrolladores aprobados
 * GET /api/desarrolladores/aprobados
 */
export async function obtenerDesarrolladoresAprobados() {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/aprobados`, {
        method: "GET",
    });

    return handleResponse(response);
}

/**
 * Ver desarrolladores rechazados
 * GET /api/desarrolladores/rechazados
 */
export async function obtenerDesarrolladoresRechazados() {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/rechazados`, {
        method: "GET",
    });

    return handleResponse(response);
}

/**
 * Aprobar desarrollador pendiente
 * PUT /api/desarrolladores/{id}/aprobado
 */
export async function aprobarDesarrollador(id) {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/${id}/aprobado`, {
        method: "PUT",
    });

    return handleResponse(response);
}

/**
 * Rechazar desarrollador pendiente
 * PUT /api/desarrolladores/{id}/rechazado
 */
export async function rechazarDesarrollador(id) {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/${id}/rechazado`, {
        method: "PUT",
    });

    return handleResponse(response);
}

//
// ==============================
// AGENTES
// ==============================
//

/**
 * Listar todos los agentes
 * GET /api/agentes
 */
export async function obtenerAgentes() {
    const response = await fetch(`${API_BASE_URL}/agentes`, {
        method: "GET",
    });

    return handleResponse(response);
}

/**
 * Obtener un agente por ID
 * GET /api/agentes/{id}
 */
export async function obtenerAgentePorId(id) {
    const response = await fetch(`${API_BASE_URL}/agentes/${id}`, {
        method: "GET",
    });

    return handleResponse(response);
}

/**
 * Buscar agentes por keyword
 * GET /api/agentes/buscar?keyword=
 */
export async function buscarAgentes(keyword = "") {
    const response = await fetch(
        `${API_BASE_URL}/agentes/buscar?keyword=${encodeURIComponent(keyword)}`,
        {
            method: "GET",
        }
    );

    return handleResponse(response);
}

/**
 * Crear agente
 * POST /api/agentes
 */
export async function crearAgente(agenteData) {
    const response = await fetch(`${API_BASE_URL}/agentes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(agenteData),
    });

    return handleResponse(response);
}

/**
 * Aprobar agente
 * POST /api/agentes/{id}/aprobar
 */
export async function aprobarAgente(id) {
    const response = await fetch(`${API_BASE_URL}/agentes/${id}/aprobar`, {
        method: "POST",
    });

    return handleResponse(response);
}

/**
 * Rechazar agente
 * POST /api/agentes/{id}/rechazar
 */
export async function rechazarAgente(id) {
    const response = await fetch(`${API_BASE_URL}/agentes/${id}/rechazar`, {
        method: "POST",
    });

    return handleResponse(response);
}
