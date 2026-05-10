import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUser, logout } from "../services/auth";
import ModalConfirmLogout from "./ModalConfirmLogout";

export default function DesarrolladorNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => setShowLogoutModal(true);
    const confirmarLogout = () => { logout(); navigate("/login"); };
    const cancelarLogout = () => setShowLogoutModal(false);

    return (
        <>
        {showLogoutModal && <ModalConfirmLogout onConfirm={confirmarLogout} onCancel={cancelarLogout} />}
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-[#1a1f2e]/90 backdrop-blur-md border-b border-white/5 shadow-sm"
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
                        <h2 className="text-2xl font-black tracking-tighter text-white">
                            Agent<span className="text-purple-400">Hub</span>
                            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 uppercase tracking-widest">Dev</span>
                        </h2>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/desarrollador/perfil" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Perfil
                    </Link>
                    <Link to="/desarrollador/documentacion" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Docs
                    </Link>
                    <Link to="/desarrollador/subir-agente" className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/30 transition-all">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        Subir Agente
                    </Link>
                    <Link to="/desarrollador/finanzas" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Finanzas
                    </Link>
                    <Link to="/desarrollador/mis-agentes" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Mis Agentes
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="flex items-center gap-6 border-l border-white/10 pl-6">
                            <span className="text-sm font-bold text-gray-200">
                                Hola, <span className="text-purple-400">{user.nombre}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                                title="Cerrar sesión"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
        </>
    );
}
