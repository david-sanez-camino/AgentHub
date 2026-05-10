import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { getUser, logout } from "../services/auth";
import ModalConfirmLogout from "./ModalConfirmLogout";

export default function ClienteNavbar() {
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
                    <Link to="/cliente" className="flex items-center gap-2 group">
                        <div className="size-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden border border-white/10">
                            <img
                                src={logo}
                                alt="AgentHub Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-white">
                            Agent<span className="text-blue-400">Hub</span>
                            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 uppercase tracking-widest">Cliente</span>
                        </h2>
                    </Link>
                </div>

                {/* Navigation and Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-8 mr-4">
                        <Link to="/marketplace" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                            Marketplace
                        </Link>
                        <Link to="/cliente/mis-agentes" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                            Mis Agentes
                        </Link>
                        <Link to="/cliente/perfil" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                            Perfil
                        </Link>
                    </nav>

                    {user && (
                        <div className="flex items-center gap-6 border-l border-white/10 pl-6">
                            <span className="text-sm font-bold text-gray-200">
                                Hola, <span className="text-blue-400">{user.nombre}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-bold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-all shadow-sm">
                                Salir
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
        </>
    );
}
