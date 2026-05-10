import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import { obtenerAgentePorId } from "../../services/conexion_api";
import { isLoggedIn } from "../../services/auth";
import { getToken } from "../../services/auth";
import { useSearchParams } from "react-router-dom";

const API = "https://agenthub-production-e274.up.railway.app";

const CATEGORIA_LABELS = {
  productividad: "Productividad",
  marketing: "Marketing",
  datos: "Análisis de Datos",
  atencion: "Atención al Cliente",
  desarrollo: "Desarrollo de Software",
  otro: "Otro",
};

const MODELO_LABELS = {
  "openai/gpt-oss-20b:free": "GPT OSS 20B",
  "anthropic/claude-3-haiku": "Claude 3 Haiku",
};

export default function DetalleAgente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agente, setAgente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [yaComprado, setYaComprado] = useState(false);
  const [searchParams] = useSearchParams();
  const fromMisAgentes = searchParams.get("from") === "mis-agentes";

  const [valoraciones, setValoraciones] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [totalValoraciones, setTotalValoraciones] = useState(0);
  const [yaValoro, setYaValoro] = useState(false);
  const [estrellaSeleccionada, setEstrellaSeleccionada] = useState(0);
  const [estrellaHover, setEstrellaHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviandoValoracion, setEnviandoValoracion] = useState(false);
  const [mensajeValoracion, setMensajeValoracion] = useState(null);

  useEffect(() => {
    obtenerAgentePorId(id)
      .then((data) => {
        setAgente(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "No se pudo cargar el agente");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${API}/api/payments/mis-agentes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setYaComprado(data.some((a) => String(a.id) === String(id)));
        }
      })
      .catch(() => {});
  }, [id]);
  useEffect(() => {
    fetch(`${API}/api/valoraciones/agente/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setValoraciones(data.valoraciones || []);
        setPromedio(data.promedio || 0);
        setTotalValoraciones(data.total || 0);
      })
      .catch(() => {});

    const token = getToken();
    if (!token) return;
    fetch(`${API}/api/valoraciones/agente/${id}/ya-valoro`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setYaValoro(data.yaValoro))
      .catch(() => {});
  }, [id]);

  const handleComprar = () => {
    if (!isLoggedIn()) {
      navigate("/login");
    } else {
      navigate(`/cliente/pagar/${id}`);
    }
  };

  const handleEnviarValoracion = async () => {
    if (estrellaSeleccionada === 0) return;
    setEnviandoValoracion(true);
    try {
      const token = getToken();
      const res = await fetch(`${API}/api/valoraciones/agente/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estrellas: estrellaSeleccionada, comentario }),
      });
      const data = await res.json();
      if (data.ok) {
        setYaValoro(true);
        setMensajeValoracion("¡Gracias por tu valoración!");
        // Recargar valoraciones
        fetch(`${API}/api/valoraciones/agente/${id}`)
          .then((r) => r.json())
          .then((d) => {
            setValoraciones(d.valoraciones || []);
            setPromedio(d.promedio || 0);
            setTotalValoraciones(d.total || 0);
          });
      } else {
        setMensajeValoracion(data.error || "Error al enviar valoración");
      }
    } catch {
      setMensajeValoracion("Error de conexión");
    } finally {
      setEnviandoValoracion(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen flex flex-col font-[Inter]">
        <TopNavbar />
        <main className="flex-1 flex items-center justify-center text-slate-500">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-purple-500 mr-3"></i>
          Cargando agente...
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !agente) {
    return (
      <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen flex flex-col font-[Inter]">
        <TopNavbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-500">
          <i className="fa-solid fa-circle-exclamation text-4xl text-red-400"></i>
          <p>{error || "Agente no encontrado"}</p>
          <button
            onClick={() =>
              navigate(fromMisAgentes ? "/cliente/mis-agentes" : "/marketplace")
            }
            className="mb-8 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
          >
            <i className="fa-solid fa-arrow-left"></i>
            {fromMisAgentes ? "Volver a Mis Agentes" : "Volver al marketplace"}
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const categoriaLabel = CATEGORIA_LABELS[agente.categoria] || agente.categoria;
  const modeloLabel = MODELO_LABELS[agente.modelo] || agente.modelo;

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
      <TopNavbar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <button
          onClick={() =>
            navigate(fromMisAgentes ? "/cliente/mis-agentes" : "/marketplace")
          }
          className="mb-8 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
        >
          <i className="fa-solid fa-arrow-left"></i>
          {fromMisAgentes ? "Volver a Mis Agentes" : "Volver al marketplace"}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Columna izquierda (2/3) ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cabecera */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#136dec] bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                  {categoriaLabel}
                </span>
              </div>
              <div className="flex items-start gap-5 mb-4">
                <div className="size-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-4xl shadow-lg shadow-purple-500/30 flex-shrink-0">
                  <i className="fa-solid fa-robot"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-1">
                    {agente.nombre}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Agente de inteligencia artificial · {categoriaLabel}
                  </p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <i className="fa-solid fa-align-left text-slate-400"></i>{" "}
                Descripción
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {agente.descripcion || "Sin descripción disponible."}
              </p>
            </div>

            {/* Detalles técnicos */}
            <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-microchip text-slate-400"></i>{" "}
                Detalles técnicos
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <i className="fa-solid fa-brain"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Modelo base
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {modeloLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <i className="fa-solid fa-tag"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Categoría
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      {categoriaLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="size-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Verificación
                    </p>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      Agente verificado
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Acceso</p>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      Inmediato tras compra
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Qué incluye */}
            <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-slate-400"></i> ¿Qué
                incluye?
              </h2>
              <ul className="space-y-3">
                {[
                  "Acceso al agente de IA en el marketplace",
                  "Chat ilimitado con el agente",
                  "Configuración optimizada para tu caso de uso",
                  "Modelo de lenguaje avanzado: " + modeloLabel,
                  "Soporte de herramientas especializadas",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <i className="fa-solid fa-check text-emerald-500 mt-0.5 flex-shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Valoraciones */}
            <div className="bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-star text-amber-400"></i> Valoraciones
                <span className="text-sm font-normal text-slate-500 ml-1">
                  ({totalValoraciones}{" "}
                  {totalValoraciones === 1 ? "reseña" : "reseñas"})
                </span>
              </h2>

              {totalValoraciones > 0 && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {promedio}
                  </span>
                  <div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <i
                          key={s}
                          className={`fa-solid fa-star text-lg ${s <= Math.round(promedio) ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {totalValoraciones} valoraciones
                    </p>
                  </div>
                </div>
              )}

              {yaComprado && !yaValoro && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                    Deja tu valoración
                  </p>
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onMouseEnter={() => setEstrellaHover(s)}
                        onMouseLeave={() => setEstrellaHover(0)}
                        onClick={() => setEstrellaSeleccionada(s)}
                        className="text-2xl transition-transform hover:scale-110"
                      >
                        <i
                          className={`fa-solid fa-star ${s <= (estrellaHover || estrellaSeleccionada) ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                        ></i>
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Cuéntanos tu experiencia con este agente... (opcional)"
                    rows={3}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1118] focus:ring-2 focus:ring-[#136dec]/30 outline-none transition-all resize-none mb-3"
                  />
                  <button
                    onClick={handleEnviarValoracion}
                    disabled={estrellaSeleccionada === 0 || enviandoValoracion}
                    className="px-5 py-2.5 bg-[#136dec] hover:bg-blue-600 text-white text-sm font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {enviandoValoracion ? "Enviando..." : "Enviar valoración"}
                  </button>
                  {mensajeValoracion && (
                    <p className="text-sm text-emerald-600 mt-2">
                      {mensajeValoracion}
                    </p>
                  )}
                </div>
              )}

              {yaValoro && (
                <div className="mb-4 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  <i className="fa-solid fa-circle-check"></i>
                  Ya has valorado este agente
                </div>
              )}

              {valoraciones.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">
                  Aún no hay valoraciones para este agente.
                </p>
              ) : (
                <div className="space-y-4">
                  {valoraciones.map((v) => (
                    <div
                      key={v.id}
                      className="border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {v.nombreUsuario}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <i
                              key={s}
                              className={`fa-solid fa-star text-xs ${s <= v.estrellas ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      {v.comentario && (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {v.comentario}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(v.fechaValoracion).toLocaleDateString(
                          "es-ES",
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* ── FIN col-span-2 ── */}

          {/* ── Columna derecha (1/3) — sticky ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white dark:bg-[#1a2230] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-5">
              <div>
                <p className="text-4xl font-black text-slate-900 dark:text-white">
                  {agente.precio ? `$${agente.precio}` : "Gratis"}
                  {agente.precio ? (
                    <span className="text-base font-normal text-slate-500 ml-1">
                      USD
                    </span>
                  ) : null}
                </p>
                {agente.precio > 0 && (
                  <p className="text-sm text-slate-500 mt-1">
                    Pago único · acceso permanente
                  </p>
                )}
              </div>

              <button
                onClick={
                  yaComprado
                    ? () => navigate(`/cliente/chat/${id}`)
                    : handleComprar
                }
                className="w-full py-4 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#136dec]/30 text-base flex items-center justify-center gap-2"
              >
                <i
                  className={`fa-solid ${yaComprado ? "fa-comments" : "fa-cart-shopping"}`}
                ></i>
                {yaComprado
                  ? "Abrir chat"
                  : isLoggedIn()
                    ? agente.precio
                      ? `Comprar — $${agente.precio} USD`
                      : "Obtener gratis"
                    : "Inicia sesión para comprar"}
              </button>

              {!isLoggedIn() && (
                <p className="text-xs text-center text-slate-400">
                  ¿No tienes cuenta?{" "}
                  <button
                    onClick={() => navigate("/crear_usuario")}
                    className="text-[#136dec] font-semibold hover:underline"
                  >
                    Regístrate gratis
                  </button>
                </p>
              )}

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <i className="fa-solid fa-lock text-xs w-4 text-center"></i>
                  Pago seguro con Stripe
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <i className="fa-solid fa-robot text-xs w-4 text-center"></i>
                  Acceso inmediato al agente
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <i className="fa-solid fa-shield-halved text-xs w-4 text-center"></i>
                  Agente verificado por AgentHub
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
