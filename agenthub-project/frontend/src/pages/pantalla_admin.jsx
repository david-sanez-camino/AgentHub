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
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Search, Filter } from "lucide-react";
import logo from "../assets/logo.png";
import { getToken } from "../services/auth";
import {
    obtenerAgentes,
    aprobarAgente,
    rechazarAgente,
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
                    </div>
                </div>
            </div>
        </div>
    );
}
