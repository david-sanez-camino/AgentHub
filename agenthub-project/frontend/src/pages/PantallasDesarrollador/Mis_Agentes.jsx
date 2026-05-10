import React, { useState, useEffect } from "react";
import DesarrolladorNavbar from "../../components/DesarrolladorNavbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  obtenerMisAgentes,
  editarAgente,
  eliminarAgente,
} from "../../services/conexion_api";
import { getToken } from "../../services/auth";

const CATEGORIAS = [
  { value: "productividad", label: "Productividad" },
  { value: "marketing", label: "Marketing" },
  { value: "datos", label: "Análisis de Datos" },
  { value: "atencion", label: "Atención al Cliente" },
  { value: "desarrollo", label: "Desarrollo de Software" },
  { value: "otro", label: "Otro" },
];

function ModalEditar({ agente, onClose, onGuardado }) {
  const [form, setForm] = useState({
    nombre: agente.nombre || "",
    descripcion: agente.descripcion || "",
    systemPromt: agente.systemPromt || "",
    modelo: agente.modelo || "",
    categoria: agente.categoria || "productividad",
    precio: agente.precio ?? "",
    urlMcp: "",
  });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      const token = getToken();
      const actualizado = await editarAgente(
        agente.id,
        {
          nombre: form.nombre,
          descripcion: form.descripcion,
          systemPromt: form.systemPromt,
          modelo: form.modelo,
          categoria: form.categoria,
          precio: Number(form.precio),
          urlMcp: form.urlMcp || null,
        },
        token,
      );
      onGuardado(actualizado);
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold">Editar Agente</h2>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <i className="fa-solid fa-xmark text-slate-500"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {agente.estadoVerificacion === "APROBADO" && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl text-sm text-amber-700 dark:text-amber-400">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              Al guardar, el agente volverá a estado PENDIENTE para re-revisión
              del admin.
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows="2"
              required
              className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Categoría
            </label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1a2230] focus:ring-2 focus:ring-purple-500/50 outline-none"
            >
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              System Prompt
            </label>
            <textarea
              name="systemPromt"
              value={form.systemPromt}
              onChange={handleChange}
              rows="4"
              required
              className="w-full p-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 font-mono text-sm focus:ring-2 focus:ring-purple-500/50 outline-none resize-y"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              URL MCP (opcional)
            </label>
            <input
              type="url"
              name="urlMcp"
              value={form.urlMcp}
              onChange={handleChange}
              placeholder="https://tu-servidor-mcp.com"
              className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Precio (USD)
            </label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              min="0"
              required
              className="w-full h-11 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-purple-500/50 outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={guardando}
              className="px-5 py-2.5 text-sm font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50"
            >
              {guardando ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                  Guardando...
                </>
              ) : (
                "Guardar cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ModalConfirmarBorrar({ agente, onClose, onConfirmar }) {
  const [borrando, setBorrando] = useState(false);
  const [error, setError] = useState(null);

  const handleBorrar = async () => {
    setBorrando(true);
    setError(null);
    try {
      const token = getToken();
      await eliminarAgente(agente.id, token);
      onConfirmar(agente.id);
    } catch (err) {
      setError(err.message || "Error al eliminar");
      setBorrando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-trash text-red-600 dark:text-red-400 text-lg"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold">Eliminar agente</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
          ¿Seguro que quieres eliminar{" "}
          <span className="font-bold">"{agente.nombre}"</span>? Solo es posible
          si no tiene compras activas.
        </p>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleBorrar}
            disabled={borrando}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50"
          >
            {borrando ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                Eliminando...
              </>
            ) : (
              "Sí, eliminar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MisAgentes() {
  const [misAgentes, setMisagentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agenteEditando, setAgenteEditando] = useState(null);
  const [agenteBorrando, setAgenteBorrando] = useState(null);
  const [valoracionesAgentes, setValoracionesAgentes] = useState({});

  useEffect(() => {
    const cargarAgentes = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const agentesReales = await obtenerMisAgentes(token);
        setMisagentes(agentesReales);
      } catch (error) {
        console.error("Error al cargar agentes:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarAgentes();
  }, []);

  useEffect(() => {
    if (misAgentes.length === 0) return;
    misAgentes.forEach((agente) => {
      fetch(
        `https://agenthub-production-e274.up.railway.app/api/valoraciones/agente/${agente.id}`,
      )
        .then((r) => r.json())
        .then((data) => {
          setValoracionesAgentes((prev) => ({
            ...prev,
            [agente.id]: { promedio: data.promedio, total: data.total },
          }));
        })
        .catch(() => {});
    });
  }, [misAgentes]);

  const handleGuardado = (actualizado) => {
    setMisagentes((prev) =>
      prev.map((a) => (a.id === actualizado.id ? actualizado : a)),
    );
    setAgenteEditando(null);
  };

  const handleEliminado = (id) => {
    setMisagentes((prev) => prev.filter((a) => a.id !== id));
    setAgenteBorrando(null);
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
      <DesarrolladorNavbar />

      {agenteEditando && (
        <ModalEditar
          agente={agenteEditando}
          onClose={() => setAgenteEditando(null)}
          onGuardado={handleGuardado}
        />
      )}

      {agenteBorrando && (
        <ModalConfirmarBorrar
          agente={agenteBorrando}
          onClose={() => setAgenteBorrando(null)}
          onConfirmar={handleEliminado}
        />
      )}

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Mis Agentes Publicados
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Gestiona el inventario de tus inteligencias artificiales activas
              en el marketplace.
            </p>
          </div>
          <Link
            to="/desarrollador/subir-agente"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Crear Nuevo Agente
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">
            <i className="fa-solid fa-spinner fa-spin text-3xl mb-3 text-purple-500"></i>
            <p>Cargando tu inventario de agentes...</p>
          </div>
        ) : misAgentes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1a2230] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <i className="fa-solid fa-box-open text-5xl mb-4 text-slate-400"></i>
            <h3 className="text-xl font-bold mb-2">
              Aún no tienes agentes publicados
            </h3>
            <p className="text-slate-500 mb-6">
              Sube tu primera inteligencia artificial al marketplace y empieza a
              generar ingresos.
            </p>
            <Link
              to="/desarrollador/subir-agente"
              className="text-purple-600 font-bold hover:underline"
            >
              Sube tu primer agente
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {misAgentes.map((agente) => (
              <div
                key={agente.id}
                className="bg-white dark:bg-[#1a2230] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-500/50 transition-all flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-4">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-inner">
                      <i className="fa-solid fa-robot"></i>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        agente.estadoVerificacion === "APROBADO"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : agente.estadoVerificacion === "RECHAZADO"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}
                    >
                      {agente.estadoVerificacion || "PENDIENTE"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1 truncate">
                    {agente.nombre}
                  </h3>
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                    {agente.categoria}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {agente.descripcion}
                  </p>

                  {valoracionesAgentes[agente.id]?.total > 0 ? (
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <i
                            key={s}
                            className={`fa-solid fa-star text-xs ${
                              s <=
                              Math.round(
                                valoracionesAgentes[agente.id]?.promedio || 0,
                              )
                                ? "text-amber-400"
                                : "text-slate-300 dark:text-slate-600"
                            }`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {valoracionesAgentes[agente.id]?.promedio} (
                        {valoracionesAgentes[agente.id]?.total} reseñas)
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2">
                      Sin valoraciones aún
                    </p>
                  )}
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/20 flex-1">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Modelo:</span>
                      <span className="font-semibold">{agente.modelo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Precio:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ${agente.precio} USD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ventas:</span>
                      <span className="font-semibold">
                        {agente.ventas ?? 0}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between gap-2">
                  <Link
                    to={`/chat/${agente.id}`}
                    className="flex-1 flex items-center justify-center py-2 text-sm font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 rounded-lg transition-colors"
                  >
                    <i className="fa-solid fa-comment-dots mr-2"></i> Probar
                  </Link>
                  <button
                    onClick={() => setAgenteEditando(agente)}
                    className="flex-1 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <i className="fa-solid fa-pen mr-1"></i> Editar
                  </button>
                  <button
                    onClick={() => setAgenteBorrando(agente)}
                    className="flex-1 py-2 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                  >
                    <i className="fa-solid fa-trash mr-1"></i> Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
