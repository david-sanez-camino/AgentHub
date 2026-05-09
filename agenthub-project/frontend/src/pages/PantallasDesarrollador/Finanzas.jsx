import React, { useState, useEffect } from "react";
import DesarrolladorNavbar from "../../components/DesarrolladorNavbar";
import Footer from "../../components/Footer";
import { obtenerMisMetricas } from "../../services/conexion_api";
import { getToken } from "../../services/auth";

export default function Finanzas() {
    const [metricas, setMetricas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = getToken();
        obtenerMisMetricas(token)
            .then(data => {
                setMetricas(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || "Error al cargar las métricas");
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rendimiento y Finanzas</h1>
                        <p className="text-slate-500 dark:text-slate-400">Analiza el impacto de tus agentes en el marketplace.</p>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-16 text-slate-500">
                        <i className="fa-solid fa-spinner fa-spin text-3xl mb-3 text-purple-500"></i>
                        <p>Cargando métricas...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 mb-6">
                        {error}
                    </div>
                )}

                {metricas && (
                    <>
                        {/* KPIs Generales */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-500 dark:text-slate-400">Ingresos Totales</h3>
                                    <div className="size-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-dollar-sign"></i>
                                    </div>
                                </div>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">${metricas.totalIngresos.toLocaleString()}</p>
                                <p className="text-sm text-slate-500 mt-2">USD acumulado</p>
                            </div>

                            <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-500 dark:text-slate-400">Ventas Totales</h3>
                                    <div className="size-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-cart-arrow-down"></i>
                                    </div>
                                </div>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">{metricas.totalVentas.toLocaleString()}</p>
                                <p className="text-sm text-slate-500 mt-2">compras completadas</p>
                            </div>

                            <div className="bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-slate-500 dark:text-slate-400">Agentes Publicados</h3>
                                    <div className="size-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                        <i className="fa-solid fa-robot"></i>
                                    </div>
                                </div>
                                <p className="text-4xl font-black text-slate-900 dark:text-white">{metricas.totalAgentes}</p>
                                <p className="text-sm text-slate-500 mt-2">en tu catálogo</p>
                            </div>
                        </div>

                        {/* Tabla Desglose por Agente */}
                        <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                                <h2 className="text-xl font-bold">Rendimiento por Agente</h2>
                            </div>
                            {metricas.agentes.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    <i className="fa-solid fa-chart-bar text-3xl mb-3 text-slate-300"></i>
                                    <p>Aún no tienes agentes. Sube el primero para ver métricas.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                                            <tr>
                                                <th className="px-6 py-4">Agente</th>
                                                <th className="px-6 py-4">Categoría</th>
                                                <th className="px-6 py-4">Estado</th>
                                                <th className="px-6 py-4">Precio</th>
                                                <th className="px-6 py-4">Ventas</th>
                                                <th className="px-6 py-4 text-right">Ingresos (USD)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                            {metricas.agentes.map((agente) => (
                                                <tr key={agente.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{agente.nombre}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium">{agente.categoria}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                                            agente.estadoVerificacion === "APROBADO"
                                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                                : agente.estadoVerificacion === "RECHAZADO"
                                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                        }`}>
                                                            {agente.estadoVerificacion || "PENDIENTE"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">${agente.precio}</td>
                                                    <td className="px-6 py-4">{agente.ventas}</td>
                                                    <td className="px-6 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                                                        ${agente.ingresos.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
