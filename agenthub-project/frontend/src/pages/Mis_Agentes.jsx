import React from "react";
import DesarrolladorNavbar from "../components/DesarrolladorNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { mockAgentes } from "../mocks/info_ejemplo_relleno";

export default function MisAgentes() {
    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mis Agentes Publicados</h1>
                        <p className="text-slate-500 dark:text-slate-400">Gestiona el inventario de tus inteligencias artificiales activas en el marketplace.</p>
                    </div>
                    <Link to="/desarrollador/subir-agente" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2">
                        <i className="fa-solid fa-plus"></i> Crear Nuevo Agente
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockAgentes.map((agente) => (
                        <div key={agente.id} className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-500/50 transition-all flex flex-col">

                            {/* Cabecera Agente */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-inner">
                                        <i className="fa-solid fa-robot"></i>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Publicado</span>
                                </div>
                                <h3 className="text-xl font-bold mb-1 truncate">{agente.nombre}</h3>
                                <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">{agente.categoria}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{agente.descripcion}</p>
                            </div>

                            {/* Info Técnica Básica */}
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/20 flex-1">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Modelo:</span>
                                        <span className="font-semibold">{agente.modelo}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Precio:</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">${agente.precio} USD</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Ventas:</span>
                                        <span className="font-semibold">{agente.descargas}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between gap-3">
                                <button className="flex-1 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                    Editar
                                </button>
                                <button className="flex-1 py-2 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors">
                                    Pausar
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
