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
                ? "bg-white/80 dark:bg-[#101822]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo & Brand */}
                <div className="flex items-center gap-2">
                    <Link to="/cliente" className="flex items-center gap-2 group">
                        <div className="size-10 rounded-xl flex items-center justify-center shadow-lg shadow-[#136dec]/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                            <img
                                src={logo}
                                alt="AgentHub Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Agent<span className="text-[#136dec]">Hub</span>
                            <span className="ml-2 text-sm font-medium text-slate-400">| Cliente</span>
                        </h2>
                    </Link>
                </div>

                {/* Navigation and Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 mr-4">
                        <Link to="/cliente/mis-agentes" className="text-sm font-semibold text-slate-600 hover:text-[#136dec] dark:text-slate-300 dark:hover:text-[#136dec] transition-colors">
                            Mis Agentes
                        </Link>
                        <Link to="/cliente/perfil" className="text-sm font-semibold text-slate-600 hover:text-[#136dec] dark:text-slate-300 dark:hover:text-[#136dec] transition-colors">
                            Perfil
                        </Link>
                    </nav>

                    {user && (
                        <div className="flex items-center gap-4 border-l border-slate-300 dark:border-slate-700 pl-6">
                            <span className="text-sm font-semibold text-[#136dec]">
                                Hola, {user.nombre}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-semibold rounded-xl border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm">
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
