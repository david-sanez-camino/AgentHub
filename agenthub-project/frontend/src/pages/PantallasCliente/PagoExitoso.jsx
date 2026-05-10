import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken } from "../../services/auth";
import TopNavbar from "../../components/TopNavbar";

const API = "https://agenthub-production-e274.up.railway.app";

export default function PagoExitoso() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [estado, setEstado] = useState("procesando"); // "procesando" | "ok" | "error"

    useEffect(() => {
        const paymentIntentId = searchParams.get("payment_intent");
        const agenteId = searchParams.get("agenteId"); // lo añadiremos en el return_url

        if (!paymentIntentId || !agenteId) {
            setEstado("error");
            return;
        }

        const token = getToken();

        fetch(`${API}/api/payments/confirmar-compra`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ paymentIntentId, agenteId: Number(agenteId) }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.ok) {
                    setEstado("ok");
                    setTimeout(() => navigate("/cliente/mis-agentes"), 2500);
                } else {
                    setEstado("error");
                }
            })
            .catch(() => setEstado("error"));
    }, [searchParams, navigate]);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] min-h-screen flex flex-col font-[Inter]">
            <TopNavbar />
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
                {estado === "procesando" && (
                    <>
                        <div className="text-5xl mb-4 animate-spin">⏳</div>
                        <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200">
                            Confirmando tu compra...
                        </h1>
                    </>
                )}
                {estado === "ok" && (
                    <>
                        <div className="text-6xl mb-4">✅</div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
                            ¡Compra completada!
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            Redirigiendo a tus agentes...
                        </p>
                    </>
                )}
                {estado === "error" && (
                    <>
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-red-500 mb-2">
                            Algo salió mal
                        </h1>
                        <p className="text-slate-500 mb-6">
                            Tu pago se procesó pero no pudimos registrar la compra. Contacta soporte.
                        </p>
                        <button
                            onClick={() => navigate("/cliente")}
                            className="px-6 py-3 bg-[#136dec] text-white font-bold rounded-xl"
                        >
                            Volver al marketplace
                        </button>
                    </>
                )}
            </main>
        </div>
    );
}