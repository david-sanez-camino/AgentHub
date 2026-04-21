import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import ClienteNavbar from "../../components/ClienteNavbar";
import Footer from "../../components/Footer";
import { crearPaymentIntent, obtenerAgentePorId } from "../../services/conexion_api";
import { getToken } from "../../services/auth";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CheckoutForm({ agente }) {
    const stripe = useStripe();
    const elements = useElements();

    const [mensaje, setMensaje] = useState(null);
    const [procesando, setProcesando] = useState(false);

    // Cuando Stripe redirige de vuelta (p.ej. 3D Secure), comprueba el estado del pago
    useEffect(() => {
        if (!stripe) return;

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMensaje("¡Pago completado!");
                    break;
                case "processing":
                    setMensaje("Tu pago está siendo procesado.");
                    break;
                case "requires_payment_method":
                    setMensaje("El pago no se completó. Inténtalo de nuevo.");
                    break;
                default:
                    setMensaje("Ocurrió un error inesperado.");
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcesando(true);
        setMensaje(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/cliente/pago-exitoso`,
            },
        });

        // confirmPayment solo llega aquí si hay error; en caso de éxito redirige sola
        if (error.type === "card_error" || error.type === "validation_error") {
            setMensaje(error.message);
        } else {
            setMensaje("Ocurrió un error inesperado. Inténtalo de nuevo.");
        }

        setProcesando(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {agente.nombre}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {agente.descripcion}
                </p>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <span>Total</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                        ${agente.precio} USD
                    </span>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                <PaymentElement options={{ layout: "tabs" }} />
            </div>

            {mensaje && (
                <p className="text-sm font-medium text-red-500">{mensaje}</p>
            )}

            <button
                type="submit"
                disabled={!stripe || !elements || procesando}
                className="w-full py-4 bg-[#136dec] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-colors shadow-lg shadow-[#136dec]/30 text-lg"
            >
                {procesando ? "Procesando..." : `Pagar $${agente.precio} USD`}
            </button>

            <p className="text-xs text-center text-slate-400 dark:text-slate-600">
                Pago seguro procesado por Stripe. No almacenamos datos de tu tarjeta.
            </p>
        </form>
    );
}

export default function PagoAgente() {
    const { idAgente } = useParams();
    const navigate = useNavigate();

    const [agente, setAgente] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);

    const token = getToken();

    const iniciarPago = useCallback(async () => {
        try {
            const agenteData = await obtenerAgentePorId(idAgente);
            setAgente(agenteData);

            const { clientSecret: secret } = await crearPaymentIntent(Number(idAgente), token);
            setClientSecret(secret);
        } catch (err) {
            setError("No se pudo iniciar el pago. " + err.message);
        }
    }, [idAgente, token]);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        iniciarPago();
    }, [iniciarPago, token, navigate]);

    const appearance = {
        theme: "stripe",
        variables: { colorPrimary: "#136dec" },
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-[Inter]">
            <ClienteNavbar />

            <main className="flex-1 max-w-lg mx-auto px-6 py-16 w-full">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition-colors"
                >
                    ← Volver
                </button>

                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
                    Finalizar compra
                </h1>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {!error && (!agente || !clientSecret) && (
                    <p className="text-slate-500 dark:text-slate-400">Preparando pago...</p>
                )}

                {agente && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                        <CheckoutForm agente={agente} />
                    </Elements>
                )}
            </main>

            <Footer />
        </div>
    );
}
