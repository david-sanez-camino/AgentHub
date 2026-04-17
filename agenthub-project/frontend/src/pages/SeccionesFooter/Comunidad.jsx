import React from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const canales = [
    {
        icono: "fa-brands fa-discord",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        border: "border-indigo-400/20",
        nombre: "Discord",
        descripcion:
            "El centro de la comunidad AgentHub. Canales para desarrolladores, clientes, casos de uso y soporte técnico en tiempo real.",
        miembros: "2.400+ miembros",
        cta: "Unirse al Discord",
    },
    {
        icono: "fa-brands fa-github",
        color: "text-slate-300",
        bg: "bg-slate-300/10",
        border: "border-slate-300/20",
        nombre: "GitHub",
        descripcion:
            "Repositorios de ejemplos, plantillas de agentes y utilidades open source mantenidas por el equipo y la comunidad.",
        miembros: "180+ contribuidores",
        cta: "Ver en GitHub",
    },
    {
        icono: "fa-brands fa-linkedin",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        nombre: "LinkedIn",
        descripcion:
            "Noticias del sector, casos de éxito de clientes y publicaciones del equipo de AgentHub sobre el futuro de los agentes IA.",
        miembros: "5.100+ seguidores",
        cta: "Seguir en LinkedIn",
    },
];

const eventos = [
    {
        tipo: "Webinar",
        tipoColor: "text-[#136dec] bg-[#136dec]/10",
        titulo: "Cómo monetizar tu primer agente en AgentHub",
        fecha: "24 Abr 2026 · 18:00 CET",
        ponente: "Equipo AgentHub",
        plazas: "Registro abierto",
    },
    {
        tipo: "Workshop",
        tipoColor: "text-emerald-400 bg-emerald-400/10",
        titulo: "Construye un agente de soporte para tu e-commerce en 1 hora",
        fecha: "8 May 2026 · 17:00 CET",
        ponente: "Comunidad developers",
        plazas: "Plazas limitadas",
    },
    {
        tipo: "AMA",
        tipoColor: "text-orange-400 bg-orange-400/10",
        titulo: "Pregúntanos cualquier cosa: equipo fundador de AgentHub",
        fecha: "15 May 2026 · 19:00 CET",
        ponente: "Fundadores AgentHub",
        plazas: "Registro abierto",
    },
];

export default function Comunidad() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Comunidad
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Construimos esto{" "}
                        <span className="text-[#136dec]">juntos</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        AgentHub no sería nada sin la comunidad de desarrolladores y empresas
                        que lo forman. Únete, aprende, comparte y ayuda a dar forma al
                        futuro del marketplace.
                    </p>
                </div>
            </section>

            {/* Stats comunidad */}
            <section className="pb-16 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { valor: "2.400+", label: "Desarrolladores activos" },
                        { valor: "340+", label: "Agentes publicados" },
                        { valor: "15+", label: "Países representados" },
                        { valor: "98 %", label: "Satisfacción de clientes" },
                    ].map((s, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-6 text-center">
                            <div className="text-2xl font-bold text-[#136dec] mb-1">{s.valor}</div>
                            <div className="text-xs text-slate-400 leading-snug">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Canales */}
            <section className="pb-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-3 text-center">Dónde encontrarnos</h2>
                    <p className="text-slate-400 text-center mb-10 text-sm">
                        Elige el canal que más se adapte a cómo quieres participar.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {canales.map((c, i) => (
                            <div key={i} className={`bg-[#101822] border ${c.border} rounded-2xl p-7 flex flex-col gap-4`}>
                                <div className={`size-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                                    <i className={`${c.icono} ${c.color} text-xl`}></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-1">{c.nombre}</h3>
                                    <span className="text-xs text-slate-500">{c.miembros}</span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed flex-1">{c.descripcion}</p>
                                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold border ${c.border} ${c.color} hover:bg-white/5 transition-all`}>
                                    {c.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Próximos eventos */}
            <section className="pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-3 text-center">Próximos eventos</h2>
                    <p className="text-slate-400 text-center mb-10 text-sm">
                        Webinars, workshops y sesiones en directo para aprender y conectar.
                    </p>
                    <div className="space-y-4">
                        {eventos.map((ev, i) => (
                            <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-6 flex items-start gap-5 hover:border-[#136dec]/30 transition-colors">
                                <div className="size-12 rounded-xl bg-[#136dec]/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-calendar-days text-[#136dec]"></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${ev.tipoColor}`}>{ev.tipo}</span>
                                        <span className="text-xs text-slate-500">{ev.fecha}</span>
                                    </div>
                                    <h3 className="font-semibold text-white text-sm mb-1">{ev.titulo}</h3>
                                    <p className="text-xs text-slate-500">{ev.ponente}</p>
                                </div>
                                <span className="text-xs font-semibold text-emerald-400 shrink-0 bg-emerald-400/10 px-3 py-1.5 rounded-lg">
                                    {ev.plazas}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-24 px-6">
                <div className="max-w-2xl mx-auto text-center bg-[#101822] border border-slate-800 rounded-2xl p-10">
                    <h2 className="text-xl font-bold text-white mb-3">
                        ¿Tienes algo que compartir con la comunidad?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Publica tu caso de uso, comparte tu agente o propón una sesión.
                        La comunidad crece con cada persona que aporta.
                    </p>
                    <Link
                        to="/crear_usuario"
                        className="inline-block px-8 py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-[#136dec]/30 active:scale-95"
                    >
                        Unirse a AgentHub
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
