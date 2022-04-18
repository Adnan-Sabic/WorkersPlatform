package com.platformBackend.model.entity;

import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@Builder
public class City {
    @Id
    private ObjectId _id;
    @Indexed(unique = true)
    private String name;
}