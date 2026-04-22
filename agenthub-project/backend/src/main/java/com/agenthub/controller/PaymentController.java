package com.agenthub.controller;

import com.agenthub.model.entity.Agente;
import com.agenthub.repository.AgenteRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final AgenteRepository agenteRepository;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> body) {
        try {
            Stripe.apiKey = stripeSecretKey;

            Integer agenteId = Integer.valueOf(body.get("agenteId").toString());

            Agente agente = agenteRepository.findById(agenteId)
                .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

            Long amount = (long)(agente.getPrecio() * 100);

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("usd")
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .build()
                )
                .putMetadata("agenteId", agenteId.toString())
                .build();

            PaymentIntent intent = PaymentIntent.create(params);

            return ResponseEntity.ok(Map.of("clientSecret", intent.getClientSecret()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}