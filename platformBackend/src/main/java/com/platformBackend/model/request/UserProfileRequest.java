package com.platformBackend.model.request;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class UserProfileRequest {
    private Integer cityId;
    @Size(max = 45)
    private String firstName;
    @Size(max = 45)
    private String lastName;
    @Size(max = 16)
    private String contactNumber;
    @Size(max = 1000)
    private String about;
    private Boolean updateImage;
}
