import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ClienteNavbar from "../components/ClienteNavbar";
import Footer from "../components/Footer";
import { crearPaymentIntent, obtenerAgentePorId } from "../services/conexion_api";
import { getToken } from "../services/auth";

// Inicializar Stripe una sola vez con la clave pública del .env.local
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Formulario interno que usa los hooks de Stripe (debe estar dentro de <Elements>)
function CheckoutForm({ agente }) {
    const stripe = useStripe();
    const elements = useElements();

    const [mensaje, setMensaje] = useState(null);
    const [procesando, setProcesando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcesando(true);
        setMensaje(null);

        // confirmPayment envía los datos de tarjeta a Stripe directamente (nunca pasan por nuestro servidor)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // URL a la que Stripe redirige tras el pago (página de confirmación)
                return_url: `${window.location.origin}/cliente/pago-exitoso`,
            },
        });

        // Si hay error (tarjeta rechazada, etc.) lo mostramos aquí
        if (error) {
            setMensaje(error.message);
            setProcesando(false);
        }
        // Si no hay error, Stripe redirige sola a return_url
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

            {/* Formulario de tarjeta renderizado por Stripe */}
            <div className="bg-white dark:bg-[#1a2230] border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                <PaymentElement />
            </div>

            {mensaje && (
                <p className="text-sm text-red-500 font-medium">{mensaje}</p>
            )}

            <button
                type="submit"
                disabled={!stripe || procesando}
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

// Página principal: carga el agente y el clientSecret, luego monta <Elements>
export default function PagoAgente() {
    const { idAgente } = useParams();
    const navigate = useNavigate();

    const [agente, setAgente] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [error, setError] = useState(null);

    const token = getToken();

    const iniciarPago = useCallback(async () => {
        try {
            // 1. Obtener datos del agente para mostrar el resumen
            const agenteData = await obtenerAgentePorId(idAgente);
            setAgente(agenteData);

            // 2. Pedir al backend que cree el PaymentIntent y devuelva el clientSecret
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
