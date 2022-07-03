package com.platformBackend.model.request;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class RegisterUserRequest {
    @Email
    @NotNull
    private String email;
    @NotNull
    @Size(min = 6, max = 45)
    private String username;
    @NotNull
    @Size(min = 8, max = 45)
    private String password;
}
