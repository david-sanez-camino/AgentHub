/*
Esta pagina es la encargada de mostrar el formulario de registro para usuarios y desarrolladores 
El usuario normal solo necesita rellenar los campos de nombre, email, contraseña, empresa y teléfono, 
mientras que el desarrollador debe rellenar campos adicionales 
como , nif/cif, web, descripción y experiencia.
Al enviar los datos el usuario normal se le crea la cuenta al momento pero al desarrolador se le muestra 
mensaje de espera hasta q sea aceptado y pasado el visto bueno de los admins.

*/

//import React, { useMemo, useState } from "react"; 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registrarUsuario } from "../services/conexion_api";

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
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            {/* Header minimal */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#101822]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <Link to="/" className="text-lg font-bold tracking-tight">
                        AgentHub
                    </Link>

                    <Link
                        to="/login"
                        className="px-4 py-1.5 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-xl bg-white dark:bg-[#1a2230] p-7 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                    {/* Título */}
                    <div className="text-center mb-7">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Crear cuenta
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                            Regístrate para acceder a AgentHub
                        </p>
                    </div>

                    {/* Los datos no se enviaron bien entonces mensaje error */}
                    {errorMsg && (
                        <div className="mb-5 p-4 rounded-lg bg-red-100 border border-red-300 text-red-800 text-sm font-semibold">
                            ❌ {errorMsg}
                        </div>
                    )}

                    {/* Datos enviados correctamente del cleinte normal */}
                    {successBusiness && (
                        <div className="mb-5 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 text-sm font-semibold">
                            🎉 Cuenta creada correctamente. ¡Felicitaciones!
                        </div>
                    )}

                    {/* Datos enviados correctamente del desarrollador */}
                    {successDeveloper && (
                        <div className="mb-5 p-4 rounded-lg bg-blue-100 border border-blue-300 text-blue-800 text-sm font-semibold">
                            📩 Gracias por registrarte como desarrollador. Te llegará un correo eletronico
                            cuando nuestro equipo evalúe tu perfil. Muchas gracias.
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre */}
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

                        {/* Apellido */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Apellido
                            </label>
                            <input
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="Tu apellido"
                                required
                                value={form.apellido}
                                onChange={updateField("apellido")}
                            />
                        </div>
                        </div>
                        

                        {/* Email */}
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

                        {/* Contraseña */}
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
                            <p>* Debe tener al menos 6 caracteres</p>
                        </div>

                        {/* Empresa */}
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

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                inputMode="numeric"
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition placeholder:text-slate-400"
                                placeholder="600000000"
                                required
                                value={form.telefono}
                                onChange={updateField("telefono")}
                            />
                        </div>

                        {/* Tipo cuenta aqui vemos si es desarrollador o es cliente*/}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Tipo de cuenta
                            </label>
                            <select
                                className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-[#136dec]/50 focus:border-[#136dec] outline-none transition"
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
                            <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-white/5 backdrop-blur-sm p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-sm">Datos de desarrollador</h3>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Solo para publicar agentes
                                    </span>
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* NIF/CIF */}
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

                                    {/* Web */}
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

                                {/* Descripción */}
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

                                {/* Experiencia */}
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

                        {/* Boton de enviar  */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-11 font-medium rounded-lg transition shadow-md shadow-[#136dec]/20 flex items-center justify-center gap-2 mt-2
                            ${loading
                                    ? "bg-[#136dec]/60 cursor-not-allowed text-white"
                                    : "bg-[#136dec] hover:bg-blue-700 text-white"
                                }`}
                        >
                            {loading ? "Enviando..." : "Crear cuenta"}
                            {!loading && (
                                <span className="material-symbols-outlined text-lg">
                                    arrow_forward
                                </span>
                            )}
                        </button>

                        {/* Ayuda */}
                        <div className="text-center pt-2">
                            <Link to="/ayuda" className="text-sm text-[#136dec] hover:underline">
                                ¿Necesitas ayuda?
                            </Link>
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