import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const valores = [
    { icono: "fa-solid fa-bolt", titulo: "Velocidad con criterio", texto: "Lanzamos rápido, pero pensamos bien. Preferimos una decisión tomada hoy sobre diez reuniones de consenso mañana." },
    { icono: "fa-solid fa-globe", titulo: "Trabajo remoto real", texto: "No tenemos oficina fija. El equipo está distribuido por Europa. Trabajas donde eres más productivo, con total autonomía." },
    { icono: "fa-solid fa-magnifying-glass", titulo: "Curiosidad técnica", texto: "Estamos construyendo infraestructura para la economía de los agentes IA. Si te fascina lo que está pasando en IA, encajarás aquí." },
    { icono: "fa-solid fa-handshake", titulo: "Impacto directo", texto: "El equipo es pequeño. Lo que construyas lo usan miles de empresas y desarrolladores desde el primer día." },
];

const ofertas = [
    {
        area: "Ingeniería",
        color: "text-blue-400 bg-blue-400/10",
        puesto: "Backend Engineer (Node.js / Python)",
        tipo: "Full-time · Remoto",
        descripcion: "Construyes la API core de AgentHub: ejecución de agentes, sistema de tokens, webhooks e integraciones. Experiencia con servicios en la nube y LLMs muy valorada.",
    },
    {
        area: "Ingeniería",
        color: "text-blue-400 bg-blue-400/10",
        puesto: "Frontend Engineer (React)",
        tipo: "Full-time · Remoto",
        descripcion: "Responsable del marketplace, el panel de desarrollador y el chat de agentes. Obsesionado con la UX y la velocidad de carga.",
    },
    {
        area: "Producto",
        color: "text-violet-400 bg-violet-400/10",
        puesto: "Product Manager — Marketplace",
        tipo: "Full-time · Remoto",
        descripcion: "Define la experiencia de compra y venta de agentes. Hablas con desarrolladores y clientes cada semana para priorizar lo que más impacto tiene.",
    },
    {
        area: "Crecimiento",
        color: "text-emerald-400 bg-emerald-400/10",
        puesto: "Developer Relations",
        tipo: "Full-time · Remoto",
        descripcion: "La comunidad de desarrolladores de AgentHub crece gracias a ti. Workshops, contenido técnico, Discord y partnerships con la comunidad IA.",
    },
    {
        area: "IA",
        color: "text-orange-400 bg-orange-400/10",
        puesto: "AI Agent Specialist",
        tipo: "Full-time · Remoto",
        descripcion: "Ayudas a los desarrolladores a mejorar sus agentes, defines los criterios de calidad del marketplace y construyes agentes propios de AgentHub.",
    },
];

export default function Empleo() {
    const [abierto, setAbierto] = useState(null);

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Empleo
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Construye la infraestructura de{" "}
                        <span className="text-[#136dec]">la economía de agentes IA</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Somos un equipo pequeño con una misión grande: hacer que la IA especializada
                        sea accesible para cualquier empresa. Si quieres estar en el centro de eso, aquí está tu sitio.
                    </p>
                </div>
            </section>

            {/* Valores */}
            <section className="pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-10 text-center">Cómo trabajamos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {valores.map((v, i) => (
                            <div key={i} className="flex items-start gap-4 bg-[#101822] border border-slate-800 rounded-2xl p-6">
                                <div className="size-11 rounded-xl bg-[#136dec]/10 flex items-center justify-center shrink-0">
                                    <i className={`${v.icono} text-[#136dec]`}></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{v.titulo}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{v.texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ofertas */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-3 text-center">Posiciones abiertas</h2>
                    <p className="text-slate-400 text-center mb-10 text-sm">
                        Todas las posiciones son remotas y a tiempo completo.
                    </p>
                    <div className="space-y-3">
                        {ofertas.map((oferta, i) => (
                            <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#136dec]/30 transition-colors">
                                <button
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                    onClick={() => setAbierto(abierto === i ? null : i)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${oferta.color}`}>{oferta.area}</span>
                                        <span className="font-medium text-white text-sm">{oferta.puesto}</span>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="text-xs text-slate-500 hidden sm:block">{oferta.tipo}</span>
                                        <i className={`fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-300 ${abierto === i ? "rotate-180" : ""}`}></i>
                                    </div>
                                </button>
                                {abierto === i && (
                                    <div className="px-6 pb-6 border-t border-slate-800 pt-4 space-y-4">
                                        <p className="text-sm text-slate-400 leading-relaxed">{oferta.descripcion}</p>
                                        <a
                                            href={`mailto:jobs@agenthub.io?subject=Aplicación: ${oferta.puesto}`}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all active:scale-95"
                                        >
                                            <i className="fa-solid fa-envelope text-xs"></i>
                                            Aplicar a esta posición
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-8">
                        ¿No encaja ninguna posición pero crees que aportas algo especial?{" "}
                        <a href="mailto:jobs@agenthub.io" className="text-[#136dec] hover:underline">
                            Escríbenos igualmente.
                        </a>
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
