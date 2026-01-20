package com.example.e_com.util;

import com.example.e_com.dto.*;
import com.example.e_com.model.*;

import java.util.List;
import java.util.stream.Collectors;

public class MapperUtil {

    private MapperUtil() {

    }
    public static UserResponseDto toUserResponse(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
    public static ProductResponseDto toProductResponse(Product product) {
        ProductResponseDto dto = new ProductResponseDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        return dto;
    }
    public static CreateOrderResponseDto toOrderResponse(Order order) {
        CreateOrderResponseDto dto = new CreateOrderResponseDto();
        dto.setOrderId(order.getId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        List<OrderItemDto> items = order.getItems().stream().map(item -> {
            OrderItemDto i = new OrderItemDto();
            i.setProductId(item.getProductId());
            i.setPrice(item.getPrice());
            i.setQuantity(item.getQuantity());
            return i;
        }).collect(Collectors.toList());
        dto.setItems(items);
        return dto;
    }
}
