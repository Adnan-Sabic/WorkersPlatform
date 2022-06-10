package com.platformBackend.model.response;

import com.platformBackend.model.entity.CityEntity;
import com.platformBackend.model.enums.AdvType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdvertisementResponse {
    private Integer id;
    private UserResponse userResponse;
    private CategoryResponse categoryResponse;
    private CityEntity cityResponse;
    private AdvType type;
    private LocalDateTime created;
    private Long daysAgo;
    private String name;
    private String description;
    private List<String> images;
    private BigDecimal price;
}
