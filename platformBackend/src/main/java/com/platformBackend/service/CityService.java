package com.platformBackend.service;

import com.platformBackend.model.entity.CityEntity;
import com.platformBackend.repository.CityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CityService {
    private final CityRepository cityRepository;

    public List<CityEntity> findAll() {
        return cityRepository.findAll();
    }
}
