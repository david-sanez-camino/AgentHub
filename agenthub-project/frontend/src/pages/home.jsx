import React from "react";


export default function Home() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* TopNavBar */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-[#136dec] rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined">smart_toy</span>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">AgentHub</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/*
            Nota: sustituye href por <Link to="/login"> si usas react-router.
            */}
                        <a
                            href="/inicioSesion"
                            className="px-5 py-2 text-sm font-semibold rounded-lg bg-[#136dec] hover:bg-blue-600 text-white transition-all shadow-md shadow-[#136dec]/30"
                        >
                            Iniciar Sesión
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-5xl">
                    {/* Imagen hero */}
                    <div className="relative mb-10 rounded-3xl overflow-hidden shadow-2xl h-64 md:h-96 lg:h-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101822]/40 to-[#101822]/80" />
                        <img
                            src="https://thumbs.dreamstime.com/b/vivid-electric-blue-purple-neural-network-visualizing-complex-brain-connections-sci-fi-digital-artwork-infrastructure-377839614.jpg"
                            alt="Red neuronal abstracta digital azul y púrpura"
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
                        <a
                            href="/inicioSesion"
                            className="inline-flex items-center px-8 py-4 text-lg font-bold bg-[#136dec] hover:bg-blue-600 text-white rounded-xl transition-all shadow-xl shadow-[#136dec]/30"
                        >
                            Iniciar Sesión
                            <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                        </a>

                        <a
                            href="#destacados"
                            className="inline-flex items-center px-8 py-4 text-lg font-semibold border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                        >
                            Ver agentes destacados
                        </a>
                    </div>

        )
}