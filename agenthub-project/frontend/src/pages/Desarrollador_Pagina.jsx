import React from "react";
import DesarrolladorNavbar from "../components/DesarrolladorNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getUser } from "../services/auth";

export default function DesarrolladorPagina() {
    const user = getUser();

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-3 text-slate-900 dark:text-white">
                        Bienvenido de nuevo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">{user?.nombre || 'Desarrollador'}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">
                        Este es tu panel de control. Gestiona tus agentes de IA, revisa tus finanzas y descubre nuevas oportunidades.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tarjetas de acceso rápido */}
                    <Link to="/desarrollador/subir-agente" className="group bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-500/50">
                        <div className="size-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Subir Nuevo Agente</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Publica tu última creación en el marketplace y empieza a monetizar tus modelos de IA.</p>
                    </Link>

                    <Link to="/desarrollador/finanzas" className="group bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-500/50">
                        <div className="size-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Rendimiento y Finanzas</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Consulta cuántas veces se han descargado tus agentes y el dinero que has facturado hasta hoy.</p>
                    </Link>

                    <Link to="/desarrollador/documentacion" className="group bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50">
                        <div className="size-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-book-open"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Centro de Documentación</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Aprende sobre estándares de la industria, bases legales y buenas prácticas para tus IA.</p>
                    </Link>

                    <Link to="/desarrollador/mis-agentes" className="group bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-500/50">
                        <div className="size-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-robot"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mis Agentes</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Gestiona tu catálogo, actualiza descripciones y verifica el estado de tus publicaciones.</p>
                    </Link>

                    <Link to="/desarrollador/perfil" className="group bg-white dark:bg-[#1a2230] p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-500/50">
                        <div className="size-14 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-user-gear"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Datos de la Cuenta</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Actualiza tu perfil, cuenta bancaria, empresa y toda la configuración de tu usuario.</p>
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
