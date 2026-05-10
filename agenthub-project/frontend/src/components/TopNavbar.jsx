import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

//importamos las funciones para manejar la autenticacion
import { getUser, logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
    const [scrolled, setScrolled] = useState(false);

    // Detectar scroll para cambiar el estilo del navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //para el login del ususario, si esta logueado muestra su nombre y un boton para cerrar sesion, 
    // si no esta logueado muestra los botones de login y crear cuenta
    const user = getUser();
    const navigate = useNavigate();

    return (
        <header
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 dark:bg-[#101822]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo & Brand */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="size-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 overflow-hidden border border-white/10">
                            <img
                                src={logo}
                                alt="AgentHub Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-black tracking-tighter text-white">
                            Agent<span className="text-blue-400">Hub</span>
                        </h2>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#destacados" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Agentes
                    </a>
                    <a href="#!" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Soluciones
                    </a>
                    <a href="#!" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Precios
                    </a>
                    <a href="#!" className="text-sm font-bold text-gray-300 hover:text-white transition-colors">
                        Documentación
                    </a>
                </nav>

                {/* Actions (Login / Signup) */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-300 hover:text-white transition-colors">
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/crear_usuario"
                                className="px-6 py-2.5 text-sm font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                Comenzar Gratis
                            </Link>
                        </>
                    ) : (
                        <>
                            {user?.rol === "ADMIN" && (
                                <Link
                                    to="/pantalla_admin"
                                    className="hidden sm:block px-4 py-2 text-sm font-bold text-gray-300 hover:text-white transition-colors"
                                >
                                    Panel Admin
                                </Link>
                            )}
                            <span className="text-sm font-bold text-gray-200">
                                Hola, {user.nombre}
                            </span>
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/login");
                                }}
                                className="px-4 py-2 text-sm font-bold rounded-xl border border-white/10 hover:bg-white/5 text-white transition-all">
                                Salir
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
