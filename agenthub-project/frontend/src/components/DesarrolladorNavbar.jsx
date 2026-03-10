import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUser, logout } from "../services/auth";

export default function DesarrolladorNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
            logout();
            navigate("/login");
        }
    };

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/90 dark:bg-[#101822]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo & Brand */}
                <div className="flex items-center gap-2">
                    <Link to="/desarrollador" className="flex items-center gap-2 group">
                        <div className="size-10 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 p-1">
                            <img
                                src={logo}
                                alt="AgentHub Logo"
                                className="w-full h-full object-cover rounded-lg bg-white/20 backdrop-blur-sm"
                            />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Agent<span className="text-purple-600">Hub</span>
                            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 uppercase tracking-wider">Dev</span>
                        </h2>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-5">
                    <Link to="/desarrollador/perfil" className="text-sm font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors">
                        Datos de la Cuenta
                    </Link>
                    <Link to="/desarrollador/documentacion" className="text-sm font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors">
                        Documentación
                    </Link>
                    <Link to="/desarrollador/subir-agente" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/40 transition-colors">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        Subir Agente
                    </Link>
                    <Link to="/desarrollador/finanzas" className="text-sm font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors">
                        Finanzas
                    </Link>
                    <Link to="/desarrollador/mis-agentes" className="text-sm font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-400 transition-colors">
                        Mis Agentes
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-4 border-l border-slate-300 dark:border-slate-700 pl-4">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden lg:block">
                                {user.nombre}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Cerrar sesión"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
