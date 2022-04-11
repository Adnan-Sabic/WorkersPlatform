package com.platformBackend.model.response;

import lombok.Data;

@Data
public class UserResponse {
    private String _id;
    private String firstName;
    private String lastName;
    private String contactNumber;
}
