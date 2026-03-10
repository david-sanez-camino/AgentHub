import React, { useState } from "react";
import ClienteNavbar from "../components/ClienteNavbar";
import Footer from "../components/Footer";
import { getUser } from "../services/auth";

export default function ClientePerfil() {
    const user = getUser();
    const [formData, setFormData] = useState({
        nombre: user?.nombre || "Maria",
        apellido: user?.apellido || "Gómez",
        email: user?.email || "maria@empresa.com",
        telefono: user?.telefono || "600987654",
        empresa: user?.empresa || "Marketing Pro",
        notificacionesEmail: true
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mi Perfil</h1>
                    <p className="text-slate-500 dark:text-slate-400">Gestiona tus datos personales y preferencias de la cuenta.</p>
                </div>

                <div className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    {saved && (
                        <div className="mb-6 p-4 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                            <i className="fa-solid fa-circle-check"></i> Perfil actualizado con éxito.
                        </div>
                    )}

                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Nombre</label>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 outline-none" required />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Apellidos</label>
                            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Correo Electrónico</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Teléfono</label>
                            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 outline-none" />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Empresa</label>
                            <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#136dec]/50 outline-none" />
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-4 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                            <input type="checkbox" name="notificacionesEmail" id="noti" checked={formData.notificacionesEmail} onChange={handleChange} className="size-4 text-[#136dec] rounded border-slate-300 focus:ring-[#136dec]" />
                            <label htmlFor="noti" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                Recibir correos sobre actualizaciones y nuevos agentes recomendados.
                            </label>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                            <button type="submit" className="px-8 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-[#136dec]/30 transition-all">
                                Guardar Perfil
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
