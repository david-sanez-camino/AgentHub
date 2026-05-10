import React, { useEffect, useState } from "react";
import ClienteNavbar from "../../components/ClienteNavbar";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../services/auth";

const API = "https://agenthub-production-e274.up.railway.app";

export default function ClienteMisAgentes() {
    const [agentes, setAgentes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token) { navigate("/login"); return; }

        fetch(`${API}/api/payments/mis-agentes`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then((data) => { setAgentes(data); setCargando(false); })
            .catch(() => setCargando(false));
    }, [token, navigate]);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full flex flex-col">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mis Agentes</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Los agentes que has adquirido están listos para usar.
                    </p>
                </div>

                {cargando && (
                    <p className="text-slate-400 dark:text-slate-500">Cargando tus agentes...</p>
                )}

                {!cargando && agentes.length === 0 && (
                    <div className="flex-1 bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center p-12">
                        <div className="text-6xl text-slate-300 dark:text-slate-600 mb-6">
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">Aún no tienes agentes</h2>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            Explora el marketplace para encontrar la inteligencia artificial ideal para ti.
                        </p>
                        <Link to="/cliente" className="px-6 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-[#136dec]/30 transition-all">
                            Explorar Agentes
                        </Link>
                    </div>
                )}

                {!cargando && agentes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {agentes.map((agente) => (
                            <div key={agente.id} className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 flex flex-col gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                        {agente.nombre}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                        {agente.descripcion}
                                    </p>
                                </div>
                                <div className="mt-auto">
                                    <Link
                                        to={`/agente/${agente.id}`}
                                        className="block w-full text-center py-2.5 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors text-sm"
                                    >
                                        Abrir agente →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}