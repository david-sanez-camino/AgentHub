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
<<<<<<< HEAD

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Search, Filter } from "lucide-react";
import logo from "../assets/logo.png";
import { getToken } from "../services/auth";
>>>>>>> feature/mejoras-admin
import {
    obtenerAgentes,
    aprobarAgente,
    rechazarAgente,
<<<<<<< HEAD
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
=======
    obtenerUsuarios,
    obtenerDesarrolladores,
    aprobarDesarrollador,
    rechazarDesarrollador,
} from "../services/conexion_api";

export default function AdminScreen() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("usuarios");
    const [searchQuery, setSearchQuery] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [desarrolladores, setDesarrolladores] = useState([]);
    const [agentes, setAgentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
>>>>>>> feature/mejoras-admin

    useEffect(() => {
        cargarDatos();
    }, []);

    async function cargarDatos() {
        setLoading(true);
        setError("");
        const token = getToken();
        try {
            const [usrs, devs, ags] = await Promise.all([
                obtenerUsuarios(token),
                obtenerDesarrolladores(token),
                obtenerAgentes(token),
            ]);
            setUsuarios(usrs || []);
            setDesarrolladores(devs || []);
            setAgentes(ags || []);
        } catch (e) {
            setError("Error al cargar los datos. Verifica tu sesión.");
        } finally {
            setLoading(false);
        }
    }

    // Mapeo email -> desarrollador para unir con usuarios
    const devPorEmail = Object.fromEntries(
        desarrolladores.map((d) => [d.email, d])
    );

    function estadoBadge(estado) {
        const map = {
            Activo: "bg-green-500/20 text-green-400 border-green-500/30",
            PENDIENTE: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            Pendiente: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            APROBADO: "bg-green-500/20 text-green-400 border-green-500/30",
            Aprobado: "bg-green-500/20 text-green-400 border-green-500/30",
            Publicado: "bg-green-500/20 text-green-400 border-green-500/30",
            "En Revisión": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
            RECHAZADO: "bg-red-500/20 text-red-400 border-red-500/30",
            Rechazado: "bg-red-500/20 text-red-400 border-red-500/30",
        };
        return map[estado] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }

    function estadoLegible(estadoVerificacion) {
        const map = { Pendiente: "En Revisión", Aprobado: "Publicado", Rechazado: "Rechazado" };
        return map[estadoVerificacion] || estadoVerificacion;
    }

    function esPendiente(estado) {
        return (estado || "").toLowerCase() === "pendiente";
    }

    async function handleAprobarDesarrollador(devId) {
        const token = getToken();
        try {
            const actualizado = await aprobarDesarrollador(devId, token);
            setDesarrolladores((prev) =>
                prev.map((d) => (d.id === devId ? { ...d, ...(actualizado || {}), estado: actualizado?.estado || "aprobado" } : d))
            );
        } catch {
            alert("Error al aprobar el desarrollador.");
        }
    }

    async function handleRechazarDesarrollador(devId) {
        const token = getToken();
        try {
            const actualizado = await rechazarDesarrollador(devId, token);
            setDesarrolladores((prev) =>
                prev.map((d) => (d.id === devId ? { ...d, ...(actualizado || {}), estado: actualizado?.estado || "rechazado" } : d))
            );
        } catch {
            alert("Error al rechazar el desarrollador.");
        }
    }

    async function handleAprobarAgente(id) {
        const token = getToken();
        try {
            await aprobarAgente(id, token);
            setAgentes((prev) =>
                prev.map((a) => (a.id === id ? { ...a, estadoVerificacion: "Aprobado" } : a))
            );
        } catch {
            alert("Error al aprobar el agente.");
        }
    }

    async function handleRechazarAgente(id) {
        const token = getToken();
        try {
            await rechazarAgente(id, token);
            setAgentes((prev) =>
                prev.map((a) => (a.id === id ? { ...a, estadoVerificacion: "Rechazado" } : a))
            );
        } catch {
            alert("Error al rechazar el agente.");
        }
    }

    const filteredUsuarios = usuarios.filter(
        (u) =>
            (u.nombre + " " + u.apellido).toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredAgentes = agentes.filter(
        (a) =>
            a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.categoria || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const devsPendientes = desarrolladores.filter((d) => esPendiente(d.estado)).length;
    const agentesPendientes = agentes.filter((a) => a.estadoVerificacion === "Pendiente").length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] via-[#252a3a] to-[#1a1f2e]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2e]/80 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="AgentHub Logo" className="w-8 h-8 object-contain rounded-md" />
                        <span className="text-xl">
                            <span className="text-white font-semibold">Agent</span>
                            <span className="text-blue-400 font-semibold">Hub</span>
                        </span>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
                    >
                        Volver
                    </button>
                </div>
            </header>

            {/* Main */}
<<<<<<< HEAD
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
=======
            <div className="pt-24 px-8 pb-12">
                <div className="max-w-[1440px] mx-auto">
                    {/* Title */}
                    <div className="mb-8">
                        <h1 className="text-3xl text-white mb-2">Panel de Administración</h1>
                        <p className="text-gray-400">Gestiona usuarios, desarrolladores y agentes de la plataforma</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-400 text-sm">
                            ❌ {error}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-white/10">
                        {["usuarios", "agentes"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                                className={`px-6 py-3 text-lg transition-colors relative capitalize ${
                                    activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Buscador */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={activeTab === "usuarios" ? "Buscar usuarios..." : "Buscar agentes..."}
                                className="w-full pl-11 pr-4 py-3 bg-[#1f2937] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <button className="px-4 py-3 bg-[#1f2937] border border-white/10 rounded-lg text-white hover:bg-[#252a3a] transition-colors flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            <span>Filtrar</span>
                        </button>
                    </div>

                    {/* Tabla */}
                    <div className="bg-[#1f2937] border border-white/10 rounded-lg overflow-hidden">
                        {loading ? (
                            <div className="py-16 text-center text-gray-400">Cargando...</div>
                        ) : activeTab === "usuarios" ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Nombre</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Email</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Rol</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Estado</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Empresa</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsuarios.length === 0 ? (
                                                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No hay usuarios</td></tr>
                                        ) : filteredUsuarios.map((u) => {
                                            const dev = devPorEmail[u.email];
                                            const estado = dev ? dev.estado : "Activo";
                                            const devId = dev?.id;
                                            const mostrarAccionesDev = u.rol === "DESARROLLADOR" && devId && esPendiente(estado);
                                            return (
                                                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 text-white">{u.nombre} {u.apellido}</td>
                                                    <td className="px-6 py-4 text-gray-400">{u.email}</td>
                                                    <td className="px-6 py-4 text-blue-400">{u.rol}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${estadoBadge(estado)}`}>
                                                            {estado}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-400">{u.empresa || "-"}</td>
                                                    <td className="px-6 py-4">
                                                        {mostrarAccionesDev && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleAprobarDesarrollador(devId)}
                                                                    className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                                                    title="Aprobar desarrollador"
                                                                >
                                                                    <Check className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRechazarDesarrollador(devId)}
                                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                                                    title="Rechazar desarrollador"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Nombre</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Categoría</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Modelo</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Estado</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Precio</th>
                                            <th className="px-6 py-4 text-left text-sm text-gray-400">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAgentes.length === 0 ? (
                                            <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No hay agentes</td></tr>
                                        ) : filteredAgentes.map((a) => {
                                            const estadoUI = estadoLegible(a.estadoVerificacion);
                                            return (
                                                <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 text-white">{a.nombre}</td>
                                                    <td className="px-6 py-4 text-blue-400">{a.categoria || "-"}</td>
                                                    <td className="px-6 py-4 text-gray-400">{a.modelo || "-"}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${estadoBadge(estadoUI)}`}>
                                                            {estadoUI}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-400">
                                                        {a.precio != null ? `${a.precio} €` : "-"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {a.estadoVerificacion === "Pendiente" && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleAprobarAgente(a.id)}
                                                                    className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                                                                    title="Aprobar"
                                                                >
                                                                    <Check className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRechazarAgente(a.id)}
                                                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                                                    title="Rechazar"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-xl p-6 border border-white/10">
                            <div className="text-gray-400 text-sm mb-2">Total Usuarios</div>
                            <div className="text-3xl text-white">{usuarios.length}</div>
                            <div className="text-sm text-gray-500 mt-2">{devsPendientes} desarrolladores pendientes</div>
                        </div>
                        <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-xl p-6 border border-white/10">
                            <div className="text-gray-400 text-sm mb-2">Total Agentes</div>
                            <div className="text-3xl text-white">{agentes.length}</div>
                            <div className="text-sm text-gray-500 mt-2">{agentesPendientes} en revisión</div>
                        </div>
                        <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-xl p-6 border border-white/10">
                            <div className="text-gray-400 text-sm mb-2">Desarrolladores</div>
                            <div className="text-3xl text-white">{desarrolladores.length}</div>
                            <div className="text-sm text-gray-500 mt-2">
                                {desarrolladores.filter((d) => d.estado === "APROBADO").length} aprobados
                            </div>
                        </div>
>>>>>>> feature/mejoras-admin
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
            </div>
        </div>
    );
}
