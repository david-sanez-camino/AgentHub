package com.agenthub.controller;

import com.agenthub.model.dto.AgenteResponse;
import com.agenthub.service.AgenteService;
import com.agenthub.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;
    private final AgenteService agenteService;

    /**
     * Crea un PaymentIntent para comprar un agente.
     * El cliente manda el ID del agente y el backend calcula el importe
     * consultando el precio del agente en la BD.
     *
     * POST /api/payments/create-payment-intent
     * Body: { "agenteId": 1 }
     * Respuesta: { "clientSecret": "pi_xxx_secret_xxx" }
     */
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> crearPaymentIntent(@RequestBody Map<String, Integer> body) {
        Integer agenteId = body.get("agenteId");
        if (agenteId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "agenteId es obligatorio"));
        }

        try {
            // Obtenemos el agente para leer su precio desde la BD
            AgenteResponse agente = agenteService.obtener(agenteId);

            // Stripe trabaja en centavos: precio (USD entero) * 100
            long amountInCents = agente.getPrecio() * 100L;

            String clientSecret = stripeService.crearPaymentIntent(
                    amountInCents,
                    "usd",
                    "Compra agente: " + agente.getNombre()
            );

            return ResponseEntity.ok(Map.of("clientSecret", clientSecret));

        } catch (StripeException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Error al procesar el pago: " + e.getMessage()));
        }
    }
}
