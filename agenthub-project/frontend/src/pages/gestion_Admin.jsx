import React from 'react';

export default function AdminSystemScreen() {
    const users = [
        { id: 1, name: 'David López', email: 'david@agenthub.com', role: 'Usuario', status: 'Activo' },
        { id: 2, name: 'María Pérez', email: 'maria@agenthub.com', role: 'Desarrollador', status: 'Pendiente' },
        { id: 3, name: 'Carlos Ruiz', email: 'carlos@agenthub.com', role: 'Usuario', status: 'Activo' },
    ];

    const developerRequests = [
        { id: 1, name: 'Lucía Fernández', email: 'lucia.dev@mail.com', project: 'AI Travel Planner', date: '2025-03-11' },
        { id: 2, name: 'Javier Martín', email: 'javier.build@mail.com', project: 'Legal Assistant Pro', date: '2025-03-10' },
    ];

    const pendingAgents = [
        { id: 1, agentName: 'Sales Copilot', developer: 'Ana Gómez', category: 'Ventas', submittedAt: '2025-03-09', status: 'En espera' },
        { id: 2, agentName: 'Finance Helper', developer: 'Pedro Sánchez', category: 'Finanzas', submittedAt: '2025-03-08', status: 'En espera' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <nav className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-cyan-400/40 bg-slate-900 text-xs text-slate-400">
                            LOGO
                        </div>
                        <div>
                            <p className="text-lg font-semibold tracking-tight">Panel de Administración</p>
                            <p className="text-sm text-slate-400">Gestión interna del sistema</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm text-slate-400">Bienvenido</p>
                            <p className="font-medium text-white">Usuario Admin</p>
                        </div>
                        <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400 hover:bg-cyan-500/10">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="mb-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-8 shadow-2xl shadow-cyan-950/30">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">Administración del sistema</p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Control total de usuarios, desarrolladores y agentes</h1>
                    <p className="mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
                        Desde aquí podrás consultar usuarios registrados, revisar solicitudes de desarrolladores y gestionar las peticiones de agentes pendientes.
                    </p>
                </div>

                <div className="grid gap-8 xl:grid-cols-3">
                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Listar usuarios</h2>
                                <p className="mt-2 text-sm text-slate-400">Visualiza todos los usuarios registrados en la plataforma.</p>
                            </div>
                            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                                Usuarios
                            </span>
                        </div>

                        <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-200">
                            {/* TODO: Aquí irá la llamada a la API para obtener todos los usuarios */}
                            Datos de ejemplo para maquetación.
                        </div>

                        <div className="space-y-3">
                            {users.map((user) => (
                                <div key={user.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-cyan-500/30">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-white">{user.name}</p>
                                            <p className="text-sm text-slate-400">{user.email}</p>
                                        </div>
                                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{user.status}</span>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-300">Rol: {user.role}</p>
                                </div>
                            ))}
                        </div>

                        <button className="mt-6 w-full rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-400">
                            Ver todos los usuarios
                        </button>
                    </section>

                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Alta de desarrolladores</h2>
                                <p className="mt-2 text-sm text-slate-400">Revisa las solicitudes y decide si aprobar o rechazar el acceso.</p>
                            </div>
                            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                                Solicitudes
                            </span>
                        </div>

                        <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-200">
                            {/* TODO: Aquí irá la llamada a la API para obtener las solicitudes de desarrollador */}
                            Solicitudes simuladas para el diseño.
                        </div>

                        <div className="space-y-4">
                            {developerRequests.map((request) => (
                                <div key={request.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                                    <p className="font-semibold text-white">{request.name}</p>
                                    <p className="mt-1 text-sm text-slate-400">{request.email}</p>
                                    <p className="mt-2 text-sm text-slate-300">Proyecto: {request.project}</p>
                                    <p className="mt-1 text-xs text-slate-500">Fecha: {request.date}</p>

                                    <div className="mt-4 flex gap-3">
                                        <button className="flex-1 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
                                            Aprobar
                                        </button>
                                        <button className="flex-1 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20">
                                            Rechazar
                                        </button>
                                    </div>

                                    {/* TODO: Aquí irá la llamada a la API para aprobar o rechazar la solicitud */}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Peticiones de agentes</h2>
                                <p className="mt-2 text-sm text-slate-400">Consulta los agentes enviados por desarrolladores y pendientes de revisión.</p>
                            </div>
                            <span className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-300">
                                En revisión
                            </span>
                        </div>

                        <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-200">
                            {/* TODO: Aquí irá la llamada a la API para obtener las peticiones de agentes pendientes */}
                            Lista temporal de ejemplo.
                        </div>

                        <div className="space-y-4">
                            {pendingAgents.map((agent) => (
                                <div key={agent.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-fuchsia-500/30">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-white">{agent.agentName}</p>
                                            <p className="text-sm text-slate-400">Desarrollador: {agent.developer}</p>
                                        </div>
                                        <span className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-300">{agent.status}</span>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-300">Categoría: {agent.category}</p>
                                    <p className="mt-1 text-xs text-slate-500">Enviado: {agent.submittedAt}</p>

                                    <div className="mt-4 flex gap-3">
                                        <button className="flex-1 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400 hover:bg-cyan-500/10">
                                            Ver detalle
                                        </button>
                                        <button className="flex-1 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                                            Revisar
                                        </button>
                                    </div>

                                    {/* TODO: Aquí irá la llamada a la API para obtener el detalle o revisar la petición del agente */}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
