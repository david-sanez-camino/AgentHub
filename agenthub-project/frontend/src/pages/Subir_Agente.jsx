import React, { useState } from "react";
import DesarrolladorNavbar from "../components/DesarrolladorNavbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { publicarAgente } from "../services/conexion_api";
import { getUser, getToken } from "../services/auth";

export default function SubirAgente() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        systemPromt: "",
        modelo: "gpt-4o",
        categoria: "productividad",
        tecnologias: "",
        posibilidades: "",
        negocios: "",
        precio: "",
        archivoZip: null
    });

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulamos subida a backend
        //setTimeout(() => {
            //setLoading(false);
            //alert("Agente subido correctamente y enviado a verificación.");
            //navigate("/desarrollador/mis-agentes");

        // FUNCIONES DE AUTH PARA COGER TOKEN Y ROL
        const usuarioActual = getUser();
        const token = getToken();

        // comprobacion de si hay usuario o no
        if (!usuarioActual || !usuarioActual.id) {
            alert("Error: No se ha detectado tu usuario. Inicia sesion");
            setLoading(false);
            return;
        }

        // Payload con id de usuario dinamico
        const agentePayload = {
            desarrollador: {
                id: usuarioActual.id
            },
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            systemPromt: formData.systemPromt,
            modelo: formData.modelo,
            categoria: formData.categoria,
            precio: formData.precio ? parseFloat(formData.precio) : 0,

            // datos hardcodeados guarramente por ahora
            publicado: true,
            estadoVerificacion: "APROBADO"
        };

        try {
            // envio pasando token de seguridad
            const respuesta = await publicarAgente(agentePayload, token);
            setLoading(false);
            alert(`Agente "${respuesta.nombre}" publicado correctamente.`)
            navigate("/desarrollador/mis-agentes");
        } catch (error) {
            setLoading(false);
            console.error("Error al publicar:", error);
            alert("Hubo un problema con el servidor, revisar consola");
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <DesarrolladorNavbar />

            <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Subir Nuevo Agente de IA</h1>
                    <p className="text-slate-500 dark:text-slate-400">Rellena las características principales para publicar tu agente en el marketplace. Recuerda revisar la <Link to="/desarrollador/documentacion" className="text-purple-600 hover:underline">documentación</Link>.</p>
                </div>

                <div className="bg-white dark:bg-[#1a2230] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Básicos */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nombre del Agente</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: SuperCopyWriter IA" className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Descripción Corta</label>
                                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="2" placeholder="Un breve resumen de lo que hace (max 150 caracteres)" className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none resize-none" required></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Categoría</label>
                                <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none">
                                    <option value="productividad">Productividad</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="datos">Análisis de Datos</option>
                                    <option value="atencion">Atención al Cliente</option>
                                    <option value="desarrollo">Desarrollo de Software</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Modelo Base</label>
                                <select name="modelo" value={formData.modelo} onChange={handleChange} className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none">
                                    <option value="gpt-4o">GPT-4o (OpenAI)</option>
                                    <option value="gpt-4-turbo">GPT-4 Turbo (OpenAI)</option>
                                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (OpenAI)</option>
                                    <option value="claude-3-opus">Claude 3 Opus (Anthropic)</option>
                                    <option value="phi-3-mini">Phi-3-Mini (Microsoft/Local)</option>
                                </select>
                            </div>
                        </div>

                        {/* Técnico */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">System Prompt <span className="text-xs font-normal text-slate-500">(Instrucciones principales)</span></label>
                            <textarea name="systemPromt" value={formData.systemPromt} onChange={handleChange} rows="5" placeholder="Eres un asistente experto en..." className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 font-mono text-sm focus:ring-2 focus:ring-purple-500/50 outline-none resize-y" required></textarea>
                        </div>

                        {/* Archivo ZIP */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Archivos del Proyecto <span className="text-xs font-normal text-slate-500">(.zip)</span></label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-[#1a2230] hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <i className="fa-solid fa-file-zipper text-3xl mb-3 text-purple-500 dark:text-purple-400"></i>
                                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold text-purple-600 dark:text-purple-400">Haz clic para subir</span> o arrastra y suelta el archivo</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">ZIP, RAR (MAX. 50MB)</p>
                                    </div>
                                    <input type="file" name="archivoZip" accept=".zip,.rar" onChange={handleChange} className="hidden" />
                                </label>
                            </div>
                            {formData.archivoZip && (
                                <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                                    <i className="fa-solid fa-check-circle"></i> Archivo seleccionado: {formData.archivoZip.name}
                                </p>
                            )}
                        </div>

                        {/* Detalles para la Venta */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-slate-200 dark:border-slate-800 pt-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tecnologías Usadas</label>
                                <input type="text" name="tecnologias" value={formData.tecnologias} onChange={handleChange} placeholder="Ej: Python, LangChain, Pinecone..." className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Precio de Venta (USD)</label>
                                <input type="number" name="precio" value={formData.precio} onChange={handleChange} placeholder="Ej: 49" min="0" className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Posibilidades del Agente</label>
                                <input type="text" name="posibilidades" value={formData.posibilidades} onChange={handleChange} placeholder="Ej: Clasifica correos, genera excels de resumen, responde quejas automáticas..." className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Aplicación en Negocios</label>
                                <input type="text" name="negocios" value={formData.negocios} onChange={handleChange} placeholder="Ej: Departamentos de RRHH, clínicas dentales, ecommerce de moda..." className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none" required />
                            </div>
                        </div>

                        {/* Enviar */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex justify-end">
                            <button type="submit" disabled={loading} className={`px-8 py-3 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${loading ? 'bg-purple-400 cursor-not-allowed text-white' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30'}`}>
                                {loading ? (
                                    <><i className="fa-solid fa-circle-notch fa-spin"></i> Subiendo...</>
                                ) : (
                                    <><i className="fa-solid fa-rocket"></i> Publicar Agente</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
