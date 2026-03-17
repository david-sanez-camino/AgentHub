import React from "react";
import DesarrolladorNavbar from "../components/DesarrolladorNavbar";
import Footer from "../components/Footer";
import { mockAgentes } from "../mocks/info_ejemplo_relleno";

export default function Finanzas() {
    // Calculamos totales basados en la info mockeada de Juan
    const totalVistas = mockAgentes.reduce((acc, agente) => acc + agente.vistas, 0);
    const totalDescargas = mockAgentes.reduce((acc, agente) => acc + agente.descargas, 0);
    const totalIngresos = mockAgentes.reduce((acc, agente) => acc + agente.ingresosGenerados, 0);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rendimiento y Finanzas</h1>
                        <p className="text-slate-500 dark:text-slate-400">Analiza el impacto de tus agentes en el marketplace.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <i className="fa-solid fa-download"></i> Descargar Reporte (CSV)
                    </button>
                </div>

                {/* KPIs Generales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-500 dark:text-slate-400">Ingresos Totales</h3>
                            <div className="size-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-dollar-sign"></i>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-slate-900 dark:text-white">${totalIngresos.toLocaleString()}</p>
                        <p className="text-sm text-emerald-500 font-medium mt-2 flex items-center gap-1">
                            <i className="fa-solid fa-arrow-trend-up"></i> +12.5% este mes
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-500 dark:text-slate-400">Descargas / Ventas</h3>
                            <div className="size-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-cart-arrow-down"></i>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-slate-900 dark:text-white">{totalDescargas.toLocaleString()}</p>
                        <p className="text-sm text-emerald-500 font-medium mt-2 flex items-center gap-1">
                            <i className="fa-solid fa-arrow-trend-up"></i> +5.2% este mes
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-slate-500 dark:text-slate-400">Visualizaciones Globales</h3>
                            <div className="size-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        </div>
                        <p className="text-4xl font-black text-slate-900 dark:text-white">{totalVistas.toLocaleString()}</p>
                        <p className="text-sm text-red-500 font-medium mt-2 flex items-center gap-1">
                            <i className="fa-solid fa-arrow-trend-down"></i> -1.1% este mes
                        </p>
                    </div>
                </div>

                {/* Tabla Desglose por Agente */}
                <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold">Rendimiento por Agente</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                                <tr>
                                    <th className="px-6 py-4">Agente</th>
                                    <th className="px-6 py-4">Categoría</th>
                                    <th className="px-6 py-4">Precio</th>
                                    <th className="px-6 py-4">Vistas</th>
                                    <th className="px-6 py-4">Descargas</th>
                                    <th className="px-6 py-4 text-right">Ingresos (USD)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {mockAgentes.map((agente) => (
                                    <tr key={agente.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{agente.nombre}</td>
                                        <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">{agente.categoria}</span></td>
                                        <td className="px-6 py-4">${agente.precio}</td>
                                        <td className="px-6 py-4">{agente.vistas.toLocaleString()}</td>
                                        <td className="px-6 py-4">{agente.descargas.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">${agente.ingresosGenerados.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
