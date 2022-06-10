package com.platformBackend.service;

import com.platformBackend.model.entity.AdvertisementEntity;
import com.platformBackend.model.enums.AdvType;
import com.platformBackend.repository.AdvertisementRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final ModelMapper modelMapper;

    public List<AdvertisementEntity> findAll(Pageable pageable, AdvType type, Integer categoryId, Integer cityId, String title) {
//        return mongoTemplate.find(query, Advertisement.class)
//                .stream()
//                .map(advertisement -> modelMapper.map(advertisement, AdvertisementResponse.class))
//                .map(advertisementResponse -> {
//                    advertisementResponse.setDaysAgo(ChronoUnit.DAYS.between(advertisementResponse.getCreated(), LocalDateTime.now()));
//                    return advertisementResponse;
//                })
//                .collect(Collectors.toList());
        System.out.println(advertisementRepository.findAll());
        return advertisementRepository.findAll();
    }

}
