/*
Pantalla del admin:
- Lista agentes
- Lista desarrolladores pendientes
- Lista usuarios de la plataforma
- Permite aprobar/rechazar agentes
- Permite aprobar/rechazar desarrolladores pendientes

IMPORTANTE:
La parte de usuarios está preparada, pero necesitas tener un endpoint real
en adminService para traerlos desde backend.
*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    obtenerAgentes,
    aprobarAgente,
    rechazarAgente,
    obtenerDesarrolladoresPendientes,
    aprobarDesarrollador,
    rechazarDesarrollador,
   // obtenerUsuarios // esta función la añadimos en adminService abajo
} from "../services/admin_services";

export default function AdminScreen() {
    // =========================
    // ESTADOS
    // =========================

    const [agentes, setAgentes] = useState([]);
    const [desarrolladoresPendientes, setDesarrolladoresPendientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // =========================
    // CARGA INICIAL
    // =========================
    useEffect(() => {
        cargarDatosAdmin();
    }, []);

    // Carga todos los datos de la pantalla
    async function cargarDatosAdmin() {
        try {
            setLoading(true);
            setErrorMsg("");
            setSuccessMsg("");

            const [agentesResp, desarrolladoresResp, usuariosResp] = await Promise.all([
                obtenerAgentes(),
                obtenerDesarrolladoresPendientes(),
               // obtenerUsuarios().catch(() => []) // si aún no existe o falla, dejamos []
            ]);

            setAgentes(Array.isArray(agentesResp) ? agentesResp : []);
            setDesarrolladoresPendientes(Array.isArray(desarrolladoresResp) ? desarrolladoresResp : []);
            setUsuarios(Array.isArray(usuariosResp) ? usuariosResp : []);
        } catch (error) {
            setErrorMsg(error.message || "Error cargando el panel de administración");
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // ACCIONES AGENTES
    // =========================

    async function handleAprobarAgente(id) {
        try {
            setErrorMsg("");
            setSuccessMsg("");
            await aprobarAgente(id);
            setSuccessMsg(`Agente ${id} aprobado correctamente`);
            await cargarDatosAdmin();
        } catch (error) {
            setErrorMsg(error.message || "No se pudo aprobar el agente");
        }
    }

    async function handleRechazarAgente(id) {
        try {
            setErrorMsg("");
            setSuccessMsg("");
            await rechazarAgente(id);
            setSuccessMsg(`Agente ${id} rechazado correctamente`);
            await cargarDatosAdmin();
        } catch (error) {
            setErrorMsg(error.message || "No se pudo rechazar el agente");
        }
    }

    // =========================
    // ACCIONES DESARROLLADORES
    // =========================

    async function handleAprobarDesarrollador(id) {
        try {
            setErrorMsg("");
            setSuccessMsg("");
            await aprobarDesarrollador(id);
            setSuccessMsg(`Desarrollador ${id} aprobado correctamente`);
            await cargarDatosAdmin();
        } catch (error) {
            setErrorMsg(error.message || "No se pudo aprobar el desarrollador");
        }
    }

    async function handleRechazarDesarrollador(id) {
        try {
            setErrorMsg("");
            setSuccessMsg("");
            await rechazarDesarrollador(id);
            setSuccessMsg(`Desarrollador ${id} rechazado correctamente`);
            await cargarDatosAdmin();
        } catch (error) {
            setErrorMsg(error.message || "No se pudo rechazar el desarrollador");
        }
    }

    // =========================
    // RENDER TARJETA AGENTE
    // =========================
    function renderAgente(agent) {
        return (
            <div
                key={agent.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4"
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                            {agent.nombre || agent.agentName || `Agente #${agent.id}`}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {agent.descripcion || agent.description || "Sin descripción"}
                        </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {agent.estado || agent.status || "Solicitado"}
                    </span>
                </div>

                {(agent.categoria || agent.category) && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Categoría: {agent.categoria || agent.category}
                    </p>
                )}

                {(agent.desarrollador || agent.developer) && (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Desarrollador: {agent.desarrollador || agent.developer}
                    </p>
                )}

                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => handleAprobarAgente(agent.id)}
                        className="flex-1 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700 transition"
                    >
                        Aprobar
                    </button>

                    <button
                        onClick={() => handleRechazarAgente(agent.id)}
                        className="flex-1 rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 transition"
                    >
                        Rechazar
                    </button>
                </div>
            </div>
        );
    }

    // =========================
    // RENDER TARJETA DESARROLLADOR
    // =========================
    function renderDesarrollador(dev) {
        return (
            <div
                key={dev.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4"
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                            {dev.nombre || dev.name || `Desarrollador #${dev.id}`}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {dev.email || dev.correo || "Sin email"}
                        </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        {dev.estado || dev.status || "Pendiente"}
                    </span>
                </div>

                {(dev.proyecto || dev.project) && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Proyecto: {dev.proyecto || dev.project}
                    </p>
                )}

                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => handleAprobarDesarrollador(dev.id)}
                        className="flex-1 rounded-lg bg-emerald-600 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-700 transition"
                    >
                        Aprobar
                    </button>

                    <button
                        onClick={() => handleRechazarDesarrollador(dev.id)}
                        className="flex-1 rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700 transition"
                    >
                        Rechazar
                    </button>
                </div>
            </div>
        );
    }

    // =========================
    // RENDER TARJETA USUARIO
    // =========================
    function renderUsuario(user) {
        return (
            <div
                key={user.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-4"
            >
                <p className="font-semibold text-slate-900 dark:text-white">
                    {user.nombre || user.name || `Usuario #${user.id}`}
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {user.email || user.correo || "Sin email"}
                </p>

                {(user.rol || user.role) && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        Rol: {user.rol || user.role}
                    </p>
                )}

                {(user.empresa) && (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        Empresa: {user.empresa}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* Header */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="text-lg font-bold tracking-tight">
                        AgentHub
                    </Link>

                    <Link
                        to="/"
                        className="px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        Volver
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Título */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Panel de Administración
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Gestión de agentes, desarrolladores y usuarios de la plataforma
                        </p>
                    </div>

                    {/* Mensajes */}
                    {loading && (
                        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
                            Cargando datos del panel...
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                            {successMsg}
                        </div>
                    )}

                    {/* Las tres partes de la pantalla */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* 1. AGENTES */}
                        <section className="bg-white dark:bg-[#1a2230] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    Agentes solicitados
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Agentes enviados para revisión y gestión
                                </p>
                            </div>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                                {agentes.length > 0 ? (
                                    agentes.map(renderAgente)
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        No hay agentes para mostrar.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* 2. DESARROLLADORES PENDIENTES */}
                        <section className="bg-white dark:bg-[#1a2230] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    Desarrolladores pendientes
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Solicitudes pendientes de aceptación
                                </p>
                            </div>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                                {desarrolladoresPendientes.length > 0 ? (
                                    desarrolladoresPendientes.map(renderDesarrollador)
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        No hay desarrolladores pendientes.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* 3. USUARIOS */}
                        <section className="bg-white dark:bg-[#1a2230] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    Usuarios de la plataforma
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    Listado general de usuarios registrados
                                </p>
                            </div>

                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                                {usuarios.length > 0 ? (
                                    usuarios.map(renderUsuario)
                                ) : (
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        No hay usuarios para mostrar o falta conectar el endpoint.
                                    </p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800">
                © 2026 AgentHub Inc. · Todos los derechos reservados
            </footer>
        </div>
    );
}
