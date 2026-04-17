/*
Esta pagina es la encargada de mostrar el formulario de registro para usuarios y desarrolladores 
El usuario normal solo necesita rellenar los campos de nombre, email, contraseña, empresa y teléfono, 
mientras que el desarrollador debe rellenar campos adicionales 
como , nif/cif, web, descripción y experiencia.
Al enviar los datos el usuario normal se le crea la cuenta al momento pero al desarrolador se le muestra 
mensaje de espera hasta q sea aceptado y pasado el visto bueno de los admins.

*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Building2, Phone, FileText, Globe, Briefcase, ArrowLeft } from "lucide-react";
import logo from "../../assets/logo.png";
import { registrarUsuario } from "../../services/conexion_api";

export default function Register() {
    // "developer" | "business" | ""
    const [role, setRole] = useState("");

    /*
*/
    // Mensajes éxito
    const [successBusiness, setSuccessBusiness] = useState(false);
    const [successDeveloper, setSuccessDeveloper] = useState(false);

    // Error + loading
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // Datos formulario
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contrasena: "",
        empresa: "",
        telefono: "",

        // Developer extra
        nif_cif: "",
        web: "",
        descripcion: "",
        experiencia: "",
    });

    const isDeveloper = role === "developer";

    function updateField(key) {
        return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
    }


    //normalizacion del telefono en caso de q el usuario ponga espacios o guiones (aprueba de bobos)
    function normalizeTelefonoToInteger(raw) {
        const digits = String(raw ?? "").replace(/\D/g, "");
        if (!digits) return 0;

        const last9 = digits.length > 9 ? digits.slice(-9) : digits;
        const n = parseInt(last9, 10);
        return Number.isNaN(n) ? 0 : n;
    }

    async function onSubmit(e) {
        e.preventDefault();

        // reset UI
        setErrorMsg("");
        setSuccessBusiness(false);
        setSuccessDeveloper(false);

        //roles de registrro
        const rolBackend = isDeveloper ? "DESARROLLADOR" : "CLIENTE";
/*
        // empresa final: si es developer y puso nombreEmpresaDesarrolladora, usamos ese como "empresa"
        const empresaFinal =
            isDeveloper && form.nombreEmpresaDesarrolladora.trim()
                ? form.nombreEmpresaDesarrolladora.trim()
                : form.empresa;
*/
        const payload = {
            //info general de todos los usuarios
            email: form.email.trim(),
            contrasenia: form.contrasena, 
            nombre: form.nombre.trim(),
            apellido: form.apellido.trim(),
            empresa: form.empresa.trim(),
            telefono: normalizeTelefonoToInteger(form.telefono),
            rol: rolBackend,

            ...(isDeveloper
                ? {
                    // info extra solo para desarrolladores
                    nif: form.nif_cif.trim(),
                    web: form.web.trim(),
                    descripcion: form.descripcion.trim(),
                    experiencia: form.experiencia.trim(),
                }
                : {}),
        };

        try {
            setLoading(true);

            const resp = await registrarUsuario(payload);

            if (!isDeveloper) setSuccessBusiness(true);
            if (isDeveloper) setSuccessDeveloper(true);

            // oculta mensajes en 10s
            setTimeout(() => {
                setSuccessBusiness(false);
                setSuccessDeveloper(false);
            }, 10000);
            //console.log("Registro OK:", resp, "fechaRegistroISO(front):", fechaRegistroISO);
            console.log("Registro OK:", resp);
        } catch (err) {
            setErrorMsg(err?.message || "Error al registrar. Inténtalo de nuevo.");
            console.error("Error al registrar usuario:", err);
            console.log("Payload enviado:", payload); // comporbar debug
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

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-2xl">
                    <div className="bg-gradient-to-b from-[#1f2937] to-[#1a2130] rounded-2xl p-8 border border-white/10 shadow-2xl">
                        {/* Título */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl text-white mb-3">Crear cuenta</h1>
                            <p className="text-gray-400 text-sm">Regístrate para acceder a AgentHub</p>
                        </div>

                        {/* Los datos no se enviaron bien entonces mensaje error */}
                        {errorMsg && (
                            <div className="mb-5 p-4 rounded-lg bg-red-900/40 border border-red-500/30 text-red-400 text-sm">
                                ❌ {errorMsg}
                            </div>
                        )}

                        {/* Datos enviados correctamente del cleinte normal */}
                        {successBusiness && (
                            <div className="mb-5 p-4 rounded-lg bg-green-900/40 border border-green-500/30 text-green-400 text-sm">
                                🎉 Cuenta creada correctamente. ¡Felicitaciones!
                            </div>
                        )}

                        {/* Datos enviados correctamente del desarrollador */}
                        {successDeveloper && (
                            <div className="mb-5 p-4 rounded-lg bg-blue-900/40 border border-blue-500/30 text-blue-400 text-sm">
                                📩 Gracias por registrarte como desarrollador. Te llegará un correo eletronico
                                cuando nuestro equipo evalúe tu perfil. Muchas gracias.
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={onSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Nombre */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Nombre
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Tu nombre"
                                            required
                                            value={form.nombre}
                                            onChange={updateField("nombre")}
                                        />
                                    </div>
                                </div>

                                {/* Apellido */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-2">
                                        Apellido
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="Tu apellido"
                                            required
                                            value={form.apellido}
                                            onChange={updateField("apellido")}
                                        />
                                    </div>
                                </div>
                            </div>

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
                                        className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="nombre@empresa.com"
                                        required
                                        value={form.email}
                                        onChange={updateField("email")}
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
                                        type="password"
                                        className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="••••••••"
                                        required
                                        value={form.contrasena}
                                        onChange={updateField("contrasena")}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5">* Debe tener al menos 6 caracteres</p>
                            </div>

                            {/* Empresa */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Empresa
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Nombre comercial"
                                        required
                                        value={form.empresa}
                                        onChange={updateField("empresa")}
                                    />
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Teléfono
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="600000000"
                                        required
                                        value={form.telefono}
                                        onChange={updateField("telefono")}
                                    />
                                </div>
                            </div>

                            {/* Tipo cuenta aqui vemos si es desarrollador o es cliente*/}
                            <div>
                                <label className="block text-sm text-gray-300 mb-2">
                                    Tipo de cuenta
                                </label>
                                <select
                                    className="w-full px-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
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

                            {/* DE aqui para abajo es info extra del desarrollador */}
                            {isDeveloper && (
                                <div className="mt-2 rounded-xl border border-blue-500/20 bg-blue-950/20 backdrop-blur-sm p-5 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-sm text-white">Datos de desarrollador</h3>
                                        <span className="text-xs text-gray-400">
                                            Solo para publicar agentes
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {/* NIF/CIF */}
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2">
                                                NIF/CIF
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <input
                                                    className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="B12345678"
                                                    required
                                                    value={form.nif_cif}
                                                    onChange={updateField("nif_cif")}
                                                />
                                            </div>
                                        </div>

                                        {/* Web */}
                                        <div>
                                            <label className="block text-sm text-gray-300 mb-2">
                                                Web
                                            </label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                                    <Globe className="w-5 h-5" />
                                                </div>
                                                <input
                                                    type="url"
                                                    className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                    placeholder="https://tusitio.com"
                                                    required
                                                    value={form.web}
                                                    onChange={updateField("web")}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Descripción */}
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">
                                            Descripción
                                        </label>
                                        <textarea
                                            className="w-full min-h-[88px] px-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                            placeholder="Cuéntanos qué tipo de agentes desarrollas y para qué casos de uso."
                                            required
                                            value={form.descripcion}
                                            onChange={updateField("descripcion")}
                                        />
                                    </div>

                                    {/* Experiencia */}
                                    <div>
                                        <label className="block text-sm text-gray-300 mb-2">
                                            Experiencia (resumen)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <input
                                                className="w-full pl-11 pr-4 py-3 bg-[#0f1319] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="Ej. 3 años creando agentes + integraciones con APIs"
                                                required
                                                value={form.experiencia}
                                                onChange={updateField("experiencia")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Boton de enviar  */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-6 py-3 text-white rounded-xl transition-colors shadow-sm
                                    ${loading ? "bg-blue-600/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                            >
                                {loading ? "Enviando..." : "Crear cuenta"}
                            </button>
                        </form>

                        {/* Ya tienes cuenta */}
                        <div className="text-center mt-6">
                            <span className="text-gray-400 text-sm">¿Ya tienes una cuenta? </span>
                            <Link to="/login" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}