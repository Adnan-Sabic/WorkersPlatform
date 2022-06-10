package com.platformBackend.controller;

import com.platformBackend.model.entity.AdvertisementEntity;
import com.platformBackend.model.enums.AdvType;
import com.platformBackend.service.AdvertisementService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/advertisements")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @GetMapping
    @ResponseBody
    public List<AdvertisementEntity> findAll(
            @RequestParam(required = false) AdvType type,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Integer cityId,
            @RequestParam(required = false) String title,
            Pageable pageable) {
        return advertisementService.findAll(pageable, type, categoryId, cityId, title);
    }
}
