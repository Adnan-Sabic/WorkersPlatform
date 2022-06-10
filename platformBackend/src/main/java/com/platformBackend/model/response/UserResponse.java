package com.platformBackend.model.response;

import lombok.Data;

@Data
public class UserResponse {
    private Integer id;
    private String firstName;
    private String lastName;
    private String contactNumber;
}
