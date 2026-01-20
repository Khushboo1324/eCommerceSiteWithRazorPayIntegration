package com.example.e_com.controller;

import com.example.e_com.dto.AddToCartRequestDto;
import com.example.e_com.model.CartItem;
import com.example.e_com.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody AddToCartRequestDto dto) {
        return cartService.addToCart(
                dto.getUserId(),
                dto.getProductId(),
                dto.getQuantity()
        );
    }

    @GetMapping("/{userId}")
    public List<CartItem> viewCart(@PathVariable String userId) {
        return cartService.getCartByUserId(userId);
    }

    @DeleteMapping("/{userId}/clear")
    public void clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
    }
}
