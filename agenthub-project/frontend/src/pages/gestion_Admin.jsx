import React, { useEffect, useState } from "react";
import {
    obtenerDesarrolladoresPendientes,
    obtenerDesarrolladoresAprobados,
    obtenerDesarrolladoresRechazados,
    aprobarDesarrollador,
    rechazarDesarrollador,
    obtenerAgentes,
    buscarAgentes,
    obtenerAgentePorId,
    aprobarAgente,
    rechazarAgente,
} from "../services/adminService";

export default function AdminSystemScreen() {
    // =========================
    // ESTADOS
    // =========================
    // Aquí guardamos lo que viene del backend

    const [desarrolladoresPendientes, setDesarrolladoresPendientes] = useState([]);
    const [desarrolladoresAprobados, setDesarrolladoresAprobados] = useState([]);
    const [desarrolladoresRechazados, setDesarrolladoresRechazados] = useState([]);

    const [agentes, setAgentes] = useState([]);
    const [busquedaAgente, setBusquedaAgente] = useState("");
    const [detalleAgente, setDetalleAgente] = useState(null);

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    // =========================
    // CARGA INICIAL
    // =========================
    // Cuando se abre la pantalla, pedimos todos los datos

    useEffect(() => {
        cargarDatos();
    }, []);

    // Carga todo lo necesario del panel
    async function cargarDatos() {
        try {
            setLoading(true);
            setError("");
            setMensaje("");

            const [pendientes, aprobados, rechazados, listaAgentes] =
                await Promise.all([
                    obtenerDesarrolladoresPendientes(),
                    obtenerDesarrolladoresAprobados(),
                    obtenerDesarrolladoresRechazados(),
                    obtenerAgentes(),
                ]);

            setDesarrolladoresPendientes(Array.isArray(pendientes) ? pendientes : []);
            setDesarrolladoresAprobados(Array.isArray(aprobados) ? aprobados : []);
            setDesarrolladoresRechazados(Array.isArray(rechazados) ? rechazados : []);
            setAgentes(Array.isArray(listaAgentes) ? listaAgentes : []);
        } catch (err) {
            setError(err.message || "Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // DESARROLLADORES
    // =========================

    async function handleAprobarDesarrollador(id) {
        try {
            setError("");
            setMensaje("");
            await aprobarDesarrollador(id);
            setMensaje(`Desarrollador ${id} aprobado correctamente`);
            await cargarDatos();
        } catch (err) {
            setError(err.message || "No se pudo aprobar el desarrollador");
        }
    }

    async function handleRechazarDesarrollador(id) {
        try {
            setError("");
            setMensaje("");
            await rechazarDesarrollador(id);
            setMensaje(`Desarrollador ${id} rechazado correctamente`);
            await cargarDatos();
        } catch (err) {
            setError(err.message || "No se pudo rechazar el desarrollador");
        }
    }

    // =========================
    // AGENTES
    // =========================

    async function handleBuscarAgentes(e) {
        e.preventDefault();

        try {
            setError("");
            setMensaje("");
            setDetalleAgente(null);

            // Si el buscador está vacío, volvemos a listar todos
            if (!busquedaAgente.trim()) {
                const lista = await obtenerAgentes();
                setAgentes(Array.isArray(lista) ? lista : []);
                return;
            }

            const resultado = await buscarAgentes(busquedaAgente);
            setAgentes(Array.isArray(resultado) ? resultado : []);
        } catch (err) {
            setError(err.message || "Error al buscar agentes");
        }
    }

    async function handleVerDetalleAgente(id) {
        try {
            setError("");
            setMensaje("");
            const detalle = await obtenerAgentePorId(id);
            setDetalleAgente(detalle);
        } catch (err) {
            setError(err.message || "No se pudo obtener el detalle del agente");
        }
    }

    async function handleAprobarAgente(id) {
        try {
            setError("");
            setMensaje("");
            await aprobarAgente(id);
            setMensaje(`Agente ${id} aprobado correctamente`);
            await cargarDatos();
        } catch (err) {
            setError(err.message || "No se pudo aprobar el agente");
        }
    }

    async function handleRechazarAgente(id) {
        try {
            setError("");
            setMensaje("");
            await rechazarAgente(id);
            setMensaje(`Agente ${id} rechazado correctamente`);
            await cargarDatos();
        } catch (err) {
            setError(err.message || "No se pudo rechazar el agente");
        }
    }

    // =========================
    // RENDER TARJETA DESARROLLADOR
    // =========================

    function renderDesarrolladorCard(dev, tipo = "pendiente") {
        return (
            <div
                key={dev.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="font-semibold text-white">
                            {dev.nombre || dev.name || `Desarrollador #${dev.id}`}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                            {dev.email || dev.correo || "Sin email"}
                        </p>
                    </div>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {dev.estado || dev.status || tipo}
                    </span>
                </div>

                {(dev.proyecto || dev.project) && (
                    <p className="mt-2 text-sm text-slate-300">
                        Proyecto: {dev.proyecto || dev.project}
                    </p>
                )}

                {(dev.fecha || dev.date || dev.createdAt) && (
                    <p className="mt-1 text-xs text-slate-500">
                        Fecha: {dev.fecha || dev.date || dev.createdAt}
                    </p>
                )}

                {/* Solo mostramos botones si es pendiente */}
                {tipo === "pendiente" && (
                    <div className="mt-4 flex gap-3">
                        <button
                            onClick={() => handleAprobarDesarrollador(dev.id)}
                            className="flex-1 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                        >
                            Aprobar
                        </button>

                        <button
                            onClick={() => handleRechazarDesarrollador(dev.id)}
                            className="flex-1 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                        >
                            Rechazar
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // =========================
    // RENDER TARJETA AGENTE
    // =========================

    function renderAgenteCard(agent) {
        return (
            <div
                key={agent.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-fuchsia-500/30"
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="font-semibold text-white">
                            {agent.nombre || agent.agentName || `Agente #${agent.id}`}
                        </p>
                        <p className="text-sm text-slate-400">
                            {agent.desarrollador ||
                                agent.developer ||
                                agent.email ||
                                "Sin desarrollador"}
                        </p>
                    </div>

                    <span className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-300">
                        {agent.estado || agent.status || "Sin estado"}
                    </span>
                </div>

                {(agent.categoria || agent.category) && (
                    <p className="mt-3 text-sm text-slate-300">
                        Categoría: {agent.categoria || agent.category}
                    </p>
                )}

                {(agent.createdAt || agent.submittedAt) && (
                    <p className="mt-1 text-xs text-slate-500">
                        Enviado: {agent.createdAt || agent.submittedAt}
                    </p>
                )}

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <button
                        onClick={() => handleVerDetalleAgente(agent.id)}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400 hover:bg-cyan-500/10"
                    >
                        Ver detalle
                    </button>

                    <button
                        onClick={() => handleAprobarAgente(agent.id)}
                        className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Aprobar
                    </button>

                    <button
                        onClick={() => handleRechazarAgente(agent.id)}
                        className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                        Rechazar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* CABECERA */}
            <nav className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-cyan-400/40 bg-slate-900 text-xs text-slate-400">
                            LOGO
                        </div>
                        <div>
                            <p className="text-lg font-semibold tracking-tight">
                                Panel de Administración
                            </p>
                            <p className="text-sm text-slate-400">Gestión real del sistema</p>
                        </div>
                    </div>

                    <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400 hover:bg-cyan-500/10">
                        Logout
                    </button>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                {/* CABECERA DEL CONTENIDO */}
                <div className="mb-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-8 shadow-2xl shadow-cyan-950/30">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                        Administración del sistema
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Control de desarrolladores y agentes
                    </h1>
                    <p className="mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
                        Desde aquí puedes aprobar, rechazar y consultar desarrolladores y
                        agentes del sistema.
                    </p>
                </div>

                {/* MENSAJES */}
                {loading && (
                    <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-200">
                        Cargando datos...
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                        {error}
                    </div>
                )}

                {mensaje && (
                    <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
                        {mensaje}
                    </div>
                )}

                {/* BLOQUE DESARROLLADORES */}
                <div className="grid gap-8 xl:grid-cols-3">
                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Desarrolladores pendientes
                        </h2>

                        <div className="space-y-4">
                            {desarrolladoresPendientes.length > 0 ? (
                                desarrolladoresPendientes.map((dev) =>
                                    renderDesarrolladorCard(dev, "pendiente")
                                )
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No hay desarrolladores pendientes.
                                </p>
                            )}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Desarrolladores aprobados
                        </h2>

                        <div className="space-y-4">
                            {desarrolladoresAprobados.length > 0 ? (
                                desarrolladoresAprobados.map((dev) =>
                                    renderDesarrolladorCard(dev, "aprobado")
                                )
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No hay desarrolladores aprobados.
                                </p>
                            )}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                        <h2 className="mb-4 text-2xl font-semibold">
                            Desarrolladores rechazados
                        </h2>

                        <div className="space-y-4">
                            {desarrolladoresRechazados.length > 0 ? (
                                desarrolladoresRechazados.map((dev) =>
                                    renderDesarrolladorCard(dev, "rechazado")
                                )
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No hay desarrolladores rechazados.
                                </p>
                            )}
                        </div>
                    </section>
                </div>

                {/* BLOQUE AGENTES */}
                <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">Gestión de agentes</h2>
                            <p className="mt-2 text-sm text-slate-400">
                                Aquí puedes listar, buscar, ver detalle, aprobar y rechazar
                                agentes.
                            </p>
                        </div>

                        {/* FORMULARIO DE BÚSQUEDA */}
                        <form
                            onSubmit={handleBuscarAgentes}
                            className="flex w-full max-w-xl gap-3"
                        >
                            <input
                                type="text"
                                value={busquedaAgente}
                                onChange={(e) => setBusquedaAgente(e.target.value)}
                                placeholder="Buscar agente..."
                                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                            >
                                Buscar
                            </button>

                            <button
                                type="button"
                                onClick={cargarDatos}
                                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:bg-cyan-500/10"
                            >
                                Recargar
                            </button>
                        </form>
                    </div>

                    {/* DETALLE DEL AGENTE */}
                    {detalleAgente && (
                        <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                            <h3 className="mb-3 text-lg font-semibold text-cyan-300">
                                Detalle del agente
                            </h3>

                            {/* Lo mostramos en JSON para que veas exactamente lo que devuelve el backend */}
                            <pre className="overflow-auto whitespace-pre-wrap text-sm text-slate-200">
                                {JSON.stringify(detalleAgente, null, 2)}
                            </pre>
                        </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {agentes.length > 0 ? (
                            agentes.map((agent) => renderAgenteCard(agent))
                        ) : (
                            <p className="text-sm text-slate-500">
                                No hay agentes para mostrar.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
