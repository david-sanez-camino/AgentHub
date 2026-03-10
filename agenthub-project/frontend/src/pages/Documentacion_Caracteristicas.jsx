import React from "react";
import DesarrolladorNavbar from "../components/DesarrolladorNavbar";
import Footer from "../components/Footer";

export default function DocumentacionCaracteristicas() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Estándares y Buenas Prácticas para Agentes IA</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
                        En AgentHub nos tomamos muy en serio la calidad, seguridad y ética de la Inteligencia Artificial. Conoce nuestras bases legales e integrarlas en tus desarrollos.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Sección 1 */}
                    <section className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl text-purple-500 dark:text-purple-400">
                            <i className="fa-solid fa-scale-balanced"></i>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 relative z-10">Bases Legales y Compliance</h2>
                        <div className="text-slate-600 dark:text-slate-300 space-y-4 relative z-10 leading-relaxed">
                            <p><strong>Cumplimiento Normativo (AI Act):</strong> Todos los agentes publicados en AgentHub deben adherirse a los principios de transparencia de la Ley de Inteligencia Artificial de la UE. Deberás tipificar el nivel de riesgo de tu agente.</p>
                            <p><strong>Privacidad desde el Diseño (GDPR):</strong> Garantizamos que los prompts y los datos de usuarios no se utilicen para reentrenar modelos sin consentimiento explícito. Los agentes que soliciten PII (Información Personal Identificable) deben incluir la bandera de "Manejo de Datos Sensibles".</p>
                            <p><strong>Propiedad Intelectual:</strong> Al publicar, certificas que los System Prompts no infringen copyright de terceros. AgentHub no reclama la propiedad de tu agente, solo la licencia de distribución en nuestra plataforma.</p>
                        </div>
                    </section>

                    {/* Sección 2 */}
                    <section className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl text-blue-500 dark:text-blue-400">
                            <i className="fa-solid fa-code"></i>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 relative z-10">Arquitectura del System Prompt</h2>
                        <div className="text-slate-600 dark:text-slate-300 space-y-4 relative z-10 leading-relaxed">
                            <p>Un agente exitoso depende de su instrucción principal (System Prompt). Sigue los estándares de la industria:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Definición de Rol Clara:</strong> Inicia el prompt estableciendo de manera inequívoca la identidad y la tarea fundamental del Agente.</li>
                                <li><strong>Limitación del Scope (Guardrails):</strong> Instruye al Agente para que se niegue a responder preguntas fuera de su área de conocimiento o a ejecutar acciones destructivas.</li>
                                <li><strong>Inyección de Contexto Estático:</strong> Si tu agente utiliza RAG (Retrieval-Augmented Generation), especifica claramente la jerarquía entre el conocimiento preentrenado y el conocimiento inyectado.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Sección 3 */}
                    <section className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl text-emerald-500 dark:text-emerald-400">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400 relative z-10">Seguridad y Prevención de Abusos</h2>
                        <div className="text-slate-600 dark:text-slate-300 space-y-4 relative z-10 leading-relaxed">
                            <p><strong>Defensa contra Prompt Injection:</strong> Utiliza delimitadores como triple comilla (`"""`) o bloques XML (`{"<input>"}`) para separar las instrucciones del desarrollador de las entradas del usuario final. AgentHub auditará tus agentes contra ataques de inyección básicos.</p>
                            <p><strong>Uso de Herramientas (Function Calling):</strong> Si tu agente ejecuta código o llama a APIs (ej. enviar emails o buscar en internet), debe solicitar siempre la confirmación del usuario para acciones que muten estado.</p>
                            <p><strong>Alucinaciones (Hallucinations):</strong> Aplica configuraciones bajas de <em>Temperature</em> (ej. 0.1 - 0.3) si el caso de uso requiere precisión analítica, reservando valores altos (ej. 0.7 - 1.0) solo para agentes creativos o ideadores.</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
