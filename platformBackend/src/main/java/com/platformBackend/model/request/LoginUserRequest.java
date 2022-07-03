package com.platformBackend.model.request;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class LoginUserRequest {
    @Size(min = 6, max = 45)
    private String username;
    @Size(min = 8, max = 45)
    private String password;
}
