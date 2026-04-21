import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClienteNavbar from "../../components/ClienteNavbar";
import Footer from "../../components/Footer";

const STATUS = {
    succeeded: {
        icon: "fa-solid fa-check",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-500",
        title: "¡Pago completado!",
        body: 'Tu agente ya está disponible en "Mis Agentes". Puedes empezar a usarlo ahora mismo.',
    },
    processing: {
        icon: "fa-solid fa-spinner fa-spin",
        iconBg: "bg-blue-100 dark:bg-blue-900/30",
        iconColor: "text-blue-500",
        title: "Pago en proceso",
        body: "Tu pago está siendo procesado. Te notificaremos cuando se confirme.",
    },
    failed: {
        icon: "fa-solid fa-xmark",
        iconBg: "bg-red-100 dark:bg-red-900/30",
        iconColor: "text-red-500",
        title: "Pago fallido",
        body: "No pudimos completar tu pago. Por favor inténtalo de nuevo.",
    },
};

export default function PagoExitoso() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("succeeded");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const redirectStatus = params.get("redirect_status");

        if (redirectStatus === "succeeded") {
            setStatus("succeeded");
        } else if (redirectStatus === "processing") {
            setStatus("processing");
        } else if (redirectStatus) {
            setStatus("failed");
        }
    }, []);

    const current = STATUS[status];

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className={`size-20 ${current.iconBg} rounded-full flex items-center justify-center mb-6`}>
                    <i className={`${current.icon} text-3xl ${current.iconColor}`}></i>
                </div>

                <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
                    {current.title}
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-md">
                    {current.body}
                </p>

                <div className="flex gap-4">
                    {status === "failed" ? (
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                        >
                            Intentar de nuevo
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/cliente/mis-agentes")}
                            className="px-6 py-3 bg-[#136dec] hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                        >
                            Ver mis agentes
                        </button>
                    )}
                    <button
                        onClick={() => navigate("/cliente")}
                        className="px-6 py-3 bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        Seguir explorando
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
