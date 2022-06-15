package com.platformBackend.service;

import com.platformBackend.model.enums.AdvType;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.repository.AdvertisementRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
@AllArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final ModelMapper modelMapper;

    public Page<AdvertisementResponse> findAll(Pageable pageable, AdvType type, Integer categoryId, Integer cityId, String title) {
        return advertisementRepository.findAllByTypeAndCategory_IdAndUser_City_IdAndTitleContainingIgnoreCase(pageable, type.name(), categoryId, cityId, title)
                .map(advertisement -> modelMapper.map(advertisement, AdvertisementResponse.class))
                .map(advertisementResponse -> {
                    advertisementResponse.setDaysAgo(ChronoUnit.DAYS.between(advertisementResponse.getCreated(), LocalDateTime.now()));
                    return advertisementResponse;
                });
    }
}
