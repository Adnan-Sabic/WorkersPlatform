package com.platformBackend.controller;

import com.platformBackend.model.enums.AdvType;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.service.AdvertisementService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/advertisements")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @GetMapping
    @ResponseBody
    public Page<AdvertisementResponse> findAll(
            @RequestParam(required = false, defaultValue = "ALL") AdvType type,
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(required = false) Integer cityId,
            @RequestParam(required = false) String title,
            @PageableDefault(sort = {}, size = 6) Pageable pageable) {
        return advertisementService.findAll(pageable, type, categoryId, cityId, title);
    }
}
