package com.example.e_com.controller;

import com.example.e_com.dto.CreateOrderResponseDto;
import com.example.e_com.model.Order;
import com.example.e_com.service.OrderService;
import com.example.e_com.util.MapperUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/{userId}")
    public CreateOrderResponseDto createOrder(@PathVariable String userId) {
        Order order = orderService.createOrder(userId);
        return MapperUtil.toOrderResponse(order);
    }

    @GetMapping("/{orderId}")
    public CreateOrderResponseDto getOrder(@PathVariable String orderId) {
        return MapperUtil.toOrderResponse(
                orderService.getOrderById(orderId)
        );
    }

    @GetMapping("/user/{userId}")
    public List<CreateOrderResponseDto> getOrdersByUser(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId)
                .stream()
                .map(MapperUtil::toOrderResponse)
                .collect(Collectors.toList());
    }
}
