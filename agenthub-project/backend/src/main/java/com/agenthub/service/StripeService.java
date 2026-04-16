package com.agenthub.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    // Clave secreta inyectada desde application.properties -> .env
    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    // Se ejecuta al arrancar el contexto de Spring para inicializar el SDK de Stripe
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    /**
     * Crea un PaymentIntent en Stripe para el importe indicado.
     *
     * @param amountInCents importe en centavos (ej: 999 = 9,99 USD)
     * @param currency      código ISO de moneda (ej: "usd", "eur")
     * @param description   descripción del pago (ej: nombre del agente)
     * @return clientSecret que el frontend necesita para completar el pago
     */
    public String crearPaymentIntent(long amountInCents, String currency, String description)
            throws StripeException {

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .setDescription(description)
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        return intent.getClientSecret();
    }
}
