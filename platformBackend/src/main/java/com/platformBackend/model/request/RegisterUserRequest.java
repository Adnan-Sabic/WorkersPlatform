package com.platformBackend.model.request;

import lombok.Data;

@Data
public class RegisterUserRequest {
    private String email;
    private String username;
    private String password;
}
