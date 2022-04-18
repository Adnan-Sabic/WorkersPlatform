package com.platformBackend.model.entity;

import com.platformBackend.model.entity.additional.Type;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Document
public class Advertisement {
    @Id
    private ObjectId _id;
    private ObjectId userId;
    @DocumentReference(lazy = true, collection = "user", lookup = "{'userId' : ?#{#_id}}")
    private User user;
    private ObjectId categoryId;
    @DocumentReference(lazy = true, collection = "category", lookup = "{'categoryId' : ?#{#_id}}")
    private Category category;
    private Type type;
    @CreatedDate
    private LocalDateTime created;
    private String name;
    private String description;
    private List<String> images;
    private BigDecimal price;
    @Builder.Default
    private Boolean isActive = true;
}