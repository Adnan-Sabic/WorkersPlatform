package com.platformBackend.service;

import com.platformBackend.model.entity.Advertisement;
import com.platformBackend.model.entity.additional.Type;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.repository.AdvertisementRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final ModelMapper modelMapper;
    private final MongoTemplate mongoTemplate;


    public List<AdvertisementResponse> findAll(Pageable pageable, Type type, ObjectId categoryId, ObjectId cityId, String title) {
        Query query = new Query();
        if (type != null) {
            query.addCriteria(Criteria.where("type").is(type));
        }
        query.with(pageable);
        mongoTemplate.co
        return mongoTemplate.find(query, Advertisement.class)
                .stream()
                .map(advertisement -> modelMapper.map(advertisement, AdvertisementResponse.class))
                .map(advertisementResponse -> {
                    advertisementResponse.setDaysAgo(ChronoUnit.DAYS.between(advertisementResponse.getCreated(), LocalDateTime.now()));
                    return advertisementResponse;
                })
                .collect(Collectors.toList());

    }

}
