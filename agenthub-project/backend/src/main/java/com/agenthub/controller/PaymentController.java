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

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> crearPaymentIntent(@RequestBody Map<String, Integer> body) {
        Integer agenteId = body.get("agenteId");
        if (agenteId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "agenteId es obligatorio"));
        }

        try {
            AgenteResponse agente = agenteService.obtener(agenteId);
            long amountInCents = (long) (agente.getPrecio() * 100);

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
