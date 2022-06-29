package com.platformBackend.model.response;

import lombok.Data;

@Data
public class UserInfoResponse {
    private Integer id;
    private CityResponse city;
    private String firstName;
    private String lastName;
    private String contactNumber;
    private String about;
    private String imageUrl;
}
