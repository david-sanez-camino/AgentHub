import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClienteNavbar from "../components/ClienteNavbar";
import Footer from "../components/Footer";
import { obtenerAgentesAprobados } from "../services/conexion_api";

export default function ClientePagina() {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState("");
    const [agentes, setAgentes] = useState([]);
    const [agentesFiltered, setAgentesFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerAgentesAprobados()
            .then(data => {
                setAgentes(data);
                setAgentesFiltered(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar los agentes.");
                setLoading(false);
            });
    }, []);

    const handleBuscar = (e) => {
        e.preventDefault();
        const filtrados = agentes.filter(a =>
            a.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
            a.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
            a.categoria?.toLowerCase().includes(busqueda.toLowerCase())
        );
        setAgentesFiltered(filtrados);
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col items-center text-center">
                <div className="max-w-3xl w-full mb-12">
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white leading-tight">
                        Encuentra el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#136dec] to-cyan-400">Agente IA</span> perfecto para tu negocio
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 mb-10">
                        Explora nuestro marketplace y automatiza tus tareas hoy mismo.
                    </p>
                    <form onSubmit={handleBuscar} className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#136dec] transition-colors">
                            <i className="fa-solid fa-magnifying-glass text-xl"></i>
                        </div>
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="block w-full pl-12 pr-32 py-5 bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-800 rounded-2xl text-lg shadow-lg focus:ring-4 focus:ring-[#136dec]/20 focus:border-[#136dec] outline-none transition-all placeholder:text-slate-400"
                            placeholder="Ej. Agente para responder correos..."
                        />
                        <button
                            type="submit"
                            className="absolute right-2.5 bottom-2.5 top-2.5 px-6 font-bold text-white bg-[#136dec] hover:bg-blue-600 rounded-xl transition-colors shadow-md shadow-[#136dec]/30"
                        >
                            Buscar
                        </button>
                    </form>
                </div>

                {loading && (
                    <p className="text-slate-500 dark:text-slate-400">Cargando agentes...</p>
                )}
                {error && (
                    <p className="text-red-500">{error}</p>
                )}
                {!loading && !error && agentesFiltered.length === 0 && (
                    <div className="p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400">
                        No se encontraron agentes disponibles.
                    </div>
                )}
                {!loading && !error && agentesFiltered.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {agentesFiltered.map(agente => (
                            <div
                                key={agente.id}
                                className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#136dec] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                                        {agente.categoria || "General"}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {agente.precio != null ? `${agente.precio}€` : "Gratis"}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {agente.nombre}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                                    {agente.descripcion}
                                </p>
                                {/* Botón de compra: redirige al checkout de Stripe */}
                                <button
                                    onClick={() => navigate(`/cliente/pagar/${agente.id}`)}
                                    className="w-full py-2.5 bg-[#136dec] hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors"
                                >
                                    {agente.precio ? `Comprar — $${agente.precio}` : "Obtener gratis"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}