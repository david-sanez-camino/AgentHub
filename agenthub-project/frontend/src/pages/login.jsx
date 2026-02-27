import React, { useMemo, useState } from "react";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* Navbar minimal */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="size-7 bg-[#136dec] rounded-md flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-xl">smart_toy</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">AgentHub</h2>
                    </div>


                </div>
            </header>

            {/* Contenido principal */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white dark:bg-[#1a2230] p-7 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Iniciar sesión</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                            Accede a tu espacio de trabajo
                        </p>
                    </div>

                    <form className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="nombre@empresa.com"
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                autoComplete="email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Contraseña
                                </label>
                                <a href="/reset" className="text-xs text-[#136dec] hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full h-11 px-4 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    <span className="text-xs font-medium">{showPassword ? "Ocultar" : "Ver"}</span>
                                </button>
                            </div>
                        </div>

                        {/* Recordar (se mantiene, pero minimal) */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded border-slate-300 text-[#136dec] focus:ring-[#136dec]"
                            />
                            <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">
                                Recordar
                            </label>
                        </div>

                        {/* Botón login */}
                        <button
                            type="submit"
                            className="w-full h-11 bg-[#136dec] hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-md shadow-[#136dec]/20 flex items-center justify-center gap-2"
                        >
                            Iniciar sesión
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    </form>

                    {/* Acciones secundarias (más minimalista) */}
                    <div className="mt-6 flex flex-col gap-3">
                        <a
                            href="/registro"
                            className="block w-full py-2.5 text-center text-sm font-medium border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
                        >
                            Crear un usuario nuevo
                        </a>

                        <div className="text-center">
                            <a
                                href="/ayuda"
                                className="inline-flex items-center gap-1.5 text-sm text-[#136dec] hover:underline"
                            >
                                Obtener ayuda
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer minimal */}
            <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800">
                © {year} AgentHub Inc. · Todos los derechos reservados
            </footer>
        </div>
    );
}

