import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DesarrolladorNavbar from "../components/DesarrolladorNavbar";
import Footer from "../components/Footer";

// Asegúrate de tener esta función en tu conexion_api.js
import { enviarMensajeChat } from "../services/conexion_api";
import { getToken } from "../services/auth";

import { obtenerAgentePorId } from "../services/conexion_api";

export default function PantallaChat() {
  // Capturamos el ID del agente desde la URL (ej: /chat/1)
  const { idAgente } = useParams();

  // Estados del chat
  const [mensajes, setMensajes] = useState([
    {
      rol: "agente",
      texto:
        "¡Hola! Soy tu asistente de Inteligencia Artificial. ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [inputTexto, setInputTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  const [infoAgente, setInfoAgente] = useState(null);

  const [conversacionId, setConversacionId] = useState(null);

  // Referencia para hacer auto-scroll hacia abajo cuando haya mensajes nuevos
  const finalDelChatRef = useRef(null);
  useEffect(() => {
    finalDelChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    const cargarInfo = async () => {
      try {
        const datos = await obtenerAgentePorId(idAgente);
        setInfoAgente(datos);
      } catch (error) {
        console.error("No se pudo cargar la info del agente");
      }
    };
    cargarInfo();
  }, [idAgente]);

  useEffect(() => {
    const cargarConversacion = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const conversaciones = await fetch(
          `agenthub-production-e274.up.railway.app/api/chat/conversaciones/${idAgente}`,
          { headers: { Authorization: `Bearer ${token}` } },
        ).then((r) => r.json());

        if (conversaciones && conversaciones.length > 0) {
          const ultima = conversaciones[conversaciones.length - 1];
          setConversacionId(ultima.id);

          const mensajesHistorial = await fetch(
            `agenthub-production-e274.up.railway.app/api/chat/conversacion/${ultima.id}`,
            { headers: { Authorization: `Bearer ${token}` } },
          ).then((r) => r.json());

          if (mensajesHistorial && mensajesHistorial.length > 0) {
            const mensajesMapeados = mensajesHistorial.map((m) => ({
              rol: m.rol === "user" ? "usuario" : "agente",
              texto: m.contenido,
            }));
            setMensajes(mensajesMapeados);
          }
        }
      } catch (error) {
        console.error("Error cargando historial:", error);
      }
    };
    cargarConversacion();
  }, [idAgente]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!inputTexto.trim()) return;

    // 1. Añadimos el mensaje del usuario a la pantalla
    const mensajeUsuario = inputTexto;
    setMensajes((prev) => [...prev, { rol: "usuario", texto: mensajeUsuario }]);
    setInputTexto(""); // Limpiamos la barra
    setEscribiendo(true); // Ponemos los puntitos de "pensando..."

    try {
      const token = getToken();

      // 2. Enviamos el mensaje a tu Spring Boot
      const respuestaIA = await enviarMensajeChat(
        idAgente,
        mensajeUsuario,
        token,
        conversacionId,
      );

      // Guardar el conversacionId que devuelve el backend
      setConversacionId(respuestaIA.conversacionId);

      // 3. Añadimos la respuesta del agente a la pantalla
      setMensajes((prev) => [
        ...prev,
        { rol: "agente", texto: respuestaIA.respuesta },
      ]);
    } catch (error) {
      console.error("Error en el chat:", error);
      setMensajes((prev) => [
        ...prev,
        {
          rol: "agente",
          texto:
            "Lo siento, ha habido un error de conexión con mi servidor. Inténtalo de nuevo.",
        },
      ]);
    } finally {
      setEscribiendo(false);
    }
  };

  const eliminarConversacion = async () => {
    if (!conversacionId) return;
    if (!window.confirm("¿Seguro que quieres borrar esta conversación?"))
      return;

    try {
      const token = getToken();
      await fetch(
        `agenthub-production-e274.up.railway.app/api/chat/conversacion/${conversacionId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Resetear el estado
      setConversacionId(null);
      setMensajes([
        {
          rol: "agente",
          texto:
            "¡Hola! Soy tu asistente de Inteligencia Artificial. ¿En qué te puedo ayudar hoy?",
        },
      ]);
    } catch (error) {
      console.error("Error eliminando conversación:", error);
    }
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
      <DesarrolladorNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col py-2 px-4 md:px-8">
        {/* Cabecera del chat */}
        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-t-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm z-10">
          <Link
            to="/desarrollador/mis-agentes"
            className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-slate-600 dark:text-slate-300"></i>
          </Link>
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-inner">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              {/* AQUÍ PONEMOS EL NOMBRE REAL */}
              <h2 className="font-bold text-lg leading-tight">
                {infoAgente ? infoAgente.nombre : `Cargando agente...`}
              </h2>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {/* AQUÍ PONEMOS SU CATEGORÍA */}
                {infoAgente ? infoAgente.categoria : "Conectando"}
              </p>
            </div>
          </div>
          {/* Botón eliminar conversación */}
          {conversacionId && (
            <button
              onClick={eliminarConversacion}
              className="ml-auto size-10 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
              title="Eliminar conversación"
            >
              <i className="fa-solid fa-trash text-red-500 text-sm"></i>
            </button>
          )}
        </div>

        {/* Historial de Mensajes (Zona scrolleable) */}
        <div className="flex-1 bg-slate-50 dark:bg-[#151c26] border-x border-slate-200 dark:border-slate-800 p-4 md:p-6 overflow-y-auto flex flex-col gap-6">
          {mensajes.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.rol === "usuario" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  msg.rol === "usuario"
                    ? "bg-purple-600 text-white rounded-tr-sm"
                    : "bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-800 rounded-tl-sm text-slate-700 dark:text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                  {msg.texto}
                </p>
              </div>
            </div>
          ))}

          {/* Animación de "Pensando..." */}
          {escribiendo && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1.5 items-center h-12">
                <div className="size-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div
                  className="size-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="size-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
          <div ref={finalDelChatRef} />
        </div>

        {/* Input de texto para enviar mensaje */}
        <div className="bg-white dark:bg-[#1a2230] p-4 rounded-b-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <form onSubmit={manejarEnvio} className="flex gap-3">
            <input
              type="text"
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              placeholder="Escribe tu mensaje a la IA..."
              className="flex-1 h-12 px-5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1118] focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
              disabled={escribiendo}
            />
            <button
              type="submit"
              disabled={!inputTexto.trim() || escribiendo}
              className="h-12 w-12 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
