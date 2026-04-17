import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const articulos = [
    {
        categoria: "Guía",
        categoriaColor: "text-blue-400 bg-blue-400/10",
        titulo: "Cómo construir tu primer agente de IA y publicarlo en AgentHub",
        resumen:
            "Paso a paso desde cero: elige el modelo, define el sistema prompt, prueba con casos reales y publica tu agente para que miles de empresas lo encuentren.",
        fecha: "12 Apr 2026",
        minLectura: "8 min",
        icono: "fa-solid fa-rocket",
    },
    {
        categoria: "Caso de uso",
        categoriaColor: "text-emerald-400 bg-emerald-400/10",
        titulo: "Cómo una PYME de logística redujo un 60 % el tiempo de gestión de pedidos con un agente especializado",
        resumen:
            "TransLogic SL implementó un agente de seguimiento y notificación de pedidos encontrado en AgentHub. En 3 semanas, automatizaron lo que antes ocupaba 4 horas al día.",
        fecha: "8 Apr 2026",
        minLectura: "5 min",
        icono: "fa-solid fa-truck",
    },
    {
        categoria: "Producto",
        categoriaColor: "text-violet-400 bg-violet-400/10",
        titulo: "Novedades de AgentHub: búsqueda semántica en el marketplace y demo instantánea",
        resumen:
            "Ya puedes encontrar agentes describiendo tu problema en lenguaje natural. Además, todos los agentes con demo activa se pueden probar sin registro previo.",
        fecha: "3 Apr 2026",
        minLectura: "3 min",
        icono: "fa-solid fa-newspaper",
    },
    {
        categoria: "Desarrolladores",
        categoriaColor: "text-orange-400 bg-orange-400/10",
        titulo: "Estrategias de pricing para agentes IA: cómo fijar el precio correcto y no dejar dinero encima de la mesa",
        resumen:
            "Analizamos los 50 agentes más vendidos del marketplace y extraemos patrones claros sobre qué precios convierten mejor según el tipo de tarea y modelo utilizado.",
        fecha: "28 Mar 2026",
        minLectura: "10 min",
        icono: "fa-solid fa-coins",
    },
    {
        categoria: "IA & Sector",
        categoriaColor: "text-cyan-400 bg-cyan-400/10",
        titulo: "El auge de los agentes verticales: por qué los agentes especializados superan a los generalistas",
        resumen:
            "Los LLMs de propósito general son potentes, pero un agente entrenado específicamente para revisión de contratos de arrendamiento rinde 3× mejor que ChatGPT en esa tarea concreta.",
        fecha: "21 Mar 2026",
        minLectura: "7 min",
        icono: "fa-solid fa-chart-bar",
    },
    {
        categoria: "Tutorial",
        categoriaColor: "text-yellow-400 bg-yellow-400/10",
        titulo: "Conecta tu agente a Google Sheets, Notion y Slack con las integraciones de AgentHub",
        resumen:
            "Tutorial práctico para que tu agente pueda leer datos de hojas de cálculo, escribir en bases de datos de Notion y enviar notificaciones a Slack sin una sola línea de código extra.",
        fecha: "14 Mar 2026",
        minLectura: "12 min",
        icono: "fa-solid fa-plug",
    },
];

const categorias = ["Todos", "Guía", "Caso de uso", "Producto", "Desarrolladores", "IA & Sector", "Tutorial"];

export default function Blog() {
    const [catActiva, setCatActiva] = useState("Todos");

    const filtrados = catActiva === "Todos"
        ? articulos
        : articulos.filter(a => a.categoria === catActiva);

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Ideas, casos y guías sobre{" "}
                        <span className="text-[#136dec]">agentes de IA</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Todo lo que necesitas saber para construir, vender y aprovechar
                        agentes inteligentes en entornos reales.
                    </p>
                </div>
            </section>

            {/* Filtros */}
            <section className="pb-8 px-6">
                <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCatActiva(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${catActiva === cat
                                ? "bg-[#136dec] text-white shadow-lg shadow-[#136dec]/30"
                                : "bg-[#101822] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Artículos */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtrados.map((art, i) => (
                        <article
                            key={i}
                            className="bg-[#101822] border border-slate-800 rounded-2xl p-7 flex flex-col gap-4 hover:border-[#136dec]/40 hover:shadow-lg hover:shadow-[#136dec]/10 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${art.categoriaColor}`}>
                                    {art.categoria}
                                </span>
                                <div className="size-9 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-[#136dec]/20 transition-colors">
                                    <i className={`${art.icono} text-slate-400 group-hover:text-[#136dec] text-sm transition-colors`}></i>
                                </div>
                            </div>
                            <h2 className="font-semibold text-white text-sm leading-snug group-hover:text-[#136dec] transition-colors">
                                {art.titulo}
                            </h2>
                            <p className="text-xs text-slate-400 leading-relaxed flex-1">{art.resumen}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                                <span className="text-xs text-slate-500">{art.fecha}</span>
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <i className="fa-regular fa-clock"></i>
                                    {art.minLectura}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
                {filtrados.length === 0 && (
                    <p className="text-center text-slate-500 mt-12">No hay artículos en esta categoría todavía.</p>
                )}
            </section>

            {/* Newsletter */}
            <section className="pb-24 px-6">
                <div className="max-w-2xl mx-auto text-center bg-[#101822] border border-slate-800 rounded-2xl p-10">
                    <i className="fa-solid fa-envelope-open-text text-[#136dec] text-3xl mb-4"></i>
                    <h2 className="text-xl font-bold text-white mb-3">
                        Recibe los mejores artículos cada semana
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Casos de uso reales, novedades de AgentHub y guías prácticas.
                        Sin spam, te lo prometemos.
                    </p>
                    <div className="flex gap-3 max-w-sm mx-auto">
                        <input
                            type="email"
                            placeholder="tu@empresa.com"
                            className="flex-1 bg-[#0b1119] border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#136dec]"
                        />
                        <button className="px-5 py-2.5 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all active:scale-95 shrink-0">
                            Suscribirme
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
