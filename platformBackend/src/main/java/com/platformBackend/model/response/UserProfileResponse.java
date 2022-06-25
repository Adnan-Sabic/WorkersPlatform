package com.platformBackend.model.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserProfileResponse {
    private Integer id;
    private LocalDateTime created;
    private Integer cityId;
    private String firstName;
    private String lastName;
    private String contactNumber;
    private String email;
    private String username;
    private String about;
    private String imageUrl;
}
