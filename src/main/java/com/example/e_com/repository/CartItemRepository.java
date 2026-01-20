package com.example.e_com.repository;

import com.example.e_com.model.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.*;

public interface CartItemRepository extends MongoRepository<CartItem,String> {
    List<CartItem> findByUserId(String userId);

    void deleteByUserId(String userId);
}
