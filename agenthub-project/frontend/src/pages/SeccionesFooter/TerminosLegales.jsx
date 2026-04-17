import React from "react";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";

const secciones = [
    {
        titulo: "1. Aceptación de los términos",
        contenido: `Al registrarte en AgentHub y usar la plataforma, aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo con alguna parte, no debes usar la plataforma. AgentHub se reserva el derecho de modificar estos términos con previo aviso de 15 días por email.`,
    },
    {
        titulo: "2. Descripción del servicio",
        contenido: `AgentHub es un marketplace que conecta a desarrolladores de agentes de inteligencia artificial con empresas y usuarios que necesitan esos agentes para automatizar tareas. AgentHub actúa como intermediario: facilita la plataforma, el sistema de pagos y la distribución, pero no es responsable del comportamiento o los resultados de los agentes publicados por terceros.`,
    },
    {
        titulo: "3. Cuentas de usuario",
        contenido: `Para usar la plataforma debes tener al menos 18 años y crear una cuenta con información veraz y actualizada. Eres responsable de mantener la seguridad de tus credenciales. AgentHub no es responsable de accesos no autorizados derivados de la negligencia del usuario en la custodia de su contraseña.`,
    },
    {
        titulo: "4. Sistema de tokens y pagos",
        contenido: `Los tokens son la unidad de intercambio de la plataforma. Su compra es definitiva y no reembolsable excepto en los casos descritos en la Política de Reembolsos. Los precios en tokens los fijan los desarrolladores y pueden cambiar con preaviso. AgentHub aplica una comisión del 20 % sobre cada transacción entre desarrollador y cliente. Los pagos se procesan de forma segura a través de Stripe.`,
    },
    {
        titulo: "5. Obligaciones del desarrollador",
        contenido: `Al publicar un agente en AgentHub, el desarrollador garantiza que: (a) el agente hace lo que su descripción indica, (b) tiene los derechos necesarios sobre los modelos y datos utilizados, (c) el agente no infringe derechos de terceros, (d) el agente no genera contenido ilegal, dañino o discriminatorio. El incumplimiento puede resultar en la eliminación del agente y la suspensión de la cuenta sin reembolso de ganancias pendientes.`,
    },
    {
        titulo: "6. Política de reembolsos",
        contenido: `Los clientes pueden solicitar el reembolso completo de tokens dentro de las 24 horas siguientes a la primera ejecución si el agente no cumple con su descripción publicada. Las solicitudes deben realizarse a través del sistema de soporte con el ID de transacción. AgentHub resolverá cada caso en un plazo máximo de 5 días hábiles.`,
    },
    {
        titulo: "7. Propiedad intelectual",
        contenido: `El desarrollador conserva todos los derechos sobre sus agentes. Al publicar en AgentHub, otorga una licencia no exclusiva para mostrar, describir y distribuir el agente a través de la plataforma. Los clientes adquieren el derecho de uso del agente, no su propiedad ni el acceso a su código o configuración subyacente.`,
    },
    {
        titulo: "8. Limitación de responsabilidad",
        contenido: `AgentHub no garantiza que los agentes del marketplace sean precisos, completos o adecuados para un uso específico. En ningún caso AgentHub será responsable por daños indirectos, pérdida de beneficios o pérdida de datos derivados del uso de la plataforma o de los agentes publicados en ella. La responsabilidad máxima de AgentHub se limita al importe pagado por el usuario en los últimos 30 días.`,
    },
    {
        titulo: "9. Ley aplicable y jurisdicción",
        contenido: `Estos términos se rigen por la legislación española. Para cualquier disputa derivada del uso de la plataforma, las partes se someten a los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.`,
    },
];

export default function TerminosLegales() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0b1119] text-white">
            <TopNavbar />

            {/* Hero */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase rounded-full bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20">
                        Legal
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Términos y{" "}
                        <span className="text-[#136dec]">Condiciones</span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Última actualización: 1 de abril de 2026. Estos términos regulan el uso
                        de la plataforma AgentHub tanto para desarrolladores como para clientes.
                    </p>
                </div>
            </section>

            {/* Índice */}
            <section className="pb-12 px-6">
                <div className="max-w-3xl mx-auto bg-[#101822] border border-slate-800 rounded-2xl p-6">
                    <h2 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-list text-[#136dec]"></i>
                        Índice de secciones
                    </h2>
                    <ol className="space-y-1.5">
                        {secciones.map((sec, i) => (
                            <li key={i} className="text-sm text-slate-400 hover:text-[#136dec] transition-colors cursor-pointer">
                                {sec.titulo}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Contenido */}
            <section className="pb-24 px-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {secciones.map((sec, i) => (
                        <div key={i} className="bg-[#101822] border border-slate-800 rounded-2xl p-7">
                            <h2 className="font-bold text-white mb-4">{sec.titulo}</h2>
                            <p className="text-sm text-slate-400 leading-relaxed">{sec.contenido}</p>
                        </div>
                    ))}
                    <p className="text-xs text-slate-500 text-center pt-4">
                        Para consultas legales escríbenos a{" "}
                        <a href="mailto:legal@agenthub.io" className="text-[#136dec] hover:underline">
                            legal@agenthub.io
                        </a>
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
