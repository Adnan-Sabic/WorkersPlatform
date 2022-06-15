package com.platformBackend.controller;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.model.request.RegisterUserRequest;
import com.platformBackend.model.response.UserResponse;
import com.platformBackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @GetMapping
    @ResponseBody
    public List<UserEntity> findAll() {
        return userService.findAll();
    }

    @PostMapping
    @ResponseBody
    public UserResponse registerUser(@RequestBody RegisterUserRequest newUser) throws NotFoundException {
        return userService.registerUser(newUser);
    }
}
