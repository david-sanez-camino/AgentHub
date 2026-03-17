import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { loginUsuario } from "../services/conexion_api";
import { saveAuth } from "../services/auth";
import { mockUsuarios } from "../mocks/info_ejemplo_relleno";

export default function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [contrasenia, setContrasenia] = useState("");

    //guarda datos escritos
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setErrorMsg("");

        try {
            setLoading(true);

            // TODO: En el futuro cambiar a loginUsuario cuando la API soporte los roles de CLIENTE y DESARROLLADOR
            // Simulamos un retraso de red
            await new Promise(resolve => setTimeout(resolve, 800));

            const usuarioMock = mockUsuarios.find(
                (u) => u.email === email.trim() && u.contrasenia === contrasenia
            );

            if (!usuarioMock) {
                throw new Error("Credenciales incorrectas.");
            }

            // Simulamos la respuesta de la API
            const respMock = {
                token: "mock-jwt-token-123",
                type: "Bearer",
                usuario: {
                    id: usuarioMock.id,
                    email: usuarioMock.email,
                    nombre: usuarioMock.nombre,
                    apellido: usuarioMock.apellido,
                    rol: usuarioMock.rol
                }
            };

            // guardamos sesión para q no reinicie todo el rato
            saveAuth(respMock);

            // Redireccionamos dependiendo del rol mockeado
            if (usuarioMock.rol === "DESARROLLADOR") {
                navigate("/desarrollador", { replace: true });
            } else if (usuarioMock.rol === "CLIENTE") {
                navigate("/cliente", { replace: true });
            } else {
                navigate("/", { replace: true }); // Por defecto
            }

        } catch (err) {
            // si falla mostramos error
            setErrorMsg(err?.message || "Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* Navbar */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="size-7 bg-[#136dec] rounded-md flex items-center justify-center text-white">
                            <img src={logo} alt="AgentHub Logo" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-lg font-bold tracking-tight">AgentHub</h2>
                    </Link>
                    {/*Boton salir para volver al home*/}
                    <Link
                        to="/"
                        className="inline-flex items-center px-8 py-4 text-lg font-bold bg-[#136dec] hover:bg-blue-600 text-white rounded-xl transition-all shadow-xl shadow-[#136dec]/30"
                    >
                        Salir

                    </Link>
                </div>
            </header>



            {/* Main */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white dark:bg-[#1a2230] p-7 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">

                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Iniciar sesión
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                            Accede a tu espacio de trabajo
                        </p>
                    </div>

                    {/* Mensaje error */}
                    {errorMsg && (
                        <div className="mb-5 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800 text-sm font-semibold">
                            ❌ {errorMsg}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={onSubmit}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Contraseña
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={contrasenia}
                                    onChange={(e) => setContrasenia(e.target.value)}
                                    className="w-full h-11 px-4 pr-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                                >
                                    {showPassword ? "Ocultar" : "Ver"}
                                </button>
                            </div>
                        </div>

                        {/* Botón */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-11 text-white font-medium rounded-lg transition
                ${loading ? "bg-[#136dec]/60 cursor-not-allowed" : "bg-[#136dec] hover:bg-blue-700"}`}
                        >
                            {loading ? "Verificando..." : "Iniciar sesión"}
                        </button>
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