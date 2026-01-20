package com.example.e_com.controller;

import com.example.e_com.dto.UserRequestDto;
import com.example.e_com.dto.UserResponseDto;
import com.example.e_com.model.User;
import com.example.e_com.service.UserService;
import com.example.e_com.util.MapperUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponseDto createUser(@RequestBody UserRequestDto dto) {

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());

        return MapperUtil.toUserResponse(userService.createUser(user));
    }
}
