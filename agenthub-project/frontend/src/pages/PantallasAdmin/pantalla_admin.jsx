import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Search, Send, Bot } from "lucide-react";
import logo from "../../assets/logo.png";
import { getToken, logout } from "../../services/auth";
import ModalConfirmLogout from "../../components/ModalConfirmLogout";
import {
    obtenerAgentes,
    aprobarAgente,
    rechazarAgente,
    obtenerUsuarios,
    obtenerDesarrolladores,
    aprobarDesarrollador,
    rechazarDesarrollador,
    enviarMensajeChat,
} from "../../services/conexion_api";

// Normaliza estado a mayúsculas para comparar independientemente de cómo lo devuelva el backend
function normalizar(estado) {
    return (estado || "").toUpperCase();
}

function estadoBadge(estado) {
    const n = normalizar(estado);
    if (n === "APROBADO" || n === "ACTIVO" || n === "PUBLICADO") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (n === "PENDIENTE" || n === "EN REVISIÓN") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (n === "RECHAZADO") return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

const FILTROS = ["TODOS", "PENDIENTE", "APROBADO", "RECHAZADO"];

export default function AdminScreen() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("usuarios");
    const [searchQuery, setSearchQuery] = useState("");
    const [filtroAgente, setFiltroAgente] = useState("TODOS");
    const [filtroUsuario, setFiltroUsuario] = useState("TODOS");
    const [usuarios, setUsuarios] = useState([]);
    const [desarrolladores, setDesarrolladores] = useState([]);
    const [agentes, setAgentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [agenteSeleccionado, setAgenteSeleccionado] = useState(null);
    const [chatMensajes, setChatMensajes] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [chatEscribiendo, setChatEscribiendo] = useState(false);
    const [chatConversacionId, setChatConversacionId] = useState(null);
    const chatFinalRef = useRef(null);

    useEffect(() => { cargarDatos(); }, []);

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
        } catch {
            setError("Error al cargar los datos. Verifica tu sesión.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        chatFinalRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMensajes]);

    function abrirDetalleAgente(agente) {
        setAgenteSeleccionado(agente);
        setChatMensajes([{ rol: "agente", texto: `¡Hola! Soy ${agente.nombre}. ¿En qué puedo ayudarte hoy?` }]);
        setChatInput("");
        setChatConversacionId(null);
        setChatEscribiendo(false);
    }

    function cerrarDetalleAgente() {
        setAgenteSeleccionado(null);
        setChatMensajes([]);
        setChatInput("");
        setChatConversacionId(null);
    }

    async function handleChatEnvio(e) {
        e.preventDefault();
        if (!chatInput.trim() || !agenteSeleccionado) return;
        const texto = chatInput;
        setChatMensajes((prev) => [...prev, { rol: "usuario", texto }]);
        setChatInput("");
        setChatEscribiendo(true);
        try {
            const token = getToken();
            const resp = await enviarMensajeChat(agenteSeleccionado.id, texto, token, chatConversacionId);
            setChatConversacionId(resp.conversacionId);
            setChatMensajes((prev) => [...prev, { rol: "agente", texto: resp.respuesta }]);
        } catch {
            setChatMensajes((prev) => [...prev, { rol: "agente", texto: "Error al conectar con el agente. Inténtalo de nuevo." }]);
        } finally {
            setChatEscribiendo(false);
        }
    }

    const devPorEmail = Object.fromEntries(desarrolladores.map((d) => [d.email, d]));

    async function handleAprobarAgente(id) {
        const token = getToken();
        try {
            await aprobarAgente(id, token);
            setAgentes((prev) => prev.map((a) => a.id === id ? { ...a, estadoVerificacion: "APROBADO" } : a));
        } catch { alert("Error al aprobar el agente."); }
    }

    async function handleRechazarAgente(id) {
        const token = getToken();
        try {
            await rechazarAgente(id, token);
            setAgentes((prev) => prev.map((a) => a.id === id ? { ...a, estadoVerificacion: "RECHAZADO" } : a));
        } catch { alert("Error al rechazar el agente."); }
    }

    async function handleAprobarDesarrollador(devId) {
        const token = getToken();
        try {
            await aprobarDesarrollador(devId, token);
            setDesarrolladores((prev) => prev.map((d) => d.id === devId ? { ...d, estado: "APROBADO" } : d));
        } catch { alert("Error al aprobar el desarrollador."); }
    }

    async function handleRechazarDesarrollador(devId) {
        const token = getToken();
        try {
            await rechazarDesarrollador(devId, token);
            setDesarrolladores((prev) => prev.map((d) => d.id === devId ? { ...d, estado: "RECHAZADO" } : d));
        } catch { alert("Error al rechazar el desarrollador."); }
    }

    // Filtra agentes por búsqueda y por estado
    const filteredAgentes = agentes.filter((a) => {
        const matchBusqueda =
            a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.categoria || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchFiltro = filtroAgente === "TODOS" || normalizar(a.estadoVerificacion) === filtroAgente;
        return matchBusqueda && matchFiltro;
    });

    // Filtra usuarios por búsqueda y por estado del desarrollador (o "Activo" si es cliente)
    const filteredUsuarios = usuarios.filter((u) => {
        const nombreCompleto = `${u.nombre || ""} ${u.apellido || ""}`.toLowerCase();
        const correo = (u.email || "").toLowerCase();
        const matchBusqueda = nombreCompleto.includes(searchQuery.toLowerCase()) || correo.includes(searchQuery.toLowerCase());
        const dev = devPorEmail[u.email];
        const estadoUsuario = dev ? normalizar(dev.estado) : "ACTIVO";
        const matchFiltro = filtroUsuario === "TODOS" || estadoUsuario === filtroUsuario;
        return matchBusqueda && matchFiltro;
    });

    const devsPendientes = desarrolladores.filter((d) => normalizar(d.estado) === "PENDIENTE").length;
    const agentesPendientes = agentes.filter((a) => normalizar(a.estadoVerificacion) === "PENDIENTE").length;
    const totalClientes = usuarios.filter((u) => u.rol === "CLIENTE").length;

    // Botones de acción según el estado actual del agente
    function accionesAgente(agente) {
        const estado = normalizar(agente.estadoVerificacion);
        return (
            <div className="flex gap-2">
                {/* Aprobar: visible si no está ya APROBADO */}
                {estado !== "APROBADO" && (
                    <button
                        onClick={() => handleAprobarAgente(agente.id)}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        title="Aprobar"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                )}
                {/* Rechazar: visible si no está ya RECHAZADO */}
                {estado !== "RECHAZADO" && (
                    <button
                        onClick={() => handleRechazarAgente(agente.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Rechazar"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        );
    }

    // Botones de acción según el estado actual del desarrollador
    function accionesDesarrollador(dev, devId) {
        if (!devId) return null;
        const estado = normalizar(dev?.estado);
        return (
            <div className="flex gap-2">
                {estado !== "APROBADO" && (
                    <button
                        onClick={() => handleAprobarDesarrollador(devId)}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                        title="Aprobar desarrollador"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                )}
                {estado !== "RECHAZADO" && (
                    <button
                        onClick={() => handleRechazarDesarrollador(devId)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Rechazar desarrollador"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        );
    }

    const filtroActual = activeTab === "agentes" ? filtroAgente : filtroUsuario;
    const setFiltroActual = activeTab === "agentes" ? setFiltroAgente : setFiltroUsuario;

    return (
        <>
        {showLogoutModal && (
            <ModalConfirmLogout
                onConfirm={() => { logout(); navigate("/"); }}
                onCancel={() => setShowLogoutModal(false)}
            />
        )}

        {/* Modal detalle + chat del agente */}
        {agenteSeleccionado && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="bg-[#1a1f2e] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                    {/* Header del modal */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-lg leading-tight">{agenteSeleccionado.nombre}</h2>
                                <p className="text-gray-400 text-sm capitalize">{agenteSeleccionado.categoria || "Sin categoría"}</p>
                            </div>
                            <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-xs border ${estadoBadge(agenteSeleccionado.estadoVerificacion)}`}>
                                {agenteSeleccionado.estadoVerificacion}
                            </span>
                        </div>
                        <button
                            onClick={cerrarDetalleAgente}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Cuerpo: info izquierda + chat derecha */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Panel izquierdo: características del agente */}
                        <div className="w-2/5 border-r border-white/10 p-6 overflow-y-auto flex flex-col gap-5 shrink-0">
                            <div>
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Descripción</p>
                                <p className="text-gray-200 text-sm leading-relaxed">
                                    {agenteSeleccionado.descripcion || "Sin descripción proporcionada."}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                    <p className="text-gray-400 text-xs mb-1">Modelo</p>
                                    <p className="text-white text-sm">{agenteSeleccionado.modelo || "-"}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                    <p className="text-gray-400 text-xs mb-1">Precio</p>
                                    <p className="text-white text-sm">{agenteSeleccionado.precio != null ? `${agenteSeleccionado.precio} €` : "-"}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                    <p className="text-gray-400 text-xs mb-1">Categoría</p>
                                    <p className="text-blue-400 text-sm capitalize">{agenteSeleccionado.categoria || "-"}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                    <p className="text-gray-400 text-xs mb-1">ID</p>
                                    <p className="text-gray-300 text-xs font-mono">{agenteSeleccionado.id}</p>
                                </div>
                            </div>

                            {/* Botones aprobar / rechazar */}
                            <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
                                {normalizar(agenteSeleccionado.estadoVerificacion) !== "APROBADO" && (
                                    <button
                                        onClick={async () => {
                                            await handleAprobarAgente(agenteSeleccionado.id);
                                            setAgenteSeleccionado((prev) => ({ ...prev, estadoVerificacion: "APROBADO" }));
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                                    >
                                        <Check className="w-4 h-4" /> Aprobar
                                    </button>
                                )}
                                {normalizar(agenteSeleccionado.estadoVerificacion) !== "RECHAZADO" && (
                                    <button
                                        onClick={async () => {
                                            await handleRechazarAgente(agenteSeleccionado.id);
                                            setAgenteSeleccionado((prev) => ({ ...prev, estadoVerificacion: "RECHAZADO" }));
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                                    >
                                        <X className="w-4 h-4" /> Rechazar
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Panel derecho: chat para probar el agente */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            <div className="px-4 py-3 border-b border-white/5 shrink-0">
                                <p className="text-gray-400 text-sm">Probar agente</p>
                            </div>
                            {/* Historial de mensajes */}
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                                {chatMensajes.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.rol === "usuario" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                                            msg.rol === "usuario"
                                                ? "bg-purple-600 text-white rounded-tr-sm"
                                                : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm"
                                        }`}>
                                            <p className="whitespace-pre-wrap">{msg.texto}</p>
                                        </div>
                                    </div>
                                ))}
                                {chatEscribiendo && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center h-11">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={chatFinalRef} />
                            </div>
                            {/* Input de chat */}
                            <div className="p-4 border-t border-white/10 shrink-0">
                                <form onSubmit={handleChatEnvio} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Escribe un mensaje para probar el agente..."
                                        className="flex-1 h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                        disabled={chatEscribiendo}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!chatInput.trim() || chatEscribiendo}
                                        className="h-11 w-11 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
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
                        onClick={() => setShowLogoutModal(true)}
                        className="px-4 py-2 border border-red-500/30 text-white rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors font-medium"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <div className="pt-24 px-8 pb-12">
                <div className="max-w-[1440px] mx-auto">
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
                    <div className="flex gap-4 mb-6 border-b border-white/10">
                        {["usuarios", "agentes"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setSearchQuery(""); }}
                                className={`px-6 py-3 text-lg transition-colors relative capitalize ${activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
                            </button>
                        ))}
                    </div>

                    {/* Buscador + Filtros de estado */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={activeTab === "usuarios" ? "Buscar usuarios..." : "Buscar agentes..."}
                                className="w-full pl-11 pr-4 py-3 bg-[#1f2937] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        {/* Píldoras de filtro por estado */}
                        <div className="flex gap-2 flex-wrap">
                            {FILTROS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFiltroActual(f)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                        filtroActual === f
                                            ? "bg-blue-500 border-blue-500 text-white"
                                            : "bg-transparent border-white/20 text-gray-400 hover:border-white/40 hover:text-white"
                                    }`}
                                >
                                    {f === "TODOS" ? "Todos" : f.charAt(0) + f.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
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
                                            const estado = dev ? dev.estado : "ACTIVO";
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
                                                        {u.rol === "DESARROLLADOR" && accionesDesarrollador(dev, dev?.id)}
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
                                        ) : filteredAgentes.map((a) => (
                                            <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => abrirDetalleAgente(a)}
                                                        className="text-white hover:text-blue-400 transition-colors text-left underline-offset-2 hover:underline"
                                                    >
                                                        {a.nombre}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-blue-400">{a.categoria || "-"}</td>
                                                <td className="px-6 py-4 text-gray-400">{a.modelo || "-"}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${estadoBadge(a.estadoVerificacion)}`}>
                                                        {a.estadoVerificacion}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-400">
                                                    {a.precio != null ? `${a.precio} €` : "-"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {accionesAgente(a)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                        <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-xl p-6 border border-white/10">
                            <div className="text-gray-400 text-sm mb-2">Total Usuarios</div>
                            <div className="text-3xl text-white">{usuarios.length}</div>
                            <div className="text-sm text-gray-500 mt-2">{devsPendientes} desarrolladores pendientes</div>
                        </div>
                        <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-xl p-6 border border-white/10">
                            <div className="text-gray-400 text-sm mb-2">Total Clientes</div>
                            <div className="text-3xl text-white">{totalClientes}</div>
                            <div className="text-sm text-gray-500 mt-2">Registrados como cliente</div>
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
                                {desarrolladores.filter((d) => normalizar(d.estado) === "APROBADO").length} aprobados
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
