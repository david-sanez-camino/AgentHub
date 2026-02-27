import React from "react";


export default function Navbar({
    user = null,          // { name: "Pablo" } o null
    onLogout = () => { },  // función logout
    showAuthButtons = true,
}) {
    return (
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Marca */}
                <a href="/" className="text-lg font-bold tracking-tight">
                    AgentHub
                </a>

                {/* Acciones */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <span className="text-sm text-slate-600 dark:text-slate-300">Hola, {user.name}</span>
                            <button
                                type="button"
                                onClick={onLogout}
                                className="px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        showAuthButtons && (
                            <>
                                <a
                                    href="/login"
                                    className="px-4 py-1.5 text-sm font-medium rounded-lg hover:text-[#136dec] transition"
                                >
                                    Iniciar sesión
                                </a>
                                <a
                                    href="/registro"
                                    className="px-4 py-1.5 text-sm font-medium rounded-lg bg-[#136dec] hover:bg-blue-700 text-white transition shadow-md shadow-[#136dec]/20"
                                >
                                    Crear cuenta
                                </a>
                            </>
                        )
                    )}
                </div>
            </div>
        </header>
    );
}


