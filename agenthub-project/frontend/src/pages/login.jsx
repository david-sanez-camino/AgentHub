import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";
import { loginUsuario } from "../services/conexion_api";
import { saveAuth } from "../services/auth";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setErrorMsg("");
        const payload = { email: email.trim(), contrasenia };
        try {
            setLoading(true);
            const resp = await loginUsuario(payload);
            if (!resp?.token) throw new Error("Credenciales incorrectas.");
            saveAuth(resp);
            const rol = resp?.usuario?.rol;
            if (rol === "ADMIN") {
                navigate("/", { replace: true });
            } else if (rol === "DESARROLLADOR") {
                navigate("/desarrollador", { replace: true });
            } else if (rol === "CLIENTE") {
                navigate("/cliente", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (err) {
            setErrorMsg(err?.message || "Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] via-[#252a3a] to-[#1a1f2e] flex flex-col">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2e]/80 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="AgentHub Logo" className="w-8 h-8 object-contain rounded-md" />
                        <span className="text-xl">
                            <span className="text-white font-semibold">Agent</span>
                            <span className="text-blue-400 font-semibold">Hub</span>
                        </span>
                    </Link>
                </div>
            </header>

            {/* Botón Volver */}
            <div className="pt-20 px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm">Volver</span>
                </Link>
            </div>

            {/* Formulario */}
            <main className="flex-1 flex items-center justify-center px-8 pb-12">
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-2xl p-8 border border-white/10 shadow-2xl">

                        <div className="text-center mb-8">
                            <h1 className="text-2xl text-white mb-3">Inicio de sesión</h1>
                            <p className="text-gray-400 text-sm">Bienvenido de nuevo</p>
                        </div>

                        {/* Error */}
                        {errorMsg && (
                            <div className="mb-5 p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-400 text-sm">
                                ❌ {errorMsg}
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Correo electrónico
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Introduce tu correo electrónico"
                                        className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={contrasenia}
                                        onChange={(e) => setContrasenia(e.target.value)}
                                        placeholder="Introduce tu contraseña"
                                        className="w-full pl-11 pr-11 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Olvidé contraseña */}
                            <div className="text-right">
                                <button type="button" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                                    ¿Has olvidado tu contraseña?
                                </button>
                            </div>

                            {/* Botón submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-3 text-white rounded-xl transition-colors shadow-sm
                                    ${loading ? "bg-blue-600/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                            >
                                {loading ? "Verificando..." : "Iniciar Sesión"}
                            </button>
                        </form>
                    </div>

                    {/* Regístrate */}
                    <div className="text-center mt-6">
                        <span className="text-gray-400 text-sm">¿No tienes una cuenta? </span>
                        <Link to="/crear_usuario" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                            Regístrate
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}