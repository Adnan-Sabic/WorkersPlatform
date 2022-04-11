package com.platformBackend.service;

import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.repository.AdvertisementRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdvertisementService(AdvertisementRepository advertisementRepository, ModelMapper modelMapper) {
        this.advertisementRepository = advertisementRepository;
        this.modelMapper = modelMapper;
    }

    public List<AdvertisementResponse> findAll() {
        return advertisementRepository.findAll().stream().map(advertisement -> modelMapper.map(advertisement, AdvertisementResponse.class)).collect(Collectors.toList());
    }

}
