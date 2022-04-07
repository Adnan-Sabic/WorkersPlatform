package com.platformBackend.model.entity;

import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class Address {
    private ObjectId cityId;
    private String street;

    public Address(ObjectId cityId, String street) {
        this.cityId = cityId;
        this.street = street;
    }
}
