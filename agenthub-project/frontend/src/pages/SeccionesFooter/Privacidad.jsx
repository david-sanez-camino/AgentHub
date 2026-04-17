import React from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const secciones = [
    {
        titulo: "1. ¿Quién es el responsable del tratamiento?",
        contenido: `AgentHub Inc. es el responsable del tratamiento de los datos personales recogidos a través de la plataforma agenthub.io. Puedes contactar con nosotros en privacidad@agenthub.io para cualquier consulta relativa a tus datos.`,
    },
    {
        titulo: "2. ¿Qué datos recopilamos?",
        contenido: `Recopilamos los datos que nos proporcionas al registrarte (nombre, email, empresa, país), los datos de uso de la plataforma (agentes ejecutados, tokens consumidos, historial de conversaciones) y los datos de facturación necesarios para procesar pagos a través de Stripe. No almacenamos datos de tarjeta de crédito: Stripe se encarga de ello de forma segura.`,
    },
    {
        titulo: "3. ¿Para qué usamos tus datos?",
        contenido: `Usamos tus datos para: (a) prestarte el servicio de la plataforma, (b) gestionar pagos y facturación, (c) enviarte comunicaciones de servicio (cambios, incidencias), (d) enviarte comunicaciones de marketing si has dado tu consentimiento explícito, y (e) mejorar la plataforma mediante análisis agregado y anónimo de uso.`,
    },
    {
        titulo: "4. ¿Compartimos tus datos con terceros?",
        contenido: `No vendemos ni cedemos tus datos a terceros para fines publicitarios. Compartimos datos únicamente con proveedores de servicios necesarios para operar la plataforma (Stripe para pagos, servicios de hosting, herramientas de soporte). Todos estos proveedores están sujetos a acuerdos de confidencialidad y cumplen con el RGPD.`,
    },
    {
        titulo: "5. ¿Qué pasa con las conversaciones con los agentes?",
        contenido: `Las conversaciones que mantienes con los agentes del marketplace son confidenciales. No se comparten con los desarrolladores de dichos agentes. No se usan para entrenar modelos de inteligencia artificial. Solo el equipo de AgentHub puede acceder a ellas en caso de disputa o investigación de fraude, y con tu consentimiento siempre que sea posible.`,
    },
    {
        titulo: "6. ¿Durante cuánto tiempo conservamos tus datos?",
        contenido: `Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, eliminamos tus datos personales en un plazo de 30 días, excepto los datos de facturación que debemos conservar por obligación legal durante 5 años.`,
    },
    {
        titulo: "7. ¿Cuáles son tus derechos?",
        contenido: `Tienes derecho a acceder, rectificar y suprimir tus datos, así como a la portabilidad de los mismos. Puedes ejercer estos derechos en cualquier momento escribiendo a privacidad@agenthub.io. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que tus derechos no han sido respetados.`,
    },
    {
        titulo: "8. Cookies",
        contenido: `Utilizamos cookies estrictamente necesarias para el funcionamiento de la plataforma (sesión, autenticación) y cookies analíticas para entender cómo se usa la plataforma (de forma anónima y agregada). No usamos cookies de publicidad. Puedes gestionar tus preferencias en cualquier momento desde la configuración del banner de cookies.`,
    },
];

export default function Privacidad() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Privacidad
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Política de{" "}
                        <span className="text-[#136dec]">Privacidad</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Última actualización: 1 de abril de 2026. Aquí explicamos de forma clara
                        qué datos recogemos, para qué los usamos y cómo los protegemos.
                    </p>
                </div>
            </section>

            {/* Resumen visual */}
            <section className="pb-16 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icono: "fa-solid fa-lock", titulo: "Cifrado extremo a extremo", texto: "Todas las conversaciones con agentes están cifradas en tránsito y en reposo." },
                        { icono: "fa-solid fa-ban", titulo: "Sin venta de datos", texto: "Nunca vendemos ni cedemos tus datos a terceros para fines publicitarios." },
                        { icono: "fa-solid fa-user-check", titulo: "Tus derechos, siempre", texto: "Puedes acceder, modificar o eliminar tus datos cuando quieras desde tu cuenta." },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-6 flex items-start gap-4">
                            <div className="size-10 rounded-xl bg-[#136dec]/10 flex items-center justify-center shrink-0">
                                <i className={`${item.icono} text-[#136dec]`}></i>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-sm mb-1">{item.titulo}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">{item.texto}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contenido legal */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    {secciones.map((sec, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-7">
                            <h2 className="font-bold text-white mb-4">{sec.titulo}</h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{sec.contenido}</p>
                        </div>
                    ))}
                    <p className="text-xs text-slate-500 text-center pt-4">
                        Para cualquier consulta sobre privacidad escríbenos a{" "}
                        <a href="mailto:privacidad@agenthub.io" className="text-[#136dec] hover:underline">
                            privacidad@agenthub.io
                        </a>
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
