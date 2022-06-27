package com.platformBackend.model.response;

import com.platformBackend.model.enums.AdvType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OneAdvertisementResponse {
    private Integer id;
    private UserResponse user;
    private CategoryResponse category;
    private String cityName;
    private AdvType type;
    private LocalDateTime created;
    private Long daysAgo;
    private String title;
    private String description;
    private List<String> images;
    private BigDecimal price;
}
