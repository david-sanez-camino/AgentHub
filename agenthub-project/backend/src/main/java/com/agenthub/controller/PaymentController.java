package com.agenthub.controller;

import com.agenthub.model.entity.Agente;
import com.agenthub.repository.AgenteRepository;
import com.agenthub.service.CompraService;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.agenthub.service.CompraService;
import com.stripe.model.PaymentIntent;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

// trigger redeploy

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final AgenteRepository agenteRepository;
    private final CompraService compraService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Map<String, Object> body) {
        try {
            Stripe.apiKey = stripeSecretKey;

            Integer agenteId = Integer.valueOf(body.get("agenteId").toString());

            Agente agente = agenteRepository.findById(agenteId)
                    .orElseThrow(() -> new RuntimeException("Agente no encontrado"));

            Long amount = (long) (agente.getPrecio() * 100);

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amount)
                    .setCurrency("usd")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build())
                    .putMetadata("agenteId", agenteId.toString())
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            return ResponseEntity.ok(Map.of("clientSecret", intent.getClientSecret()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/confirmar-compra")
    public ResponseEntity<?> confirmarCompra(
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            Stripe.apiKey = stripeSecretKey;

            String paymentIntentId = body.get("paymentIntentId").toString();
            Integer agenteId = Integer.valueOf(body.get("agenteId").toString());

            // Verificar con Stripe que el pago realmente está completado
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            if (!"succeeded".equals(intent.getStatus())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "El pago no está completado"));
            }

            compraService.confirmarCompra(userDetails.getUsername(), agenteId, paymentIntentId);
            return ResponseEntity.ok(Map.of("ok", true));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ---- Endpoint 2: mis agentes ----
    @GetMapping("/mis-agentes")
    public ResponseEntity<?> getMisAgentes(
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            var agentes = compraService.getAgentesComprados(userDetails.getUsername());
            return ResponseEntity.ok(agentes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}