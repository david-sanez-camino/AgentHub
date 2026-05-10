import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ClienteNavbar from "../../components/ClienteNavbar";
import Footer from "../../components/Footer";
import { enviarMensajeChat, obtenerAgentePorId } from "../../services/conexion_api";
import { getToken } from "../../services/auth";

const API = "https://agenthub-production-e274.up.railway.app";

const CATEGORIA_LABELS = {
    productividad: "Productividad",
    marketing: "Marketing",
    datos: "Análisis de Datos",
    atencion: "Atención al Cliente",
    desarrollo: "Desarrollo de Software",
    legal: "Legal",
    otro: "Otro",
};

const MODELO_LABELS = {
    "openai/gpt-oss-20b:free": "GPT OSS 20B",
    "anthropic/claude-3-haiku": "Claude 3 Haiku",
};

export default function ClientePantallaChat() {
    const { idAgente } = useParams();
    const navigate = useNavigate();

    const [mensajes, setMensajes] = useState([
        {
            rol: "agente",
            texto: "¡Hola! Soy tu agente de Inteligencia Artificial. ¿En qué te puedo ayudar hoy?",
        },
    ]);
    const [inputTexto, setInputTexto] = useState("");
    const [escribiendo, setEscribiendo] = useState(false);
    const [infoAgente, setInfoAgente] = useState(null);
    const [conversacionId, setConversacionId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const finalDelChatRef = useRef(null);

    useEffect(() => {
        finalDelChatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);

    useEffect(() => {
        obtenerAgentePorId(idAgente)
            .then(setInfoAgente)
            .catch(() => console.error("No se pudo cargar la info del agente"));
    }, [idAgente]);

    useEffect(() => {
        const cargarConversacion = async () => {
            try {
                const token = getToken();
                if (!token) return;

                const conversaciones = await fetch(
                    `${API}/api/chat/conversaciones/${idAgente}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                ).then(r => r.json());

                if (conversaciones && conversaciones.length > 0) {
                    const ultima = conversaciones[conversaciones.length - 1];
                    setConversacionId(ultima.id);

                    const mensajesHistorial = await fetch(
                        `${API}/api/chat/conversacion/${ultima.id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    ).then(r => r.json());

                    if (mensajesHistorial && mensajesHistorial.length > 0) {
                        setMensajes(mensajesHistorial.map(m => ({
                            rol: m.rol === "user" ? "usuario" : "agente",
                            texto: m.contenido,
                        })));
                    }
                }
            } catch (error) {
                console.error("Error cargando historial:", error);
            }
        };
        cargarConversacion();
    }, [idAgente]);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!inputTexto.trim()) return;

        const mensajeUsuario = inputTexto;
        setMensajes(prev => [...prev, { rol: "usuario", texto: mensajeUsuario }]);
        setInputTexto("");
        setEscribiendo(true);

        try {
            const token = getToken();
            const respuestaIA = await enviarMensajeChat(idAgente, mensajeUsuario, token, conversacionId);
            setConversacionId(respuestaIA.conversacionId);
            setMensajes(prev => [...prev, { rol: "agente", texto: respuestaIA.respuesta }]);
        } catch (error) {
            setMensajes(prev => [...prev, {
                rol: "agente",
                texto: "Lo siento, ha habido un error de conexión. Inténtalo de nuevo.",
            }]);
        } finally {
            setEscribiendo(false);
        }
    };

    const eliminarConversacion = async () => {
        if (!conversacionId) return;
        if (!window.confirm("¿Seguro que quieres borrar esta conversación?")) return;

        try {
            const token = getToken();
            await fetch(`${API}/api/chat/conversacion/${conversacionId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setConversacionId(null);
            setMensajes([{
                rol: "agente",
                texto: "¡Hola! Soy tu agente de Inteligencia Artificial. ¿En qué te puedo ayudar hoy?",
            }]);
        } catch (error) {
            console.error("Error eliminando conversación:", error);
        }
    };

    const categoriaLabel = infoAgente ? (CATEGORIA_LABELS[infoAgente.categoria?.toLowerCase()] || infoAgente.categoria) : "";
    const modeloLabel = infoAgente ? (MODELO_LABELS[infoAgente.modelo] || infoAgente.modelo) : "";

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 flex gap-0 max-w-7xl mx-auto w-full px-4 py-6">

                {/* ── Sidebar izquierdo ── */}
                <div className={`transition-all duration-300 ${sidebarOpen ? "w-80 mr-5" : "w-0 overflow-hidden mr-0"} flex-shrink-0`}>
                    <div className="w-80 space-y-4">

                        {/* Cabecera agente */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-purple-500/30 flex-shrink-0">
                                    <i className="fa-solid fa-robot"></i>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                                        {infoAgente ? infoAgente.nombre : "Cargando..."}
                                    </h2>
                                    <span className="text-xs font-semibold text-[#136dec] bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">
                                        {categoriaLabel}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Agente activo y listo
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <i className="fa-solid fa-circle-info text-[#136dec]"></i>
                                Sobre este agente
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                {infoAgente?.descripcion || "Sin descripción disponible."}
                            </p>
                        </div>

                        {/* Capacidades */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-bolt text-amber-500"></i>
                                Capacidades
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    { icon: "fa-comments", text: "Chat a tu disposición" },
                                    { icon: "fa-brain", text: modeloLabel || "Modelo avanzado" },
                                    { icon: "fa-magnifying-glass", text: "Búsqueda en tiempo real" },
                                    { icon: "fa-shield-halved", text: "Agente verificado" },
                                    { icon: "fa-clock-rotate-left", text: "Historial de conversación" },
                                ].map((cap, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <span className="size-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#136dec] flex-shrink-0">
                                            <i className={`fa-solid ${cap.icon} text-xs`}></i>
                                        </span>
                                        {cap.text}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Detalles técnicos */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-microchip text-slate-400"></i>
                                Detalles técnicos
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Modelo</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">{modeloLabel || "—"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Categoría</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">{categoriaLabel || "—"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Verificación</span>
                                    <span className="font-semibold text-emerald-600">Aprobado</span>
                                </div>
                            </div>
                        </div>

                        {/* Acciones */}
                        <button
                            onClick={() => navigate("/cliente/mis-agentes")}
                            className="w-full py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-arrow-left text-xs"></i>
                            Volver a Mis Agentes
                        </button>
                    </div>
                </div>

                {/* ── Chat ── */}
                <div className="flex-1 flex flex-col min-h-[calc(100vh-12rem)]">

                    {/* Cabecera del chat */}
                    <div className="bg-white dark:bg-[#1a2230] p-4 rounded-t-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm">
                        {/* Toggle sidebar */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="size-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title={sidebarOpen ? "Ocultar info" : "Mostrar info"}
                        >
                            <i className={`fa-solid ${sidebarOpen ? "fa-sidebar" : "fa-sidebar-flip"} text-slate-500 text-sm`}></i>
                        </button>

                        <div className="size-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-inner flex-shrink-0">
                            <i className="fa-solid fa-robot text-sm"></i>
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-base leading-tight">
                                {infoAgente ? infoAgente.nombre : "Cargando..."}
                            </h2>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                En línea
                            </p>
                        </div>

                        {conversacionId && (
                            <button
                                onClick={eliminarConversacion}
                                className="size-9 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                title="Borrar conversación"
                            >
                                <i className="fa-solid fa-trash text-red-500 text-sm"></i>
                            </button>
                        )}
                    </div>

                    {/* Mensajes */}
                    <div className="flex-1 bg-slate-50 dark:bg-[#151c26] border-x border-slate-200 dark:border-slate-800 p-4 md:p-6 overflow-y-auto flex flex-col gap-5">
                        {mensajes.map((msg, index) => (
                            <div key={index} className={`flex ${msg.rol === "usuario" ? "justify-end" : "justify-start"}`}>
                                {msg.rol === "agente" && (
                                    <div className="size-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs mr-2 mt-1 flex-shrink-0">
                                        <i className="fa-solid fa-robot"></i>
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed whitespace-pre-wrap ${
                                    msg.rol === "usuario"
                                        ? "bg-[#136dec] text-white rounded-tr-sm"
                                        : "bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-700 dark:text-slate-200"
                                }`}>
                                    {msg.texto}
                                </div>
                            </div>
                        ))}

                        {escribiendo && (
                            <div className="flex justify-start items-end gap-2">
                                <div className="size-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                                    <i className="fa-solid fa-robot"></i>
                                </div>
                                <div className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-12">
                                    <div className="size-2 bg-slate-400 rounded-full animate-bounce"></div>
                                    <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={finalDelChatRef} />
                    </div>

                    {/* Input */}
                    <div className="bg-white dark:bg-[#1a2230] p-4 rounded-b-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <form onSubmit={manejarEnvio} className="flex gap-3">
                            <input
                                type="text"
                                value={inputTexto}
                                onChange={e => setInputTexto(e.target.value)}
                                placeholder={`Pregúntale algo a ${infoAgente?.nombre || "tu agente"}...`}
                                className="flex-1 h-12 px-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1118] focus:ring-2 focus:ring-[#136dec]/30 outline-none transition-all text-sm"
                                disabled={escribiendo}
                            />
                            <button
                                type="submit"
                                disabled={!inputTexto.trim() || escribiendo}
                                className="h-12 w-12 flex items-center justify-center bg-[#136dec] hover:bg-blue-600 text-white rounded-xl shadow-lg shadow-[#136dec]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <i className="fa-solid fa-paper-plane text-sm"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}