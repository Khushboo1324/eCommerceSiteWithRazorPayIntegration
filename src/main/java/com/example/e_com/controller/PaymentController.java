package com.example.e_com.controller;

import com.example.e_com.dto.CreatePaymentResponseDto;
import com.example.e_com.model.Payment;
import com.example.e_com.service.PaymentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{orderId}")
    public CreatePaymentResponseDto createPayment(
            @PathVariable String orderId) throws Exception {

        Payment payment = paymentService.createPayment(orderId);

        CreatePaymentResponseDto dto = new CreatePaymentResponseDto();
        dto.setRazorpayOrderId(payment.getRazorpayOrderId());
        dto.setCurrency("INR");
        dto.setAmount(payment.getAmount());

        return dto;
    }
}
