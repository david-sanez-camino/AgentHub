import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#0b1119] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand and Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="size-8 rounded-lg flex items-center justify-center shadow-lg shadow-[#136dec]/20 overflow-hidden">
                                <img 
                                    src={logo}
                                    alt="AgentHub Logo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AgentHub</h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                            El marketplace líder para descubrir, desplegar y escalar agentes de inteligencia artificial en entornos empresariales.
                        </p>
                        <div className="flex gap-4">
                            <a href="#!" className="text-slate-400 hover:text-[#136dec] transition-colors" aria-label="Twitter">
                                <i className="fa-brands fa-twitter text-xl"></i>
                            </a>
                            <a href="#!" className="text-slate-400 hover:text-[#136dec] transition-colors" aria-label="LinkedIn">
                                <i className="fa-brands fa-linkedin text-xl"></i>
                            </a>
                            <a href="#!" className="text-slate-400 hover:text-[#136dec] transition-colors" aria-label="GitHub">
                                <i className="fa-brands fa-github text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Links - Product */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Producto</h3>
                        <ul className="space-y-3">
                            <li><Link to="/precios" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Precios</Link></li>
                            <li><Link to="/casos-de-uso" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Casos de Uso</Link></li>
                            <li><Link to="/integraciones" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Integraciones</Link></li>
                            <li><Link to="/soluciones" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Soluciones</Link></li>
                        </ul>
                    </div>

                    {/* Links - resources */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recursos</h3>
                        <ul className="space-y-3">
                            <li><Link to="/blog" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Blog</Link></li>
                            <li><Link to="/comunidad" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Comunidad</Link></li>
                            <li><Link to="/soporte" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Soporte</Link></li>
                            <li><Link to="/documentacion" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Documentación</Link></li>
                        </ul>
                    </div>

                    {/* Links - Company */}
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Empresa</h3>
                        <ul className="space-y-3">
                            <li><Link to="/sobre-nosotros" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Sobre Nosotros</Link></li>
                            <li><Link to="/empleo" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Empleo</Link></li>
                            <li><Link to="/privacidad" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Privacidad</Link></li>
                            <li><Link to="/terminos-legales" className="text-sm text-slate-500 hover:text-[#136dec] dark:text-slate-400 transition-colors">Términos Legales</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © {new Date().getFullYear()} AgentHub Inc. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Estado del sistema:</span>
                        <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Operativo
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
