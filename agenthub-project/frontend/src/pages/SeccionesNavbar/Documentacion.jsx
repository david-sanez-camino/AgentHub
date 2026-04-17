import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

/* ─── datos ──────────────────────────────────────────────────────────────── */

const pasosDesarrollador = [
    {
        num: "01",
        titulo: "Crea tu cuenta de desarrollador",
        descripcion:
            "Regístrate en AgentHub y accede a tu panel de desarrollador. Desde ahí gestionas tus agentes, revisas métricas de uso y cobras tus ganancias. El proceso lleva menos de 2 minutos.",
        icono: "fa-solid fa-user-plus",
    },
    {
        num: "02",
        titulo: "Construye y prepara tu agente",
        descripcion:
            "Desarrolla tu agente con el modelo de IA que prefieras (GPT-4, Claude, Mistral…). Define su comportamiento, sus herramientas y el contexto del sistema. No imponemos frameworks: si funciona, se puede publicar.",
        icono: "fa-solid fa-screwdriver-wrench",
    },
    {
        num: "03",
        titulo: "Publica en el marketplace",
        descripcion:
            "Completa el formulario de publicación: nombre, descripción, categoría, precio en tokens y una demo de ejemplo. Nuestro equipo revisa la publicación en 24-48 h para garantizar calidad y seguridad.",
        icono: "fa-solid fa-upload",
    },
    {
        num: "04",
        titulo: "Conecta tus herramientas (opcional)",
        descripcion:
            "Si tu agente necesita acceso a APIs externas, bases de datos o servicios como Slack, Google Sheets o Notion, puedes registrar esas integraciones en tu panel. Los clientes las verán en la ficha del agente.",
        icono: "fa-solid fa-plug",
    },
    {
        num: "05",
        titulo: "Cobra y escala",
        descripcion:
            "Cada vez que un cliente ejecuta tu agente, los tokens se acreditan en tu cuenta. Puedes retirar tus ganancias mensualmente. Cuanto más lo usen, más ganas. Sin techo.",
        icono: "fa-solid fa-coins",
    },
];

const pasosCliente = [
    {
        num: "01",
        titulo: "Explora el marketplace",
        descripcion:
            "Navega por categorías — Soporte, Marketing, Finanzas, RRHH, Legal… — o usa el buscador para encontrar el agente que resuelve exactamente tu problema. Cada ficha incluye descripción, precio y ejemplos reales de uso.",
        icono: "fa-solid fa-magnifying-glass",
    },
    {
        num: "02",
        titulo: "Adquiere tokens",
        descripcion:
            "Los tokens son la moneda de la plataforma. Compra el pack que se adapta a tu volumen de uso. No caducan y puedes usarlos con cualquier agente del marketplace.",
        icono: "fa-solid fa-wallet",
    },
    {
        num: "03",
        titulo: "Activa el agente",
        descripcion:
            "Con un solo clic pagas la activación del agente y accedes al chat especializado. Cada mensaje o ejecución descuenta los tokens correspondientes al precio que el desarrollador ha fijado.",
        icono: "fa-solid fa-bolt",
    },
    {
        num: "04",
        titulo: "Interactúa y obtén resultados",
        descripcion:
            "Habla con tu agente como si fuera un experto en la materia. Puede responder preguntas, generar documentos, analizar datos o ejecutar tareas automatizadas según sus capacidades.",
        icono: "fa-solid fa-comments",
    },
    {
        num: "05",
        titulo: "Gestiona tus agentes activos",
        descripcion:
            "Desde tu panel de cliente puedes ver todos los agentes que tienes activos, tu historial de conversaciones, el consumo de tokens y volver a usar cualquier agente cuando lo necesites.",
        icono: "fa-solid fa-layer-group",
    },
];

const faqs = [
    {
        pregunta: "¿Necesito saber programar para usar AgentHub como cliente?",
        respuesta:
            "No. La interfaz está diseñada para usuarios no técnicos. Simplemente describes tu problema o tarea en lenguaje natural y el agente responde. Es como escribirle a un experto por chat.",
    },
    {
        pregunta: "¿Qué modelos de IA puedo usar para publicar mi agente?",
        respuesta:
            "Actualmente soportamos agentes basados en GPT-4, Claude 3 y variantes de código abierto como Mistral o LLaMA. Si trabajas con otro modelo, contáctanos: el catálogo crece continuamente.",
    },
    {
        pregunta: "¿Cómo protege AgentHub los datos de los clientes?",
        respuesta:
            "Las conversaciones se procesan de forma cifrada y no se usan para entrenar modelos externos. Los desarrolladores solo acceden a las métricas de uso, nunca al contenido de las conversaciones.",
    },
    {
        pregunta: "¿Cuánto se queda AgentHub de mis ganancias como desarrollador?",
        respuesta:
            "AgentHub aplica una comisión del 20 % sobre cada transacción. El 80 % restante va directamente a tu balance. Es una de las comisiones más bajas del sector para marketplaces de IA.",
    },
    {
        pregunta: "¿Puedo probar un agente antes de comprarlo?",
        respuesta:
            "Sí. Cada agente publicado puede incluir una demo gratuita de hasta 3 mensajes. Los desarrolladores pueden activarla o desactivarla desde su panel.",
    },
    {
        pregunta: "¿Qué pasa si un agente no funciona como se describe?",
        respuesta:
            "Tienes hasta 24 horas desde la primera ejecución para solicitar un reembolso completo de tokens si el agente no cumple con la descripción publicada. Nuestro equipo de soporte revisa cada caso.",
    },
];

/* ─── componentes auxiliares ─────────────────────────────────────────────── */

function PasoCard({ paso, lado }) {
    return (
        <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center shrink-0">
                <div className="size-14 rounded-2xl bg-[#136dec]/10 border border-[#136dec]/20 flex items-center justify-center group-hover:bg-[#136dec]/20 transition-colors">
                    <i className={`${paso.icono} text-[#136dec] text-xl`}></i>
                </div>
                <div className="w-px flex-1 bg-slate-800 mt-3 min-h-[2rem]"></div>
            </div>
            <div className="pb-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#136dec]">{paso.num}</span>
                    <h3 className="text-base font-semibold text-white">{paso.titulo}</h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{paso.descripcion}</p>
            </div>
        </div>
    );
}

function FaqItem({ item, abierto, toggle }) {
    return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-[#101822]">
            <button
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#136dec]/5 transition-colors"
                onClick={toggle}
            >
                <span className="font-medium text-white text-sm pr-4">{item.pregunta}</span>
                <i className={`fa-solid fa-chevron-down text-slate-400 shrink-0 transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}></i>
            </button>
            {abierto && (
                <div className="px-6 pb-5">
                    <p className="text-sm text-slate-400 leading-relaxed">{item.respuesta}</p>
                </div>
            )}
        </div>
    );
}

/* ─── página ─────────────────────────────────────────────────────────────── */

export default function Documentacion() {
    const [faqAbierta, setFaqAbierta] = useState(null);
    const [tab, setTab] = useState("desarrollador");

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* ── Hero ── */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Documentación
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        ¿Cómo funciona{" "}
                        <span className="text-[#136dec]">AgentHub?</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        AgentHub es el marketplace donde desarrolladores publican agentes de IA
                        especializados y empresas los contratan para resolver problemas reales.
                        Aquí encontrarás todo lo que necesitas saber, seas desarrollador o cliente.
                    </p>
                </div>
            </section>

            {/* ── Qué es AgentHub ── */}
            <section className="pb-20 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icono: "fa-solid fa-store",
                            titulo: "Un marketplace de agentes IA",
                            texto:
                                "Como App Store pero para agentes de inteligencia artificial. Cada agente es un experto digital entrenado para una tarea concreta.",
                        },
                        {
                            icono: "fa-solid fa-handshake",
                            titulo: "Desarrolladores y clientes conectados",
                            texto:
                                "Los desarrolladores monetizan sus agentes. Los clientes acceden a soluciones de IA sin necesidad de construirlas desde cero.",
                        },
                        {
                            icono: "fa-solid fa-coins",
                            titulo: "Sistema de tokens transparente",
                            texto:
                                "Todo funciona con tokens. Los clientes los compran, los desarrolladores fijan el precio por uso y la plataforma es el puente.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-7">
                            <div className="size-11 rounded-xl bg-[#136dec]/10 flex items-center justify-center mb-4">
                                <i className={`${item.icono} text-[#136dec] text-lg`}></i>
                            </div>
                            <h3 className="font-semibold text-white mb-2">{item.titulo}</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{item.texto}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Tabs Desarrollador / Cliente ── */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Selector */}
                    <div className="flex gap-2 p-1 bg-[#101822] border border-slate-800 rounded-2xl mb-12 w-fit mx-auto">
                        <button
                            onClick={() => setTab("desarrollador")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "desarrollador"
                                    ? "bg-[#136dec] text-white shadow-lg shadow-[#136dec]/30"
                                    : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <i className="fa-solid fa-code mr-2"></i>Soy Desarrollador
                        </button>
                        <button
                            onClick={() => setTab("cliente")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "cliente"
                                    ? "bg-[#136dec] text-white shadow-lg shadow-[#136dec]/30"
                                    : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <i className="fa-solid fa-building mr-2"></i>Soy Cliente
                        </button>
                    </div>

                    {/* Contenido Desarrollador */}
                    {tab === "desarrollador" && (
                        <div>
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-3">
                                    Publica tu agente y empieza a monetizar
                                </h2>
                                <p className="text-slate-400 leading-relaxed">
                                    Si construyes agentes de IA, AgentHub es tu canal de distribución.
                                    Miles de empresas buscan soluciones específicas que tú puedes ofrecer.
                                    Sin esfuerzo comercial: sube tu agente, fija el precio y deja que la
                                    plataforma haga el resto.
                                </p>
                            </div>
                            <div>
                                {pasosDesarrollador.map((paso, i) => (
                                    <PasoCard key={i} paso={paso} />
                                ))}
                            </div>
                            <div className="mt-4 bg-[#136dec]/5 border border-[#136dec]/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <i className="fa-solid fa-lightbulb text-[#136dec] text-lg mt-0.5 shrink-0"></i>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Consejo de publicación</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Los agentes con una descripción clara, ejemplos de uso reales y una
                                            demo activa convierten hasta 3 veces más que los que no los tienen.
                                            Dedica 10 minutos a escribir bien la ficha: es tu página de ventas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contenido Cliente */}
                    {tab === "cliente" && (
                        <div>
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-3">
                                    Contrata el agente que necesitas en minutos
                                </h2>
                                <p className="text-slate-400 leading-relaxed">
                                    No hace falta que tu empresa tenga un equipo de IA ni que
                                    desarrolles nada. En AgentHub encuentras agentes ya construidos
                                    y probados, listos para resolver problemas concretos. Pagas solo
                                    por lo que usas.
                                </p>
                            </div>
                            <div>
                                {pasosCliente.map((paso, i) => (
                                    <PasoCard key={i} paso={paso} />
                                ))}
                            </div>
                            <div className="mt-4 bg-[#136dec]/5 border border-[#136dec]/20 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <i className="fa-solid fa-shield-halved text-[#136dec] text-lg mt-0.5 shrink-0"></i>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Tu dinero está protegido</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Los tokens no caducan. Si un agente no cumple lo que promete,
                                            tienes 24 horas para solicitar el reembolso completo. Revisamos
                                            cada caso y actuamos sin burocracia.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Normas de publicación para desarrolladores ── */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Normas del marketplace
                        </h2>
                        <p className="text-slate-400">
                            Para mantener la calidad, todo agente publicado debe cumplir estas reglas básicas.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { ok: true, texto: "El agente debe hacer exactamente lo que describe su ficha." },
                            { ok: true, texto: "La demo debe ser representativa del comportamiento real." },
                            { ok: true, texto: "El precio debe ser proporcional al coste real del modelo." },
                            { ok: true, texto: "No se pueden publicar agentes que generen contenido dañino." },
                            { ok: false, texto: "Prohibido copiar agentes de otros desarrolladores sin permiso." },
                            { ok: false, texto: "No se permiten agentes que recopilen datos personales sin consentimiento." },
                            { ok: false, texto: "No se aceptan descripciones engañosas o promesas imposibles." },
                            { ok: false, texto: "Prohibido publicar el mismo agente varias veces para manipular el ranking." },
                        ].map((r, i) => (
                            <div key={i} className="flex items-start gap-3 bg-[#101822] border border-slate-800 rounded-xl px-5 py-4">
                                <i className={`fa-solid ${r.ok ? "fa-check text-emerald-400" : "fa-xmark text-red-400"} mt-0.5 shrink-0`}></i>
                                <span className="text-sm text-slate-300">{r.texto}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-white mb-3">Preguntas frecuentes</h2>
                        <p className="text-slate-400">Todo lo que nos suelen preguntar, respondido sin rodeos.</p>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <FaqItem
                                key={i}
                                item={faq}
                                abierto={faqAbierta === i}
                                toggle={() => setFaqAbierta(faqAbierta === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTAs finales ── */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#101822] border border-slate-800 rounded-2xl p-8 flex flex-col gap-4">
                        <div className="size-12 rounded-xl bg-[#136dec]/10 flex items-center justify-center">
                            <i className="fa-solid fa-code text-[#136dec] text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Soy desarrollador</h3>
                            <p className="text-sm text-slate-400">Crea tu cuenta, sube tu primer agente y empieza a ganar dinero con tu trabajo.</p>
                        </div>
                        <Link to="/crear_usuario" className="mt-auto inline-block text-center px-6 py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all active:scale-95">
                            Registrarme como desarrollador
                        </Link>
                    </div>
                    <div className="bg-[#101822] border border-slate-800 rounded-2xl p-8 flex flex-col gap-4">
                        <div className="size-12 rounded-xl bg-[#136dec]/10 flex items-center justify-center">
                            <i className="fa-solid fa-building text-[#136dec] text-xl"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-2">Soy cliente / empresa</h3>
                            <p className="text-sm text-slate-400">Explora el marketplace y encuentra el agente que automatiza o resuelve tu próximo problema.</p>
                        </div>
                        <Link to="/marketplace" className="mt-auto inline-block text-center px-6 py-3 rounded-xl border border-slate-600 hover:border-[#136dec] text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-95">
                            Explorar el marketplace
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
