import React from "react";
import ClienteNavbar from "../../components/ClienteNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

export default function ClienteMisAgentes() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex flex-col">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mis Agentes</h1>
                    <p className="text-slate-500 dark:text-slate-400">Aquí aparecerán los agentes de IA a los que te hayas suscrito o hayas adquirido.</p>
                </div>

                <div className="flex-1 bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center p-12">
                    <div className="text-6xl text-slate-300 dark:text-slate-600 mb-6">
                        <i className="fa-solid fa-box-open"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Aún no tienes agentes</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-8">
                        No has añadido ningún agente a tu espacio de trabajo. Explora el marketplace para encontrar la inteligencia artificial ideal para ti.
                    </p>
                    <Link to="/cliente" className="px-6 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-[#136dec]/30 transition-all">
                        Explorar Agentes
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
