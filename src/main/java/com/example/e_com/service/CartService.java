package com.example.e_com.service;

import com.example.e_com.model.CartItem;
import com.example.e_com.model.Product;
import com.example.e_com.repository.CartItemRepository;
import com.example.e_com.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;

    public CartItem addToCart(String userId, String productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product is not found!!"));
        CartItem item = new CartItem();
        item.setUserId(userId);
        item.setProductId(product.getId());
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    public List<CartItem> getCartByUserId(String userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public void clearCart(String userId) {
        cartItemRepository.deleteByUserId(userId);
    }
}
