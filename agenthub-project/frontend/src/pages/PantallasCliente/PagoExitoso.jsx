import React from "react";
import { useNavigate } from "react-router-dom";
import ClienteNavbar from "../../components/ClienteNavbar";
import Footer from "../../components/Footer";

export default function PagoExitoso() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="size-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                    <i className="fa-solid fa-check text-3xl text-emerald-500"></i>
                </div>
                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
                    ¡Pago completado!
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-md">
                    Tu agente ya está disponible en "Mis Agentes". Puedes empezar a usarlo ahora mismo.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/cliente/mis-agentes")}
                        className="px-6 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                    >
                        Ver mis agentes
                    </button>
                    <button
                        onClick={() => navigate("/cliente")}
                        className="px-6 py-3 bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Seguir explorando
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
