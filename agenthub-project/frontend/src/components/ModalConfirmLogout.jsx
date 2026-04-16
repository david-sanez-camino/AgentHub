import React from "react";

export default function ModalConfirmLogout({ onConfirm, onCancel }) {
    return (
        // Fondo oscuro semitransparente
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a2230] border border-slate-700 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center">
                {/* Icono */}
                <div className="size-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" className="text-red-400">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">¿Cerrar sesión?</h2>
                <p className="text-slate-400 text-sm mb-8">
                    Tu sesión actual se cerrará y tendrás que volver a iniciar sesión para acceder.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 rounded-xl border border-slate-600 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
                    >
                        Sí, salir
                    </button>
                </div>
            </div>
        </div>
    );
}
