import React from "react";
import { Link } from "react-router-dom";
import agentImage from "../assets/imagen_agent.png";
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
//home pagina de inicio de la web
export default function Home() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* TopNavBar */}
            <TopNavbar />

            {/* Hero Section */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-5xl">
                    {/* Imagen hero */}
                    <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl h-64 md:h-96 lg:h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101822]/40 to-[#101822]/80" />
                        <img
                            src={agentImage}
                            alt="Agente de IA"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 dark:text-white">
                        AgentHub
                    </h1>

                    <p className="text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Tu marketplace de agentes de IA
                        <br />
                        Automatiza flujos complejos • Enterprise-grade • Seguro y rápido
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <Link
                            to="/login"
                            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-[#136dec] hover:bg-blue-600 text-white rounded-xl transition-all shadow-xl shadow-[#136dec]/30"
                        >
                            Iniciar Sesión

                        </Link>

                        <Link
                            to="/marketplace"
                            className="inline-flex items-center px-8 py-4 text-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                        >
                            Ver agentes destacados
                        </Link>
                    </div>

                    {/* Features */}
                    <div
                        id="destacados"
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
                    >
                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-white/5 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[#136dec] text-4xl mb-4">
                                verified_user
                            </span>
                            <h4 className="font-bold text-lg mb-2">Seguridad Enterprise</h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                SOC2 · Cifrado E2E · Control de acceso granular
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-white/5 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[#136dec] text-4xl mb-4">
                                bolt
                            </span>
                            <h4 className="font-bold text-lg mb-2">Despliegue en minutos</h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                API simple · SDKs · Integraciones nativas
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-white/5 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[#136dec] text-4xl mb-4">
                                hub
                            </span>
                            <h4 className="font-bold text-lg mb-2">Marketplace vivo</h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                +200 agentes · Actualizaciones diarias · Comunidad activa
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}