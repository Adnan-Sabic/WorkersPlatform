package com.platformBackend.model.entity.additional;

import com.platformBackend.model.entity.City;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Data
public class Address {
    private ObjectId cityId;
    @DocumentReference(lazy = true, collection = "city", lookup = "{'cityId' : ?#{#_id}}")
    private City city;
    private String street;

    public Address(ObjectId cityId, String street) {
        this.cityId = cityId;
        this.street = street;
    }
}
