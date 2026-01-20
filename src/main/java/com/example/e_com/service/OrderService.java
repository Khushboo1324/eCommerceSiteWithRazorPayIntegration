package com.example.e_com.service;

import com.example.e_com.exception.BadRequestException;
import com.example.e_com.exception.ResourceNotFoundException;
import com.example.e_com.model.CartItem;
import com.example.e_com.model.Order;
import com.example.e_com.model.OrderItem;
import com.example.e_com.model.Product;
import com.example.e_com.repository.CartItemRepository;
import com.example.e_com.repository.OrderRepository;
import com.example.e_com.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderService {
        @Autowired
    private OrderRepository orderRepository;
        @Autowired
    private CartItemRepository cartItemRepository;
        @Autowired
    private ProductRepository productRepository;
    public Order createOrder(String userId) {

        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0;

        for (CartItem cartItem : cartItems) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("not dounf!!"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(product.getId());
            orderItem.setPrice(product.getPrice());
            orderItem.setQuantity(cartItem.getQuantity());

            totalAmount += product.getPrice() * cartItem.getQuantity();
            orderItems.add(orderItem);
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);
        order.setStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        // clear cart after order creation
        cartItemRepository.deleteByUserId(userId);

        return savedOrder;
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found!!"));
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }
}
