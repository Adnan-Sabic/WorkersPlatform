package com.platformBackend.model.response;

import com.platformBackend.model.entity.City;
import com.platformBackend.model.entity.additional.Type;
import lombok.Data;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdvertisementResponse {
    private ObjectId _id;
    private UserResponse userResponse;
    private CategoryResponse categoryResponse;
    private City cityResponse;
    private Type type;
    private LocalDateTime created;
    private Long daysAgo;
    private String name;
    private String description;
    private List<String> images;
    private BigDecimal price;
}
