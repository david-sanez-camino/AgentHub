import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import logo from "../../assets/logo.png";
import { olvidarContrasenia } from "../../services/conexion_api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await olvidarContrasenia(email.trim());
            setEnviado(true);
        } catch (err) {
            setError("Ocurrió un error. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
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
                        
                        {!enviado ? (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl text-white mb-3">¿Olvidaste tu contraseña?</h1>
                                    <p className="text-gray-400 text-sm">
                                        Introduce tu correo y te enviaremos un enlace para restablecerla.
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-5 p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-400 text-sm">
                                        ❌ {error}
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="space-y-5">
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

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full px-6 py-3 text-white rounded-xl transition-colors shadow-sm ${
                                            loading ? "bg-blue-600/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        {loading ? "Enviando..." : "Enviar enlace"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="text-5xl mb-4">📧</div>
                                <h2 className="text-xl text-white mb-3">Revisa tu correo</h2>
                                <p className="text-gray-400 text-sm mb-6">
                                    Si el correo está registrado, recibirás un enlace en los próximos minutos.
                                </p>
                                <Link
                                    to="/login"
                                    className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
                                >
                                    Volver al login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}