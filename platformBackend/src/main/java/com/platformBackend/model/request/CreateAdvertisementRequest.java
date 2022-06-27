package com.platformBackend.model.request;

import com.platformBackend.model.enums.AdvType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateAdvertisementRequest {
    private Integer categoryId;
    private AdvType type;
    private String title;
    private String description;
    private BigDecimal price;
    private String[] imagesUrls;
}
