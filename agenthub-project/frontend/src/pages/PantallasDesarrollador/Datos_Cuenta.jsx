import React, { useState } from "react";
import DesarrolladorNavbar from "../../components/DesarrolladorNavbar";
import Footer from "../../components/Footer";
import { getUser } from "../../services/auth";

export default function DatosCuenta() {
    const user = getUser();
    const [formData, setFormData] = useState({
        nombre: user?.nombre || "Juan",
        apellido: user?.apellido || "Pérez",
        email: user?.email || "juan@agenthub.com",
        telefono: user?.telefono || "600123456",
        empresa: user?.empresa || "DevSolutions AI",
        usuario: "juan_dev",
        cuentaBanco: "ES91 2100 0418 40 1234567890",
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Datos de la Cuenta</h1>
                    <p className="text-slate-500 dark:text-slate-400">Administra tu información personal y los detalles de facturación.</p>
                </div>

                <div className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    {saved && (
                        <div className="mb-6 p-4 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-circle-check"></i> Datos guardados correctamente.
                        </div>
                    )}

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Datos Básicos */}
                        <div className="col-span-1 md:col-span-2">
                            <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">Información Personal</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nombre</label>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Apellidos</label>
                            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nombre de Usuario</label>
                            <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-purple-500/50 outline-none" disabled />
                        </div>

                        {/* Red Profesional */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">Perfil Profesional</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Empresa / Prototipo</label>
                            <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Teléfono</label>
                            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" />
                        </div>

                        {/* Finanzas Básicas */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <h2 className="text-xl font-bold border-b border-slate-200 dark:border-slate-700 pb-3 mb-4">Datos de Facturación</h2>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Cuenta Bancaria (IBAN)</label>
                            <input type="text" name="cuentaBanco" value={formData.cuentaBanco} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none font-mono" required />
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
                            <button type="submit" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
