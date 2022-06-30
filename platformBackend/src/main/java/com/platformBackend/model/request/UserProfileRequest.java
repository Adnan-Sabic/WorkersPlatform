package com.platformBackend.model.request;

import lombok.Data;

@Data
public class UserProfileRequest {
    private Integer cityId;
    private String firstName;
    private String lastName;
    private String contactNumber;
    private String about;
    private Boolean updateImage;
}
