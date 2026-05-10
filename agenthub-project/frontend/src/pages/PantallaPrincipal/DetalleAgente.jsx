import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import { obtenerAgentePorId } from "../../services/conexion_api";
import { isLoggedIn } from "../../services/auth";

const CATEGORIA_LABELS = {
    productividad: "Productividad",
    marketing: "Marketing",
    datos: "Análisis de Datos",
    atencion: "Atención al Cliente",
    desarrollo: "Desarrollo de Software",
    otro: "Otro",
};

const MODELO_LABELS = {
    "openai/gpt-oss-20b:free": "GPT OSS 20B",
    "anthropic/claude-3-haiku": "Claude 3 Haiku",
};

export default function DetalleAgente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [agente, setAgente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerAgentePorId(id)
            .then(data => { setAgente(data); setLoading(false); })
            .catch(err => { setError(err.message || "No se pudo cargar el agente"); setLoading(false); });
    }, [id]);

    const handleComprar = () => {
        if (!isLoggedIn()) {
            navigate("/login");
        } else {
            navigate(`/cliente/pagar/${id}`);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen flex flex-col font-[Inter]">
                <TopNavbar />
                <main className="flex-1 flex items-center justify-center text-slate-500">
                    <i className="fa-solid fa-spinner fa-spin text-3xl text-purple-500 mr-3"></i>
                    Cargando agente...
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !agente) {
        return (
            <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen flex flex-col font-[Inter]">
                <TopNavbar />
                <main className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
                    <i className="fa-solid fa-circle-exclamation text-4xl text-red-400"></i>
                    <p>{error || "Agente no encontrado"}</p>
                    <button onClick={() => navigate("/marketplace")}
                        className="text-[#136dec] font-bold hover:underline">
                        ← Volver al marketplace
                    </button>
                </main>
                <Footer />
            </div>
        );
    }

    const categoriaLabel = CATEGORIA_LABELS[agente.categoria] || agente.categoria;
    const modeloLabel = MODELO_LABELS[agente.modelo] || agente.modelo;

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <TopNavbar />

            <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
                {/* Breadcrumb */}
                <button
                    onClick={() => navigate("/marketplace")}
                    className="mb-8 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
                >
                    <i className="fa-solid fa-arrow-left"></i> Volver al marketplace
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Columna izquierda — detalles */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Cabecera */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#136dec] bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                    {categoriaLabel}
                                </span>
                            </div>

                            <div className="flex items-start gap-5 mb-4">
                                <div className="size-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl shadow-lg shadow-purple-500/30 flex-shrink-0">
                                    <i className="fa-solid fa-robot"></i>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-1">
                                        {agente.nombre}
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Agente de inteligencia artificial · {categoriaLabel}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-align-left text-slate-400"></i> Descripción
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {agente.descripcion || "Sin descripción disponible."}
                            </p>
                        </div>

                        {/* Características técnicas */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-microchip text-slate-400"></i> Detalles técnicos
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <i className="fa-solid fa-brain"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Modelo base</p>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{modeloLabel}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <i className="fa-solid fa-tag"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Categoría</p>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{categoriaLabel}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <i className="fa-solid fa-shield-halved"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Verificación</p>
                                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Agente verificado</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                        <i className="fa-solid fa-bolt"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Acceso</p>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">Inmediato tras compra</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Qué incluye */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-slate-400"></i> ¿Qué incluye?
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    "Acceso al agente de IA en el marketplace",
                                    "Chat ilimitado con el agente",
                                    "Configuración optimizada para tu caso de uso",
                                    "Modelo de lenguaje avanzado: " + modeloLabel,
                                    "Soporte de herramientas especializadas",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <i className="fa-solid fa-check text-emerald-500 mt-0.5 flex-shrink-0"></i>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Columna derecha — tarjeta de compra (sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-5">
                            <div>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">
                                    {agente.precio ? `$${agente.precio}` : "Gratis"}
                                    {agente.precio ? <span className="text-base font-normal text-slate-500 ml-1">USD</span> : null}
                                </p>
                                {agente.precio > 0 && (
                                    <p className="text-sm text-slate-500 mt-1">Pago único · acceso permanente</p>
                                )}
                            </div>

                            <button
                                onClick={handleComprar}
                                className="w-full py-4 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#136dec]/30 text-base flex items-center justify-center gap-2"
                            >
                                <i className="fa-solid fa-cart-shopping"></i>
                                {isLoggedIn()
                                    ? (agente.precio ? `Comprar — $${agente.precio} USD` : "Obtener gratis")
                                    : "Inicia sesión para comprar"
                                }
                            </button>

                            {!isLoggedIn() && (
                                <p className="text-xs text-center text-slate-400">
                                    ¿No tienes cuenta?{" "}
                                    <button onClick={() => navigate("/crear_usuario")} className="text-[#136dec] font-semibold hover:underline">
                                        Regístrate gratis
                                    </button>
                                </p>
                            )}

                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <i className="fa-solid fa-lock text-xs w-4 text-center"></i>
                                    Pago seguro con Stripe
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <i className="fa-solid fa-robot text-xs w-4 text-center"></i>
                                    Acceso inmediato al agente
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <i className="fa-solid fa-shield-halved text-xs w-4 text-center"></i>
                                    Agente verificado por AgentHub
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
