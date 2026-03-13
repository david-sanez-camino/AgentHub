// src/services/admin_services.js

import { getAuthHeader } from "./auth";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * Manejo genérico de respuestas HTTP
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

/**
 * Cabeceras comunes con token si existe
 */
function getHeaders(withJson = true) {
    const authHeader = getAuthHeader();

    return {
        ...(withJson ? { "Content-Type": "application/json" } : {}),
        ...(authHeader ? { Authorization: authHeader } : {}),
    };
}

//
// ==============================
// DESARROLLADORES
// ==============================
//

export async function obtenerDesarrolladoresPendientes() {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/pendientes`, {
        method: "GET",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function obtenerDesarrolladoresAprobados() {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/aprobados`, {
        method: "GET",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function obtenerDesarrolladoresRechazados() {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/rechazados`, {
        method: "GET",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function aprobarDesarrollador(id) {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/${id}/aprobado`, {
        method: "PUT",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function rechazarDesarrollador(id) {
    const response = await fetch(`${API_BASE_URL}/desarrolladores/${id}/rechazado`, {
        method: "PUT",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

//
// ==============================
// AGENTES
// ==============================
//

export async function obtenerAgentes() {
    const response = await fetch(`${API_BASE_URL}/agentes`, {
        method: "GET",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function obtenerAgentePorId(id) {
    const response = await fetch(`${API_BASE_URL}/agentes/${id}`, {
        method: "GET",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function buscarAgentes(keyword = "") {
    const response = await fetch(
        `${API_BASE_URL}/agentes/buscar?keyword=${encodeURIComponent(keyword)}`,
        {
            method: "GET",
            headers: getHeaders(),
        }
    );

    return handleResponse(response);
}

export async function crearAgente(agenteData) {
    const response = await fetch(`${API_BASE_URL}/agentes`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(agenteData),
    });

    return handleResponse(response);
}

export async function aprobarAgente(id) {
    const response = await fetch(`${API_BASE_URL}/agentes/${id}/aprobar`, {
        method: "POST",
        headers: getHeaders(),
    });

    return handleResponse(response);
}

export async function rechazarAgente(id) {
    const response = await fetch(`${API_BASE_URL}/agentes/${id}/rechazar`, {
        method: "POST",
        headers: getHeaders(),
    });

    return handleResponse(response);
}
