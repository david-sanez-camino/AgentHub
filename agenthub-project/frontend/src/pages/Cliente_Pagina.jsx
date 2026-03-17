import React, { useState } from "react";
import ClienteNavbar from "../components/ClienteNavbar";
import Footer from "../components/Footer";

export default function ClientePagina() {
    const [busqueda, setBusqueda] = useState("");

    const handleBuscar = (e) => {
        e.preventDefault();
        // Lógica futura de búsqueda
        console.log("Buscando agentes:", busqueda);
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col items-center justify-center text-center">
                <div className="max-w-3xl w-full">
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

                    {busqueda && (
                        <div className="mt-8 text-slate-500 dark:text-slate-400">
                            Buscando resultados para: <strong className="text-slate-900 dark:text-white">{busqueda}</strong>
                            <div className="mt-4 p-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                                Aún no hay agentes disponibles en la tienda. Vuelve pronto.
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
