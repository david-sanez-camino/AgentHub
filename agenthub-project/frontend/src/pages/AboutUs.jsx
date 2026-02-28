import React from "react";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <TopNavbar />

            <main className="flex-1 flex flex-col items-center p-6 mt-10">
                <div className="max-w-4xl w-full">
                    {/* Header */}
                    <div className="text-center mb-16 px-4">
                        <div className="inline-block bg-[#136dec]/10 text-[#136dec] dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide mb-6 border border-[#136dec]/20">
                            Nuestra Misión
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
                            Democratizando la Inteligencia Artificial
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
                            Creemos que el poder de los agentes impulsados por IA no debería ser exclusivo de las empresas tecnológicas gigantes.
                            En <span className="text-[#136dec] font-bold">AgentHub</span>, construimos el puente entre la tecnología más avanzada y las empresas de todos los tamaños.
                        </p>
                    </div>

                    {/* Story / Vision */}
                    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#136dec] text-3xl">lightbulb</span>
                            El origen de AgentHub
                        </h2>
                        <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                            <p>
                                Nació de una frustración compartida: implementar soluciones de IA reales y funcionales en entornos corporativos
                                solía requerir meses de desarrollo, contrataciones costosas y un mantenimiento complejo. Los LLMs avanzaban rápido,
                                pero la adopción empresarial se quedaba atrás.
                            </p>
                            <p>
                                Por eso creamos un <b>Marketplace unificado</b>. Un espacio donde descubrir, desplegar y escalar agentes
                                de inteligencia artificial específicos para cada tarea —desde soporte técnico automatizado hasta análisis de
                                contratos legales— es tan sencillo como hacer unos clics, pero con la <b>seguridad y robustez <i>Enterprise</i></b>
                                que tu empresa necesita.
                            </p>
                        </div>
                    </div>

                    {/* Core Values grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="size-14 bg-gradient-to-br from-[#136dec] to-blue-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#136dec]/30">
                                <span className="material-symbols-outlined text-[32px]">public</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Accesibilidad radical</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Eliminamos la barrera de entrada técnica. Cualquier equipo puede operar agentes complejos sin saber programar, gracias a integraciones nativas con herramientas existentes.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="size-14 bg-gradient-to-br from-[#136dec] to-blue-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#136dec]/30">
                                <span className="material-symbols-outlined text-[32px]">shield_lock</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Seguridad por diseño</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                La descentralización de la IA trae retos. Nuestros agentes corren en entornos aislados (sandboxed), garantizando cifrado de extremo a extremo y control granular sobre tus datos.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="size-14 bg-gradient-to-br from-[#136dec] to-blue-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#136dec]/30">
                                <span className="material-symbols-outlined text-[32px]">extension</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Marketplace Abierto</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Apoyamos tanto a grandes corporaciones como a desarrolladores independientes, permitiendo que desplieguen y moneticen sus mejores agentes dentro de nuestro ecosistema.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                            <div className="size-14 bg-gradient-to-br from-[#136dec] to-blue-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#136dec]/30">
                                <span className="material-symbols-outlined text-[32px]">group</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">El Equipo</h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Somos ingenieros, diseñadores e investigadores enamorados del potencial de la automatización. Unidos para acelerar la productividad humana a niveles sin precedentes.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-10 mb-20">
                        <h2 className="text-3xl font-bold mb-6">¿Listo para el futuro del trabajo?</h2>
                        <Link
                            to="/crear_usuario"
                            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold bg-[#136dec] hover:bg-blue-600 text-white rounded-xl transition-all shadow-xl shadow-[#136dec]/30 hover:shadow-[#136dec]/50 hover:-translate-y-1"
                        >
                            <span className="material-symbols-outlined">rocket_launch</span>
                            Comenzar a automatizar
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
