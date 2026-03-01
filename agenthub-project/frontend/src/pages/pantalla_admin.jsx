/*
Pantalla del admin donde navegara y vera las peticiones de los desarrolladores de dar de alta y tendra acceso a todo 
*/
import React from "react";
import { Link } from "react-router-dom";

export default function AdminScreen() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* Header minimal */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="text-lg font-bold tracking-tight">
                        AgentHub
                    </Link>

                    <Link
                        to="/"
                        className="px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        Volver
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-xl bg-white dark:bg-[#1a2230] p-7 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            ESTA ES LA PANTALLA DEL ADMIN
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            visión a futuras implementaciones
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800">
                © 2026 AgentHub Inc. · Todos los derechos reservados
            </footer>
        </div>
    );
}