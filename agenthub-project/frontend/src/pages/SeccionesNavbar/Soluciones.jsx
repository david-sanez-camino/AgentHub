import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

/* ─── casos de uso ───────────────────────────────────────────────────────── */

const casos = [
    {
        categoria: "Atención al Cliente",
        icono: "fa-solid fa-headset",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20",
        problema:
            "Tu equipo de soporte recibe 300 tickets al día. El 70 % son preguntas repetidas: estado del pedido, política de devoluciones, precios. Tus agentes dedican horas a responder lo mismo una y otra vez.",
        solucion:
            "Un agente especializado en soporte lee tu base de conocimiento, responde automáticamente las preguntas frecuentes y solo escala al humano los casos que realmente lo necesitan. El 70 % del volumen se resuelve sin intervención.",
        resultado: "Reduce el tiempo de respuesta de horas a segundos. Tu equipo solo gestiona lo que importa.",
        etiqueta: "PYME · Gran empresa",
    },
    {
        categoria: "Generación de Contenido",
        icono: "fa-solid fa-pen-nib",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        border: "border-violet-400/20",
        problema:
            "Tienes un equipo de marketing que necesita publicar 5 artículos de blog, 20 posts para redes y 10 newsletters al mes. No llegan a todo y contratar redactores es caro.",
        solucion:
            "Un agente de contenido aprende tu tono de voz, tu sector y tus palabras clave. Genera borradores listos para revisar en minutos. Tu equipo edita en vez de escribir desde cero, multiplicando su productividad.",
        resultado: "Produce en 1 hora lo que antes llevaba 2 días. Con coherencia de marca garantizada.",
        etiqueta: "PYME · Startup",
    },
    {
        categoria: "Análisis de Datos",
        icono: "fa-solid fa-chart-bar",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20",
        problema:
            "Tu equipo comercial recibe informes de ventas en Excel cada semana. Nadie tiene tiempo de analizar qué productos pierden margen, qué clientes están en riesgo de irse o dónde hay oportunidades de upselling.",
        solucion:
            "Un agente analítico recibe los datos, identifica patrones, detecta anomalías y genera un resumen ejecutivo en lenguaje natural. Lo que antes era trabajo de un analista durante medio día, son 3 minutos de procesamiento.",
        resultado: "Decisiones más rápidas basadas en datos reales, sin necesidad de contratar más analistas.",
        etiqueta: "Gran empresa · PYME",
    },
    {
        categoria: "Recursos Humanos",
        icono: "fa-solid fa-users",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        problema:
            "Publicaste una oferta de empleo y recibiste 400 CVs en una semana. Tu departamento de RRHH no tiene tiempo de revisarlos todos y los buenos candidatos se marchan con la competencia.",
        solucion:
            "Un agente de selección lee cada CV, lo evalúa según los criterios que tú defines (experiencia, habilidades, idiomas) y te entrega una lista priorizada con un resumen de cada candidato. Solo entrevistas a los que ya encajan.",
        resultado: "De 400 CVs a 10 candidatos preseleccionados en menos de 1 hora.",
        etiqueta: "Gran empresa · PYME",
    },
    {
        categoria: "Legal y Contratos",
        icono: "fa-solid fa-file-contract",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        problema:
            "Antes de firmar con un proveedor, alguien tiene que leer el contrato de 40 páginas para detectar cláusulas abusivas, penalizaciones ocultas o condiciones desfavorables. Ese alguien no siempre existe.",
        solucion:
            "Un agente legal lee el contrato, identifica las cláusulas más importantes, señala riesgos potenciales y resume los puntos clave en un informe de 1 página. No reemplaza al abogado, pero sí hace que vayas al abogado con los deberes hechos.",
        resultado: "Revisión inicial de contratos en minutos. Menos riesgo legal, menos coste en horas de asesoría.",
        etiqueta: "Gran empresa · PYME",
    },
    {
        categoria: "Logística e Inventario",
        icono: "fa-solid fa-truck",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        border: "border-cyan-400/20",
        problema:
            "Tu almacén se queda sin stock de forma inesperada o, al contrario, acumula producto que no rota. Nadie detecta los patrones de demanda a tiempo y el margen se va en urgencias y almacenamiento innecesario.",
        solucion:
            "Un agente de logística analiza el histórico de ventas, detecta estacionalidades y predice cuándo y cuánto pedir. Genera alertas automáticas antes de que el stock llegue a niveles críticos.",
        resultado: "Menos roturas de stock, menos sobreinventario. El margen que se escapaba, recuperado.",
        etiqueta: "Gran empresa · Comercio",
    },
];

/* ─── componente tarjeta ─────────────────────────────────────────────────── */

function CasoCard({ caso }) {
    const [expandido, setExpandido] = useState(false);

    return (
        <div className={`bg-[#101822] border ${caso.border} rounded-2xl overflow-hidden transition-all duration-300`}>
            <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                        <div className={`size-11 rounded-xl ${caso.bg} flex items-center justify-center shrink-0`}>
                            <i className={`${caso.icono} ${caso.color} text-lg`}></i>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white">{caso.categoria}</h3>
                            <span className="text-xs text-slate-500">{caso.etiqueta}</span>
                        </div>
                    </div>
                </div>

                {/* Problema */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="fa-solid fa-triangle-exclamation text-red-400 text-xs"></i>
                        <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">El problema</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{caso.problema}</p>
                </div>

                {/* Toggle */}
                <button
                    onClick={() => setExpandido(!expandido)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#136dec] hover:text-blue-400 transition-colors"
                >
                    <span>{expandido ? "Ocultar solución" : "Ver cómo lo resolvemos"}</span>
                    <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${expandido ? "rotate-180" : ""}`}></i>
                </button>
            </div>

            {expandido && (
                <div className="px-7 pb-7 border-t border-slate-800 pt-5 space-y-4">
                    {/* Solución */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <i className="fa-solid fa-robot text-[#136dec] text-xs"></i>
                            <span className="text-xs font-semibold text-[#136dec] uppercase tracking-wider">La solución con AgentHub</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{caso.solucion}</p>
                    </div>

                    {/* Resultado */}
                    <div className={`${caso.bg} ${caso.border} border rounded-xl px-5 py-4 flex items-start gap-3`}>
                        <i className={`fa-solid fa-circle-check ${caso.color} mt-0.5 shrink-0`}></i>
                        <p className="text-sm text-slate-200 leading-relaxed font-medium">{caso.resultado}</p>
                    </div>

                    <Link
                        to="/marketplace"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#136dec] hover:text-blue-400 transition-colors"
                    >
                        Buscar agentes para este caso
                        <i className="fa-solid fa-arrow-right text-xs"></i>
                    </Link>
                </div>
            )}
        </div>
    );
}

/* ─── página ─────────────────────────────────────────────────────────────── */

export default function Soluciones() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* ── Hero ── */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Soluciones
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Problemas reales,{" "}
                        <span className="text-[#136dec]">soluciones concretas</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        No vendemos IA genérica. En AgentHub encontrarás agentes entrenados
                        para resolver exactamente el problema que tiene tu empresa hoy.
                        Directo al grano, sin tecnicismos.
                    </p>
                </div>
            </section>

            {/* ── Stats rápidos ── */}
            <section className="pb-20 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { valor: "70 %", etiqueta: "de tickets resueltos sin humanos" },
                        { valor: "10×", etiqueta: "más rápido que hacerlo a mano" },
                        { valor: "24/7", etiqueta: "disponibilidad sin coste extra" },
                        { valor: "5 min", etiqueta: "para activar tu primer agente" },
                    ].map((s, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-6 text-center">
                            <div className="text-2xl font-bold text-[#136dec] mb-1">{s.valor}</div>
                            <div className="text-xs text-slate-400 leading-snug">{s.etiqueta}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Casos ── */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Casos de uso por departamento
                        </h2>
                        <p className="text-slate-400">
                            Haz clic en "Ver cómo lo resolvemos" para ver la solución y el resultado esperado.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {casos.map((caso, i) => (
                            <CasoCard key={i} caso={caso} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Cómo empezar ── */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        ¿Reconoces alguno de estos problemas?
                    </h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Explora el marketplace, filtra por departamento o caso de uso y activa el
                        agente que necesitas. Si no encuentras exactamente lo que buscas,
                        cuéntanoslo y lo publicamos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/marketplace"
                            className="px-8 py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold transition-all shadow-lg shadow-[#136dec]/30 hover:shadow-[#136dec]/50 active:scale-95"
                        >
                            Explorar el marketplace
                        </Link>
                        <Link
                            to="/documentacion"
                            className="px-8 py-3 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold transition-all"
                        >
                            Cómo funciona AgentHub
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
