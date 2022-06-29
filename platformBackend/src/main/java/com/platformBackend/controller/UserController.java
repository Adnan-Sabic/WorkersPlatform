package com.platformBackend.controller;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.model.request.RegisterUserRequest;
import com.platformBackend.model.request.UserProfileRequest;
import com.platformBackend.model.response.JwtUser;
import com.platformBackend.model.response.UserInfoResponse;
import com.platformBackend.model.response.UserProfileResponse;
import com.platformBackend.model.response.UserResponse;
import com.platformBackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
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

    @GetMapping("/{id}")
    @ResponseBody
    public UserProfileResponse getUserById(Authentication authentication, @PathVariable Integer id) throws NotFoundException {
//        JwtUser user = (JwtUser) authentication.getPrincipal();
        return userService.findUserById(id);
    }

    @GetMapping("/{id}/info")
    @ResponseBody
    public UserInfoResponse getUserById( @PathVariable Integer id) throws NotFoundException {
        return userService.findUserInfoById(id);
    }


    @PutMapping
    @ResponseBody
    public UserProfileResponse editUserById(Authentication authentication, @RequestBody UserProfileRequest userProfileRequest) {
        //We use id from token because that prevents users to modify other user data by simply sending id trough request object
        JwtUser user = (JwtUser) authentication.getPrincipal();
        return userService.editUserById(user.getId(), userProfileRequest);
    }
}
