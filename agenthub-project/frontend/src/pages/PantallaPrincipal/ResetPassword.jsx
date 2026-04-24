import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import logo from "../../assets/logo.png";
import { resetContrasenia } from "../../services/conexion_api";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [nuevaContrasenia, setNuevaContrasenia] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setError("");

        if (nuevaContrasenia !== confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        if (nuevaContrasenia.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setLoading(true);
        try {
            await resetContrasenia(token, nuevaContrasenia);
            setExito(true);
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(err?.message || "El enlace no es válido o ha expirado.");
        } finally {
            setLoading(false);
        }
    }

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] to-[#1a1f2e] flex items-center justify-center">
                <div className="text-center text-white">
                    <p className="text-red-400 mb-4">Enlace inválido.</p>
                    <Link to="/login" className="text-blue-400 hover:text-blue-300">Volver al login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1f2e] via-[#252a3a] to-[#1a1f2e] flex flex-col">
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

            <div className="pt-20 px-8">
                <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm">Volver al login</span>
                </Link>
            </div>

            <main className="flex-1 flex items-center justify-center px-8 pb-12">
                <div className="w-full max-w-md">
                    <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-2xl p-8 border border-white/10 shadow-2xl">

                        {!exito ? (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl text-white mb-3">Nueva contraseña</h1>
                                    <p className="text-gray-400 text-sm">Introduce tu nueva contraseña.</p>
                                </div>

                                {error && (
                                    <div className="mb-5 p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-400 text-sm">
                                        ❌ {error}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">Nueva contraseña</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <input
                                                type={showPass ? "text" : "password"}
                                                required
                                                value={nuevaContrasenia}
                                                onChange={(e) => setNuevaContrasenia(e.target.value)}
                                                placeholder="Mínimo 6 caracteres"
                                                className="w-full pl-11 pr-11 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">Confirmar contraseña</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <input
                                                type={showPass ? "text" : "password"}
                                                required
                                                value={confirmar}
                                                onChange={(e) => setConfirmar(e.target.value)}
                                                placeholder="Repite la contraseña"
                                                className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full px-6 py-3 text-white rounded-xl transition-colors shadow-sm ${
                                            loading ? "bg-blue-600/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        {loading ? "Guardando..." : "Guardar nueva contraseña"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="text-5xl mb-4">✅</div>
                                <h2 className="text-xl text-white mb-3">¡Contraseña actualizada!</h2>
                                <p className="text-gray-400 text-sm">
                                    Redirigiendo al login en unos segundos...
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}