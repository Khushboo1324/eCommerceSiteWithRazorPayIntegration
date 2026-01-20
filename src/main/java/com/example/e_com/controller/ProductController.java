package com.example.e_com.controller;

import com.example.e_com.dto.ProductRequestDto;
import com.example.e_com.dto.ProductResponseDto;
import com.example.e_com.model.Product;
import com.example.e_com.service.ProductService;
import com.example.e_com.util.MapperUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ProductResponseDto createProduct(@RequestBody ProductRequestDto dto) {

        Product product = new Product();
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());

        return MapperUtil.toProductResponse(productService.createProduct(product));
    }

    @GetMapping
    public List<ProductResponseDto> getAllProducts() {
        return productService.getAllProducts()
                .stream()
                .map(MapperUtil::toProductResponse)
                .collect(Collectors.toList());
    }
}
