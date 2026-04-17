import React, { useState } from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const faqs = [
    {
        pregunta: "¿Cómo compro tokens?",
        respuesta:
            "Ve a tu panel de usuario, sección 'Tokens'. Elige el pack que mejor se adapte a tu volumen de uso y paga con tarjeta. Los tokens aparecen en tu cuenta al instante.",
    },
    {
        pregunta: "Un agente no me ha dado los resultados prometidos. ¿Qué hago?",
        respuesta:
            "Tienes 24 horas desde la primera ejecución para solicitar un reembolso completo de tokens. Usa el botón 'Reportar problema' en el chat del agente o escríbenos a soporte@agenthub.io con el ID de la transacción.",
    },
    {
        pregunta: "¿Por qué mi agente está en revisión y cuánto tardará?",
        respuesta:
            "Revisamos cada agente antes de publicarlo para garantizar calidad y seguridad. El proceso tarda entre 24 y 48 horas laborables. Si hay algún problema, te notificamos por email con los detalles.",
    },
    {
        pregunta: "¿Puedo cambiar el precio de mi agente después de publicarlo?",
        respuesta:
            "Sí, puedes modificarlo en cualquier momento desde tu panel de desarrollador → Mis Agentes → Editar. El nuevo precio aplica a partir del siguiente uso. Las transacciones ya realizadas no se ven afectadas.",
    },
    {
        pregunta: "¿Cómo retiro mis ganancias como desarrollador?",
        respuesta:
            "Las ganancias se acumulan en tu balance. Puedes solicitar una transferencia mensual desde tu panel de finanzas. El mínimo de retiro es 20 € y el proceso tarda 3-5 días hábiles.",
    },
    {
        pregunta: "¿Mis conversaciones con los agentes son privadas?",
        respuesta:
            "Sí. Las conversaciones están cifradas y no se comparten con los desarrolladores de los agentes. Tampoco se usan para entrenar modelos de IA. Solo el equipo de AgentHub puede acceder a ellas en caso de disputa.",
    },
];

const categorias = [
    { icono: "fa-solid fa-credit-card", titulo: "Pagos y tokens", descripcion: "Recargas, reembolsos, facturas y métodos de pago." },
    { icono: "fa-solid fa-robot", titulo: "Agentes y marketplace", descripcion: "Uso, compra y problemas con agentes específicos." },
    { icono: "fa-solid fa-code", titulo: "Para desarrolladores", descripcion: "Publicación, revisión, API y cobro de ganancias." },
    { icono: "fa-solid fa-user-shield", titulo: "Cuenta y seguridad", descripcion: "Acceso, contraseña, datos personales y privacidad." },
];

export default function Soporte() {
    const [faqAbierta, setFaqAbierta] = useState(null);
    const [form, setForm] = useState({ email: "", asunto: "", mensaje: "" });
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Soporte
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        ¿En qué podemos{" "}
                        <span className="text-[#136dec]">ayudarte?</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Encuentra respuestas en las FAQs o escríbenos directamente.
                        Respondemos en menos de 24 horas en días laborables.
                    </p>
                </div>
            </section>

            {/* Categorías */}
            <section className="pb-16 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categorias.map((cat, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-5 text-center hover:border-[#136dec]/40 transition-colors cursor-pointer group">
                            <div className="size-10 rounded-xl bg-[#136dec]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#136dec]/20 transition-colors">
                                <i className={`${cat.icono} text-[#136dec]`}></i>
                            </div>
                            <h3 className="font-semibold text-white text-sm mb-1">{cat.titulo}</h3>
                            <p className="text-xs text-slate-500 leading-snug">{cat.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-3 text-center">Preguntas frecuentes</h2>
                    <p className="text-slate-400 text-center mb-10 text-sm">Las dudas más habituales, resueltas al momento.</p>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl overflow-hidden">
                                <button
                                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#136dec]/5 transition-colors"
                                    onClick={() => setFaqAbierta(faqAbierta === i ? null : i)}
                                >
                                    <span className="font-medium text-white text-sm pr-4">{faq.pregunta}</span>
                                    <i className={`fa-solid fa-chevron-down text-slate-400 shrink-0 transition-transform duration-300 ${faqAbierta === i ? "rotate-180" : ""}`}></i>
                                </button>
                                {faqAbierta === i && (
                                    <div className="px-6 pb-5">
                                        <p className="text-sm text-slate-400 leading-relaxed">{faq.respuesta}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Formulario de contacto */}
            <section className="pb-24 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-[#101822] border border-slate-800 rounded-2xl p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-11 rounded-xl bg-[#136dec]/10 flex items-center justify-center">
                                <i className="fa-solid fa-paper-plane text-[#136dec]"></i>
                            </div>
                            <div>
                                <h2 className="font-bold text-white">¿No encuentras tu respuesta?</h2>
                                <p className="text-xs text-slate-400">Escríbenos y te respondemos en menos de 24 h</p>
                            </div>
                        </div>

                        {enviado ? (
                            <div className="text-center py-8">
                                <i className="fa-solid fa-circle-check text-emerald-400 text-4xl mb-4"></i>
                                <h3 className="font-semibold text-white mb-2">Mensaje enviado</h3>
                                <p className="text-sm text-slate-400">Te responderemos en breve en el email indicado.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        placeholder="tu@empresa.com"
                                        className="w-full bg-[#0b1119] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#136dec]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Asunto</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.asunto}
                                        onChange={e => setForm({ ...form, asunto: e.target.value })}
                                        placeholder="Describe brevemente tu problema"
                                        className="w-full bg-[#0b1119] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#136dec]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Mensaje</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={form.mensaje}
                                        onChange={e => setForm({ ...form, mensaje: e.target.value })}
                                        placeholder="Cuéntanos con detalle qué ha pasado..."
                                        className="w-full bg-[#0b1119] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#136dec] resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-[#136dec] hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-[#136dec]/30 active:scale-95"
                                >
                                    Enviar mensaje
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
