package com.platformBackend.controller;

import com.platformBackend.model.entity.CityEntity;
import com.platformBackend.service.CityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/cities")
@CrossOrigin("*")
@AllArgsConstructor
public class CityController {
    private final CityService cityService;

    @GetMapping
    @ResponseBody
    public List<CityEntity> findAll() {
        return cityService.findAll();
    }
}
