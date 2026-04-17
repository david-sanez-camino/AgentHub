import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const sectores = [
    { id: "todos", label: "Todos" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "legal", label: "Legal" },
    { id: "rrhh", label: "RRHH" },
    { id: "finanzas", label: "Finanzas" },
    { id: "salud", label: "Salud" },
    { id: "educacion", label: "Educación" },
];

const casos = [
    {
        sector: "ecommerce",
        empresa: "Tienda online de moda",
        tamano: "PYME · 12 empleados",
        icono: "fa-solid fa-shirt",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        agente: "Agente de Atención al Cliente",
        problema: "Gestionaban 200 consultas diarias por email y WhatsApp sobre tallas, devoluciones y estado de pedidos. Tardaban 6 horas en responder.",
        resultado: "El agente resuelve el 78 % de las consultas de forma automática. El tiempo de respuesta bajó de 6 horas a 3 minutos. El equipo solo interviene en casos complejos.",
        metricas: ["78 % automatizado", "3 min de respuesta", "40 h/semana liberadas"],
    },
    {
        sector: "legal",
        empresa: "Despacho de abogados",
        tamano: "PYME · 8 abogados",
        icono: "fa-solid fa-scale-balanced",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        agente: "Agente de Revisión de Contratos",
        problema: "Antes de cada negociación, un abogado dedicaba 2-3 horas a leer contratos de proveedores para detectar cláusulas problemáticas.",
        resultado: "El agente lee el contrato en 4 minutos y entrega un informe con los puntos clave y los riesgos potenciales. Los abogados van a las reuniones ya preparados.",
        metricas: ["4 min por contrato", "2-3 h ahorradas", "Riesgo legal reducido"],
    },
    {
        sector: "rrhh",
        empresa: "Consultora de selección",
        tamano: "Empresa · 45 personas",
        icono: "fa-solid fa-users",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        agente: "Agente de Cribado de CVs",
        problema: "Recibían 300-500 CVs por oferta. El equipo de RRHH invertía 3 días en hacer una primera selección de 20 candidatos.",
        resultado: "El agente evalúa todos los CVs contra los criterios de la oferta y entrega los 15 mejores con un resumen en menos de 1 hora.",
        metricas: ["3 días → 1 hora", "500 CVs procesados", "15 candidatos preseleccionados"],
    },
    {
        sector: "finanzas",
        empresa: "Gestora de inversiones",
        tamano: "Empresa · 90 personas",
        icono: "fa-solid fa-chart-candlestick",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        agente: "Agente de Análisis de Informes",
        problema: "El equipo de análisis procesaba manualmente informes trimestrales de 40+ empresas en cartera. Tardaban una semana en tener el resumen ejecutivo.",
        resultado: "El agente procesa los 40 informes en paralelo, extrae los KPIs relevantes y genera un resumen ejecutivo con alertas de cambio significativo en 2 horas.",
        metricas: ["40 informes en 2 h", "Alertas automáticas", "1 semana → 2 horas"],
    },
    {
        sector: "salud",
        empresa: "Clínica privada",
        tamano: "PYME · 20 profesionales",
        icono: "fa-solid fa-heart-pulse",
        color: "text-red-400",
        bg: "bg-red-400/10",
        agente: "Agente de Gestión de Citas",
        problema: "La recepción recibía 80 llamadas al día para citas, cambios y cancelaciones. Las llamadas en espera eran una queja constante de los pacientes.",
        resultado: "El agente gestiona citas por chat y WhatsApp. Los pacientes pueden reservar, cambiar o cancelar en cualquier momento. Las llamadas de recepción se redujeron un 65 %.",
        metricas: ["65 % menos llamadas", "Disponible 24/7", "Satisfacción +40 %"],
    },
    {
        sector: "educacion",
        empresa: "Plataforma de formación online",
        tamano: "Startup · 15 personas",
        icono: "fa-solid fa-graduation-cap",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        agente: "Agente Tutor Personalizado",
        problema: "Los alumnos tenían dudas fuera del horario de tutorías y abandonaban el curso al no recibir respuesta rápida. La tasa de abandono era del 42 %.",
        resultado: "El agente tutor responde dudas de contenido 24/7, adapta las explicaciones al nivel del alumno y escala al tutor humano cuando es necesario. El abandono bajó al 18 %.",
        metricas: ["Abandono: 42 % → 18 %", "Soporte 24/7", "NPS +35 puntos"],
    },
];

export default function CasosDeUso() {
    const [sectorActivo, setSectorActivo] = useState("todos");

    const filtrados = sectorActivo === "todos"
        ? casos
        : casos.filter(c => c.sector === sectorActivo);

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Casos de uso
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Empresas reales,{" "}
                        <span className="text-[#136dec]">resultados reales</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Cómo empresas de distintos sectores están usando los agentes de AgentHub
                        para automatizar procesos y liberar tiempo de su equipo.
                    </p>
                </div>
            </section>

            {/* Filtros */}
            <section className="pb-10 px-6">
                <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
                    {sectores.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSectorActivo(s.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${sectorActivo === s.id
                                ? "bg-[#136dec] text-white shadow-lg shadow-[#136dec]/30"
                                : "bg-[#101822] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Casos */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtrados.map((caso, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-7 flex flex-col gap-5 hover:border-[#136dec]/30 transition-colors">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className={`size-11 rounded-xl ${caso.bg} flex items-center justify-center shrink-0`}>
                                        <i className={`${caso.icono} ${caso.color}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-sm">{caso.empresa}</h3>
                                        <span className="text-xs text-slate-500">{caso.tamano}</span>
                                    </div>
                                </div>
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${caso.bg} ${caso.color} shrink-0`}>
                                    {caso.agente}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <i className="fa-solid fa-triangle-exclamation text-red-400 text-xs"></i>
                                        <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Problema</span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{caso.problema}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <i className="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Resultado</span>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed">{caso.resultado}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800">
                                {caso.metricas.map((m, j) => (
                                    <span key={j} className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#136dec]/10 text-[#136dec]">
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="pb-24 px-6">
                <div className="max-w-2xl mx-auto text-center bg-[#101822] border border-slate-800 rounded-2xl p-10">
                    <h2 className="text-xl font-bold text-white mb-3">
                        ¿Tu empresa podría ser el próximo caso?
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        Explora el marketplace y encuentra el agente que automatiza tu siguiente proceso.
                    </p>
                    <Link
                        to="/marketplace"
                        className="inline-block px-8 py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-[#136dec]/30 active:scale-95"
                    >
                        Explorar agentes
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
