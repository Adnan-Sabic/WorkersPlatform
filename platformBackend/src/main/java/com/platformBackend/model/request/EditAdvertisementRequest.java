package com.platformBackend.model.request;

import lombok.Data;

@Data
public class EditAdvertisementRequest extends CreateAdvertisementRequest{
    private Integer id;
}
