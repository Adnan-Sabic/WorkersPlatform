package com.platformBackend.controller;

import com.platformBackend.model.entity.additional.Type;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.service.AdvertisementService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/advertisements")
@CrossOrigin(origins = "*")
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @Autowired
    public AdvertisementController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping
    @ResponseBody
    public List<AdvertisementResponse> findAll(
            @RequestParam(required = false) Type type,
            @RequestParam(required = false) ObjectId categoryId,
            @RequestParam(required = false) ObjectId cityId,
            @RequestParam(required = false, defaultValue = "") String title,
            Pageable pageable) {
        return advertisementService.findAll(pageable, type, categoryId, cityId, title);
    }
}
