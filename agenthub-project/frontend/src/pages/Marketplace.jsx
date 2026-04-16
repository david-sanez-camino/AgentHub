import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { obtenerAgentesAprobados } from "../services/conexion_api";
import { isLoggedIn } from "../services/auth";

export default function Marketplace() {
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

    // Si el usuario no está logueado lo manda al login, si lo está al checkout
    const handleAcceder = (agente) => {
        if (!isLoggedIn()) {
            navigate("/login");
        } else {
            navigate(`/cliente/pagar/${agente.id}`);
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <TopNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col items-center text-center">
                <div className="max-w-3xl w-full mb-12">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight text-slate-900 dark:text-white leading-tight">
                        Marketplace de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#136dec] to-cyan-400">Agentes IA</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 mb-10">
                        Explora todos los agentes disponibles. Inicia sesión para comprar.
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
                            placeholder="Buscar agente por nombre, categoría..."
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
                                className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-left shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#136dec] bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                                        {agente.categoria || "General"}
                                    </span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {agente.precio ? `${agente.precio}€` : "Gratis"}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {agente.nombre}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-1 mb-4">
                                    {agente.descripcion}
                                </p>

                                {/* Si no está logueado muestra "Inicia sesión para acceder", si lo está muestra "Comprar" */}
                                <button
                                    onClick={() => handleAcceder(agente)}
                                    className="w-full py-2.5 text-sm font-bold rounded-xl transition-colors bg-[#136dec] hover:bg-blue-600 text-white"
                                >
                                    {isLoggedIn()
                                        ? (agente.precio ? `Comprar — $${agente.precio}` : "Obtener gratis")
                                        : "Inicia sesión para acceder"
                                    }
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Banner de CTA si no está logueado */}
                {!isLoggedIn() && !loading && agentesFiltered.length > 0 && (
                    <div className="mt-12 w-full max-w-2xl bg-[#136dec]/10 dark:bg-[#136dec]/20 border border-[#136dec]/30 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            ¿Listo para empezar?
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-5">
                            Crea una cuenta gratis o inicia sesión para comprar y usar estos agentes.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                onClick={() => navigate("/crear_usuario")}
                                className="px-6 py-3 bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
