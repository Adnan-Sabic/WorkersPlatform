package com.platformBackend.model.request;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
public class RegisterUserRequest {
    private String email;
    private String username;
    private String password;

    @Min(0)
    @Max(1)
    private Integer numImages;
}
