
import { Link } from "react-router-dom";

import React, { useMemo, useState } from "react";

//registro de usuarios y desarrolladores
export default function Register() {
    const [role, setRole] = useState(""); // "developer" | "business" | ""
    const fechaRegistroISO = useMemo(() => new Date().toISOString(), []);

    const [form, setForm] = useState({
        // Usuario normal
        nombre: "",
        email: "",
        contrasena: "",
        empresa: "",
        telefono: "",

        // Developer extra
        nombreEmpresaDesarrolladora: "",
        nif_cif: "",
        web: "",
        descripcion: "",
        experiencia: "",
    });

    const isDeveloper = role === "developer";

    function updateField(key) {
        return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
    }

    function onSubmit(e) {
        e.preventDefault();

        // datps q enviaremos al backend para crear usuario
        const payload = {
            usuario: {
                nombre: form.nombre,
                email: form.email,
                contrasena: form.contrasena,
                empresa: form.empresa,
                telefono: form.telefono,
                rol: role || "business",
            },
            desarrollador: isDeveloper
                ? {
                    // id y usuario_id los crea el backend
                    nombreEmpresaDesarrolladora:
                        form.nombreEmpresaDesarrolladora?.trim() || form.empresa,
                    nif_cif: form.nif_cif,
                    web: form.web,
                    descripcion: form.descripcion,
                    experiencia: form.experiencia,
                    verificado: false,
                    fechaRegistro: fechaRegistroISO,
                }
                : null,
        };

        console.log("REGISTER PAYLOAD:", payload);

        // Aquí llamarías a tu API:
        // await authService.register(payload);
    }

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* Header minimal */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <a href="/" className="text-lg font-bold tracking-tight">
                        AgentHub
                    </a>
                    <a
                        href="/login"
                        className="px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        Iniciar sesión
                    </a>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-xl bg-white dark:bg-[#1a2230] p-7 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Crear cuenta
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                            Regístrate para acceder a AgentHub
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* Datos usuario normal */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Nombre
                            </label>
                            <input
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="Tu nombre"
                                required
                                value={form.nombre}
                                onChange={updateField("nombre")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="nombre@empresa.com"
                                required
                                value={form.email}
                                onChange={updateField("email")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="••••••••"
                                required
                                value={form.contrasena}
                                onChange={updateField("contrasena")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Empresa
                            </label>
                            <input
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="Nombre comercial"
                                required
                                value={form.empresa}
                                onChange={updateField("empresa")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="+34 600 000 000"
                                required
                                value={form.telefono}
                                onChange={updateField("telefono")}
                            />
                        </div>

                        {/* Selector tipo usuario */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Tipo de cuenta
                            </label>
                            <select
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Selecciona una opción
                                </option>
                                <option value="business">Usuario normal (comprar/usar agentes)</option>
                                <option value="developer">Desarrollador (publicar agentes)</option>
                            </select>
                        </div>

                        {/* Campos extra si es desarrollador */}
                        {isDeveloper && (
                            <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-white/5 backdrop-blur-sm p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-sm">Datos de desarrollador</h3>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Solo para publicar agentes
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Nombre empresa desarrolladora
                                    </label>
                                    <input
                                        className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                        placeholder="Ej. DevLabs AI"
                                        required
                                        value={form.nombreEmpresaDesarrolladora}
                                        onChange={updateField("nombreEmpresaDesarrolladora")}
                                    />
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        Si no es distinto, puedes repetir el nombre de “Empresa”.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            NIF/CIF
                                        </label>
                                        <input
                                            className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                            placeholder="B12345678"
                                            required
                                            value={form.nif_cif}
                                            onChange={updateField("nif_cif")}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Web
                                        </label>
                                        <input
                                            type="url"
                                            className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                            placeholder="https://tusitio.com"
                                            required
                                            value={form.web}
                                            onChange={updateField("web")}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="w-full min-h-[88px] px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                        placeholder="Cuéntanos qué tipo de agentes desarrollas y para qué casos de uso."
                                        required
                                        value={form.descripcion}
                                        onChange={updateField("descripcion")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Experiencia (resumen)
                                    </label>
                                    <input
                                        className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                        placeholder="Ej. 3 años creando agentes + integraciones con APIs"
                                        required
                                        value={form.experiencia}
                                        onChange={updateField("experiencia")}
                                    />
                                </div>
                                
                            </div>
                        )}

                        {/* Botón submit */}
                        <button
                            type="submit"
                            className="w-full h-11 bg-[#136dec] hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-md shadow-[#136dec]/20 flex items-center justify-center gap-2 mt-2"
                        >
                            Crear cuenta
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>

                        {/* Ayuda */}
                        <div className="text-center pt-2">
                            <a href="/ayuda" className="text-sm text-[#136dec] hover:underline">
                                ¿Necesitas ayuda?
                            </a>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800">
                © 2026 AgentHub Inc. · Todos los derechos reservados
            </footer>
        </div>
    );
}