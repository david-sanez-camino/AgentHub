import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const categorias = ["Todas", "Productividad", "Comunicación", "Datos", "CRM", "Desarrollo"];

const integraciones = [
    {
        categoria: "Productividad",
        nombre: "Google Sheets",
        icono: "fa-brands fa-google",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        estado: "Disponible",
        descripcion: "Los agentes pueden leer y escribir en tus hojas de cálculo. Ideal para agentes que procesan datos tabulares, generan informes o actualizan inventarios automáticamente.",
        casosUso: ["Actualizar inventario desde el agente", "Exportar resultados de análisis", "Leer datos de ventas para generar resúmenes"],
    },
    {
        categoria: "Productividad",
        nombre: "Notion",
        icono: "fa-solid fa-n",
        color: "text-slate-300",
        bg: "bg-slate-300/10",
        estado: "Disponible",
        descripcion: "Conecta tus agentes con tus bases de datos de Notion. Pueden crear páginas, actualizar propiedades y leer contenido para responder con información siempre actualizada.",
        casosUso: ["Crear tareas desde el chat", "Actualizar estados de proyectos", "Leer documentación interna"],
    },
    {
        categoria: "Comunicación",
        nombre: "Slack",
        icono: "fa-brands fa-slack",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        estado: "Disponible",
        descripcion: "Recibe notificaciones y resúmenes del agente directamente en tus canales de Slack. También puedes activar un agente desde un comando slash en Slack.",
        casosUso: ["Alertas automáticas al canal de ventas", "Resumen diario en #equipo", "Activar agente con /agenthub"],
    },
    {
        categoria: "Comunicación",
        nombre: "Microsoft Teams",
        icono: "fa-brands fa-microsoft",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        estado: "Próximamente",
        descripcion: "Integración nativa con Teams para empresas que usan el ecosistema Microsoft. Notificaciones, resúmenes y activación de agentes desde Teams.",
        casosUso: ["Notificaciones en canales de Teams", "Bot de agente en Teams", "Resúmenes de reunión automatizados"],
    },
    {
        categoria: "Datos",
        nombre: "Airtable",
        icono: "fa-solid fa-table",
        color: "text-red-400",
        bg: "bg-red-400/10",
        estado: "Disponible",
        descripcion: "Los agentes pueden consultar y actualizar registros en Airtable. Perfecto para agentes de gestión de leads, seguimiento de proyectos o bases de datos operativas.",
        casosUso: ["Registrar leads cualificados", "Actualizar estado de proyectos", "Consultar catálogos de productos"],
    },
    {
        categoria: "CRM",
        nombre: "HubSpot",
        icono: "fa-brands fa-hubspot",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        estado: "Próximamente",
        descripcion: "Conecta tus agentes de ventas y soporte directamente con HubSpot. Crea contactos, actualiza deals y registra interacciones de forma automática.",
        casosUso: ["Crear contactos desde el chat", "Actualizar etapa del deal", "Registrar notas de conversación"],
    },
    {
        categoria: "Desarrollo",
        nombre: "Webhooks",
        icono: "fa-solid fa-webhook",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        estado: "Disponible",
        descripcion: "Envía eventos de tu agente a cualquier URL externa. Conecta AgentHub con cualquier sistema que soporte webhooks: tu propio backend, Zapier, Make, n8n, etc.",
        casosUso: ["Enviar resultados a tu backend", "Disparar flujos en Zapier/Make", "Integrar con sistemas legacy"],
    },
    {
        categoria: "Desarrollo",
        nombre: "REST API",
        icono: "fa-solid fa-code",
        color: "text-[#136dec]",
        bg: "bg-[#136dec]/10",
        estado: "Disponible",
        descripcion: "API completa para ejecutar agentes, gestionar configuraciones y consultar métricas desde tu propia aplicación. Documentación completa con ejemplos en múltiples lenguajes.",
        casosUso: ["Ejecutar agentes desde tu app", "Gestionar tokens programáticamente", "Consultar historial de ejecuciones"],
    },
];

export default function Integraciones() {
    const [catActiva, setCatActiva] = useState("Todas");
    const [abierto, setAbierto] = useState(null);

    const filtradas = catActiva === "Todas"
        ? integraciones
        : integraciones.filter(i => i.categoria === catActiva);

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Integraciones
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Conecta tus agentes con{" "}
                        <span className="text-[#136dec]">las herramientas que ya usas</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Los agentes de AgentHub no viven aislados. Se conectan con tus hojas de
                        cálculo, CRM, canales de comunicación y cualquier sistema con API.
                    </p>
                </div>
            </section>

            {/* Filtros */}
            <section className="pb-10 px-6">
                <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setCatActiva(cat); setAbierto(null); }}
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

            {/* Grid integraciones */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filtradas.map((intg, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#136dec]/30 transition-colors">
                            <button
                                className="w-full flex items-center gap-4 px-6 py-5 text-left"
                                onClick={() => setAbierto(abierto === intg.nombre ? null : intg.nombre)}
                            >
                                <div className={`size-11 rounded-xl ${intg.bg} flex items-center justify-center shrink-0`}>
                                    <i className={`${intg.icono} ${intg.color} text-lg`}></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-white text-sm">{intg.nombre}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${intg.estado === "Disponible"
                                            ? "text-emerald-400 bg-emerald-400/10"
                                            : "text-yellow-400 bg-yellow-400/10"
                                            }`}>
                                            {intg.estado}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">{intg.categoria}</p>
                                </div>
                                <i className={`fa-solid fa-chevron-down text-slate-400 text-xs shrink-0 transition-transform duration-300 ${abierto === intg.nombre ? "rotate-180" : ""}`}></i>
                            </button>

                            {abierto === intg.nombre && (
                                <div className="px-6 pb-6 border-t border-slate-800 pt-4 space-y-4">
                                    <p className="text-sm text-slate-400 leading-relaxed">{intg.descripcion}</p>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-300 mb-2">Casos de uso habituales:</p>
                                        <ul className="space-y-1.5">
                                            {intg.casosUso.map((cu, j) => (
                                                <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                                                    <i className="fa-solid fa-arrow-right text-[#136dec] mt-0.5 shrink-0 text-xs"></i>
                                                    {cu}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA desarrolladores */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto text-center bg-[#101822] border border-slate-800 rounded-2xl p-10">
                    <h2 className="text-xl font-bold text-white mb-3">
                        ¿Eres desarrollador? Publica un agente con integraciones
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Los agentes que conectan con herramientas populares se venden hasta 4× más.
                        Añade integraciones a tu agente desde el panel de desarrollador.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/crear_usuario"
                            className="px-8 py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-[#136dec]/30 active:scale-95"
                        >
                            Publicar mi agente
                        </Link>
                        <Link
                            to="/documentacion"
                            className="px-8 py-3 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                        >
                            Ver documentación API
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
