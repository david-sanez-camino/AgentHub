import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

/* ─── datos ──────────────────────────────────────────────────────────────── */

const packsTokens = [
    {
        nombre: "Starter",
        tokens: "1.000",
        precio: "9",
        por: "0,009 € / token",
        descripcion: "Para probar la plataforma y experimentar con distintos agentes.",
        destacado: false,
    },
    {
        nombre: "Growth",
        tokens: "5.000",
        precio: "39",
        por: "0,0078 € / token",
        descripcion: "Para equipos que usan agentes de forma habitual en su operativa.",
        destacado: true,
    },
    {
        nombre: "Scale",
        tokens: "15.000",
        precio: "99",
        por: "0,0066 € / token",
        descripcion: "Para empresas con alto volumen de ejecuciones diarias.",
        destacado: false,
    },
    {
        nombre: "Enterprise",
        tokens: "Personalizado",
        precio: "A medida",
        por: "Mejor precio del mercado",
        descripcion: "Volúmenes grandes, facturación centralizada y SLA garantizado.",
        destacado: false,
    },
];

const ejemplosUso = [
    {
        agente: "Agente de Soporte",
        modelo: "GPT-4o mini",
        precioEjec: 5,
        descripcion: "Responde una consulta de cliente (texto corto, respuesta media).",
        costeToken: "0,045 €",
        usos100: "0,45 €",
    },
    {
        agente: "Agente de Análisis",
        modelo: "GPT-4o",
        precioEjec: 50,
        descripcion: "Analiza un informe de ventas completo y genera resumen ejecutivo.",
        costeToken: "0,45 €",
        usos100: "45 €",
    },
    {
        agente: "Agente de Redacción",
        modelo: "Claude 3 Haiku",
        precioEjec: 15,
        descripcion: "Genera un artículo de blog de 600 palabras.",
        costeToken: "0,135 €",
        usos100: "13,50 €",
    },
    {
        agente: "Agente Legal",
        modelo: "GPT-4o",
        precioEjec: 80,
        descripcion: "Lee y resume un contrato de 40 páginas con análisis de riesgos.",
        costeToken: "0,72 €",
        usos100: "72 €",
    },
];

/* ─── página ─────────────────────────────────────────────────────────────── */

export default function Precios() {
    const [tabActivo, setTabActivo] = useState("cliente");

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* ── Hero ── */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Precios
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Cómo funciona el{" "}
                        <span className="text-[#136dec]">sistema de tokens</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        En AgentHub no hay suscripciones rígidas. Pagas por lo que usas,
                        los desarrolladores fijan sus precios y todo es transparente.
                        Aquí te explicamos cómo funciona todo de forma sencilla.
                    </p>
                </div>
            </section>

            {/* ── Qué es un token ── */}
            <section className="pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#101822] border border-[#136dec]/20 rounded-2xl p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-12 rounded-xl bg-[#136dec]/10 flex items-center justify-center">
                                <i className="fa-solid fa-coins text-[#136dec] text-xl"></i>
                            </div>
                            <h2 className="text-xl font-bold text-white">¿Qué es un token en AgentHub?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-slate-400 leading-relaxed mb-4">
                                    Un <span className="text-white font-semibold">token es la unidad de pago</span> de la plataforma.
                                    Es la forma en que medimos y cobramos el uso de los agentes, de manera
                                    independiente al modelo de IA que use cada uno.
                                </p>
                                <p className="text-slate-400 leading-relaxed">
                                    Piénsalo como los créditos de una máquina recreativa: compras una bolsa
                                    de tokens y los vas gastando según juegas. Cada agente tiene su propio
                                    precio en tokens por ejecución, fijado por su desarrollador.
                                </p>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { icono: "fa-solid fa-circle-check text-emerald-400", texto: "Los tokens no caducan nunca." },
                                    { icono: "fa-solid fa-circle-check text-emerald-400", texto: "Son válidos para cualquier agente del marketplace." },
                                    { icono: "fa-solid fa-circle-check text-emerald-400", texto: "Puedes ver exactamente cuántos consume cada ejecución." },
                                    { icono: "fa-solid fa-circle-check text-emerald-400", texto: "No hay cargos sorpresa: el precio está visible antes de ejecutar." },
                                    { icono: "fa-solid fa-circle-check text-emerald-400", texto: "Si un agente falla, los tokens se devuelven automáticamente." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <i className={`${item.icono} text-sm mt-0.5 shrink-0`}></i>
                                        <span className="text-sm text-slate-300">{item.texto}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Tabs cliente / desarrollador ── */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex gap-2 p-1 bg-[#101822] border border-slate-800 rounded-2xl mb-12 w-fit mx-auto">
                        <button
                            onClick={() => setTabActivo("cliente")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tabActivo === "cliente"
                                    ? "bg-[#136dec] text-white shadow-lg shadow-[#136dec]/30"
                                    : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <i className="fa-solid fa-building mr-2"></i>Para clientes
                        </button>
                        <button
                            onClick={() => setTabActivo("desarrollador")}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tabActivo === "desarrollador"
                                    ? "bg-[#136dec] text-white shadow-lg shadow-[#136dec]/30"
                                    : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <i className="fa-solid fa-code mr-2"></i>Para desarrolladores
                        </button>
                    </div>

                    {/* ── TAB CLIENTES ── */}
                    {tabActivo === "cliente" && (
                        <div className="space-y-12">
                            {/* Packs */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2 text-center">Packs de tokens</h2>
                                <p className="text-slate-400 text-center mb-8 text-sm">
                                    Compra tokens una sola vez. Úsalos cuando quieras, con cualquier agente.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {packsTokens.map((pack, i) => (
                                        <div
                                            key={i}
                                            className={`relative rounded-2xl p-6 border flex flex-col gap-4 transition-all ${pack.destacado
                                                    ? "bg-[#136dec]/10 border-[#136dec] shadow-xl shadow-[#136dec]/20 scale-105"
                                                    : "bg-[#101822] border-slate-800 hover:border-slate-600"
                                                }`}
                                        >
                                            {pack.destacado && (
                                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-[#136dec] text-white shadow">
                                                    Más popular
                                                </span>
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-white text-sm">{pack.nombre}</h3>
                                                <p className="text-xs text-slate-500 mt-1">{pack.descripcion}</p>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white">
                                                    {pack.precio === "A medida" ? "A medida" : `${pack.precio} €`}
                                                </div>
                                                <div className="text-xs text-[#136dec] font-semibold mt-1">
                                                    {pack.tokens} tokens
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5">{pack.por}</div>
                                            </div>
                                            <Link
                                                to="/crear_usuario"
                                                className={`block text-center py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-95 ${pack.destacado
                                                        ? "bg-[#136dec] hover:bg-blue-600 text-white"
                                                        : "border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white"
                                                    }`}
                                            >
                                                {pack.precio === "A medida" ? "Contactar" : "Comprar pack"}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ejemplos de coste real */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2 text-center">
                                    ¿Cuánto cuesta usar un agente?
                                </h2>
                                <p className="text-slate-400 text-center mb-8 text-sm">
                                    Ejemplos reales de coste por ejecución con agentes típicos del marketplace.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-800">
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Agente</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Modelo IA</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tokens / ejecución</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Coste aprox.</th>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">100 usos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ejemplosUso.map((e, i) => (
                                                <tr key={i} className="border-b border-slate-800/50 hover:bg-[#136dec]/5 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="font-medium text-white text-sm">{e.agente}</div>
                                                        <div className="text-xs text-slate-500 mt-0.5 md:hidden">{e.modelo}</div>
                                                        <div className="text-xs text-slate-500 leading-relaxed mt-1">{e.descripcion}</div>
                                                    </td>
                                                    <td className="py-4 px-4 hidden md:table-cell">
                                                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-lg">{e.modelo}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm font-semibold text-[#136dec]">{e.precioEjec} tokens</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm text-slate-300">{e.costeToken}</span>
                                                    </td>
                                                    <td className="py-4 px-4 hidden md:table-cell">
                                                        <span className="text-sm text-slate-300">{e.usos100}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 text-center">
                                    * Los precios son orientativos. Cada desarrollador fija el precio de su agente.
                                    Siempre verás el coste exacto antes de ejecutar.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── TAB DESARROLLADORES ── */}
                    {tabActivo === "desarrollador" && (
                        <div className="space-y-12">
                            {/* Cómo fijar precios */}
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2 text-center">
                                    Tú decides cuánto vale tu agente
                                </h2>
                                <p className="text-slate-400 text-center mb-8 text-sm">
                                    Somos un marketplace libre: el desarrollador fija el precio.
                                    Nosotros te damos las herramientas para que lo hagas bien.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    {[
                                        {
                                            paso: "1",
                                            titulo: "Calcula el coste del modelo",
                                            texto: "El primer factor es cuánto le cuesta a ti ejecutar el agente. GPT-4o cuesta más que GPT-4o mini. Claude Opus más que Haiku. Ese es tu coste base por ejecución.",
                                            icono: "fa-solid fa-calculator",
                                        },
                                        {
                                            paso: "2",
                                            titulo: "Añade tu margen de beneficio",
                                            texto: "Sobre el coste base, añades el margen que consideras justo por el valor que aporta tu agente. Un agente bien entrenado puede cobrar 3-10× el coste del modelo y seguir siendo competitivo.",
                                            icono: "fa-solid fa-chart-line",
                                        },
                                        {
                                            paso: "3",
                                            titulo: "AgentHub aplica su comisión",
                                            texto: "De cada transacción, AgentHub retiene un 20 % para mantener la plataforma. El 80 % restante es tuyo. Sin cuotas mensuales, sin costes fijos: solo pagas cuando vendes.",
                                            icono: "fa-solid fa-hand-holding-dollar",
                                        },
                                    ].map((item, i) => (
                                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-7">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="size-10 rounded-xl bg-[#136dec]/10 flex items-center justify-center">
                                                    <i className={`${item.icono} text-[#136dec]`}></i>
                                                </div>
                                                <span className="text-xs font-bold text-[#136dec] tracking-widest">PASO {item.paso}</span>
                                            </div>
                                            <h3 className="font-semibold text-white mb-3">{item.titulo}</h3>
                                            <p className="text-sm text-slate-400 leading-relaxed">{item.texto}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ejemplo con números reales */}
                            <div className="bg-[#101822] border border-slate-800 rounded-2xl p-8">
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                                    <i className="fa-solid fa-flask text-[#136dec]"></i>
                                    Ejemplo real: Agente de análisis de contratos
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Columna cálculo */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-slate-300 mb-4">Cómo calcular el precio</h4>
                                        {[
                                            { label: "Modelo usado", valor: "GPT-4o (128k contexto)", neutro: true },
                                            { label: "Tokens de entrada (contrato)", valor: "≈ 40.000 tokens" },
                                            { label: "Tokens de salida (resumen)", valor: "≈ 2.000 tokens" },
                                            { label: "Coste real del modelo", valor: "≈ 0,42 €", destacado: true },
                                            { label: "Margen del desarrollador (×3)", valor: "+ 0,84 €" },
                                            { label: "Precio al cliente", valor: "≈ 1,26 € (140 tokens)", destacado: true },
                                            { label: "Comisión AgentHub (20 %)", valor: "- 0,25 €", resta: true },
                                            { label: "Ganas tú por ejecución", valor: "≈ 1,01 €", ganancia: true },
                                        ].map((fila, i) => (
                                            <div key={i} className={`flex justify-between items-center py-2 border-b border-slate-800/50 ${fila.ganancia ? "border-emerald-500/30" : ""}`}>
                                                <span className="text-sm text-slate-400">{fila.label}</span>
                                                <span className={`text-sm font-semibold ${fila.ganancia ? "text-emerald-400 text-base" : fila.resta ? "text-red-400" : fila.destacado ? "text-white" : "text-slate-300"}`}>
                                                    {fila.valor}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Columna proyección */}
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold text-slate-300 mb-4">Proyección de ingresos</h4>
                                        {[
                                            { usos: "100 ejecuciones / mes", ingreso: "101 €/mes" },
                                            { usos: "500 ejecuciones / mes", ingreso: "505 €/mes" },
                                            { usos: "2.000 ejecuciones / mes", ingreso: "2.020 €/mes" },
                                            { usos: "10.000 ejecuciones / mes", ingreso: "10.100 €/mes" },
                                        ].map((row, i) => (
                                            <div key={i} className="flex justify-between items-center bg-[#0b1119] rounded-xl px-5 py-4">
                                                <span className="text-sm text-slate-400">{row.usos}</span>
                                                <span className="text-sm font-bold text-emerald-400">{row.ingreso}</span>
                                            </div>
                                        ))}
                                        <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                                            Sin costes fijos de la plataforma. Cada ejecución genera ingresos directos.
                                            Cuanto mejor sea tu agente, más ejecuciones tendrás.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Consejos de pricing */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-6 text-center">
                                    Consejos para fijar un buen precio
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            icono: "fa-solid fa-eye",
                                            titulo: "Revisa la competencia",
                                            texto: "Antes de publicar, busca agentes similares en el marketplace. Posicionarte en el rango medio suele convertir mejor que ir muy alto o muy bajo.",
                                        },
                                        {
                                            icono: "fa-solid fa-trophy",
                                            titulo: "El valor > el coste",
                                            texto: "Un agente que ahorra 2 horas de trabajo puede cobrar mucho más que su coste de modelo. Piensa en el valor que entrega al usuario, no solo en el coste técnico.",
                                        },
                                        {
                                            icono: "fa-solid fa-sliders",
                                            titulo: "Puedes cambiar el precio",
                                            texto: "El precio no es fijo. Empieza más bajo para conseguir primeras reseñas y subirlo a medida que tu agente gane reputación.",
                                        },
                                        {
                                            icono: "fa-solid fa-flask",
                                            titulo: "Activa la demo gratuita",
                                            texto: "Los agentes con demo gratis convierten 3× más. Los primeros 3 mensajes gratuitos casi no cuestan, pero generan la confianza que cierra la venta.",
                                        },
                                    ].map((tip, i) => (
                                        <div key={i} className="flex items-start gap-4 bg-[#101822] border border-slate-800 rounded-2xl p-6">
                                            <div className="size-10 rounded-xl bg-[#136dec]/10 flex items-center justify-center shrink-0">
                                                <i className={`${tip.icono} text-[#136dec]`}></i>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white text-sm mb-1">{tip.titulo}</h4>
                                                <p className="text-xs text-slate-400 leading-relaxed">{tip.texto}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA final ── */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto text-center bg-[#101822] border border-slate-800 rounded-2xl p-12">
                    <h2 className="text-2xl font-bold mb-4">
                        {tabActivo === "cliente"
                            ? "Empieza con tokens gratis al registrarte"
                            : "Publica tu agente hoy, gratis"}
                    </h2>
                    <p className="text-slate-400 mb-8">
                        {tabActivo === "cliente"
                            ? "Crea tu cuenta y recibe tokens de bienvenida para probar los agentes del marketplace sin coste."
                            : "Sin cuotas de acceso. Sin costes fijos. Solo pagas la comisión cuando vendes."}
                    </p>
                    <Link
                        to="/crear_usuario"
                        className="inline-block px-8 py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold transition-all shadow-lg shadow-[#136dec]/30 hover:shadow-[#136dec]/50 active:scale-95"
                    >
                        Crear cuenta gratis
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
