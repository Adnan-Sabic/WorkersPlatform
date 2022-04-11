package com.platformBackend.controller;

import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("advertisements")
@CrossOrigin(origins = "*")
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @Autowired
    public AdvertisementController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping
    public List<AdvertisementResponse> findAll() {
        System.out.println(advertisementService.findAll());
        return advertisementService.findAll();
    }
}
