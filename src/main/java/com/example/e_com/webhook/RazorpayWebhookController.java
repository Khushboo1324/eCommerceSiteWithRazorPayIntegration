package com.example.e_com.webhook;

import com.example.e_com.exception.ResourceNotFoundException;
import com.example.e_com.model.Order;
import com.example.e_com.model.Payment;
import com.example.e_com.repository.OrderRepository;
import com.example.e_com.repository.PaymentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/webhooks")
public class RazorpayWebhookController {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public RazorpayWebhookController(PaymentRepository paymentRepository,
                                     OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/payment")
    public ResponseEntity<String> handlePaymentWebhook(
            @RequestBody Map<String, Object> payload) {
        if (!payload.containsKey("payload")) {
            return new ResponseEntity<>("Invalid webhook payload", HttpStatus.BAD_REQUEST);
        }
        Map<String, Object> payloadData =
                (Map<String, Object>) payload.get("payload");

        Map<String, Object> paymentObject =
                (Map<String, Object>) payloadData.get("payment");
        if (paymentObject == null) {
            return new ResponseEntity<>("Payment object missing", HttpStatus.BAD_REQUEST);
        }
        Map<String, Object> paymentEntity =
                (Map<String, Object>) paymentObject.get("entity");

        if (paymentEntity == null) {
            return new ResponseEntity<>("Payment entity missing", HttpStatus.BAD_REQUEST);
        }
        String razorpayOrderId = (String) paymentEntity.get("order_id");
        String razorpayPaymentId = (String) paymentEntity.get("id");
        String status = (String) paymentEntity.get("status");

        if (razorpayOrderId == null || status == null) {
            return new ResponseEntity<>("Invalid payment data", HttpStatus.BAD_REQUEST);
        }

        Payment payment = paymentRepository
                .findByRazorpayOrderId(razorpayOrderId).orElseThrow(()->new ResourceNotFoundException("Not found"));

        boolean success = "captured".equalsIgnoreCase(status);

        payment.setRazorpayPaymentId(razorpayPaymentId);
        payment.setStatus(success ? "SUCCESS" : "FAILED");
        payment.setCreatedAt(LocalDateTime.now());
        paymentRepository.save(payment);
        Order order = orderRepository.findById(payment.getOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        order.setStatus(success ? "PAID" : "FAILED");
        orderRepository.save(order);

        return new ResponseEntity<>("Webhook processed successfully", HttpStatus.OK);
    }
}
