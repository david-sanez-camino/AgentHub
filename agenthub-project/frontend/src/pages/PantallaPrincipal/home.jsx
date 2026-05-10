import React from "react";
import { Link } from "react-router-dom";
import agentImage from "../../assets/imagen_agent.png";
import Footer from "../../components/Footer";
import TopNavbar from "../../components/TopNavbar";
import AgentCard from "../../components/AgentCard";

export default function Home() {
    return (
        <div className="bg-gradient-to-b from-[#1a1f2e] via-[#252a3a] to-[#1a1f2e] text-white min-h-screen flex flex-col font-[Inter] overflow-x-hidden">
            <TopNavbar />

            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative">
                {/* Subtle Decorative Elements */}
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] -z-10" />
                <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] -z-10" />

                {/* Hero Section */}
                <section className="py-20 text-center max-w-5xl mx-auto">
                    <div className="inline-block mb-6 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                        <span className="text-sm font-bold text-blue-400 tracking-widest uppercase">
                            🚀 Ecosistema de Agentes IA de Nueva Generación
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
                        La IA que <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            trabaja para ti.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl font-medium text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Encuentra, despliega y escala agentes especializados en un entorno
                        <strong className="text-white"> seguro, profesional y de alto rendimiento.</strong>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/crear_usuario"
                            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-500 shadow-2xl shadow-blue-500/20"
                        >
                            Comienza Ahora
                            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                                arrow_forward
                            </span>
                        </Link>

                        <a
                            href="#agentes"
                            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold border-2 border-white/10 hover:bg-white/5 rounded-2xl transition-all"
                        >
                            Explorar catálogo
                        </a>
                    </div>
                </section>

                {/* Introduction Diagram (Ecosystem Scheme) */}
                <section className="py-20 my-10 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4 tracking-tight text-white">Cómo funciona AgentHub</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                            Conectamos el talento de los desarrolladores con las necesidades de automatización de las empresas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Desktop Connecting Arrows */}
                        <div className="hidden md:block absolute top-12 left-[30%] right-[30%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 -z-10"></div>

                        <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/20 text-center hover:border-blue-500/50 transition-all group shadow-2xl">
                            <div className="size-20 bg-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <span className="material-symbols-outlined text-4xl text-blue-300">code_blocks</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-3 text-white tracking-tight">1. Publicación</h4>
                            <p className="text-gray-200 text-base leading-relaxed">
                                Desarrolladores suben agentes bajo estándares de <strong>Prompt Engineering</strong>.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/20 text-center hover:border-purple-500/50 transition-all group shadow-2xl">
                            <div className="size-20 bg-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <span className="material-symbols-outlined text-4xl text-purple-300">security_update_good</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-3 text-white tracking-tight">2. Auditoría</h4>
                            <p className="text-gray-200 text-base leading-relaxed">
                                Verificamos seguridad, ética y cumplimiento con el <strong>EU AI Act</strong>.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/20 text-center hover:border-cyan-500/50 transition-all group shadow-2xl">
                            <div className="size-20 bg-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                <span className="material-symbols-outlined text-4xl text-cyan-300">auto_awesome</span>
                            </div>
                            <h4 className="text-2xl font-bold mb-3 text-white tracking-tight">3. Ejecución</h4>
                            <p className="text-gray-200 text-base leading-relaxed">
                                Las empresas integran la IA en sus flujos para una <strong>automatización real</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Agent Image Banner (Transparent Overlay) */}
                <section className="py-20">
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] border border-white/5">
                        <img
                            src={agentImage}
                            alt="AI Agent Hub Preview"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-[#1a1f2e]/40 z-10" />
                        <div className="absolute bottom-16 left-16 max-w-xl z-20">
                            <span className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4 block">Potencia Industrial</span>
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Escalabilidad sin límites para tus flujos de IA
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Una plataforma robusta diseñada para manejar cargas de trabajo críticas con total seguridad.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Featured Agents Section */}
                <section id="agentes" className="py-20">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-black mb-4">Agentes destacados</h2>
                            <p className="text-xl text-gray-400">
                                La selección más avanzada de nuestro marketplace.
                            </p>
                        </div>
                        <Link to="/cliente" className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-bold flex items-center transition-all">
                            Ver todo el catálogo <span className="material-symbols-outlined ml-2">east</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <AgentCard
                            name="LegalMind Pro"
                            description="Análisis de contratos y cumplimiento normativo con precisión del 99.9%."
                            icon="gavel"
                            tag="Enterprise"
                        />
                        <AgentCard
                            name="DevBot X"
                            description="Asistente de codificación especializado en microservicios y despliegue continuo."
                            icon="terminal"
                            tag="Top Rated"
                        />
                        <AgentCard
                            name="MarketInsight"
                            description="Análisis predictivo de mercados globales y detección de tendencias en tiempo real."
                            icon="trending_up"
                            tag="New"
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}