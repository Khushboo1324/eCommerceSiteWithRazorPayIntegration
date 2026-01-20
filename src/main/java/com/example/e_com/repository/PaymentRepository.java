package com.example.e_com.repository;

import com.example.e_com.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment,String > {
    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
}
