package com.platformBackend.service;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.AdvertisementEntity;
import com.platformBackend.model.enums.AdvType;
import com.platformBackend.model.request.CreateAdvertisementRequest;
import com.platformBackend.model.request.EditAdvertisementRequest;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.model.response.OneAdvertisementResponse;
import com.platformBackend.repository.AdvertisementRepository;
import com.platformBackend.repository.CategoryRepository;
import com.platformBackend.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public Page<AdvertisementResponse> findAll(Pageable pageable, AdvType type, Integer categoryId, Integer cityId, String title, Integer ownerId, Boolean active) {
        return advertisementRepository.findAllByTypeAndCategory_IdAndUser_City_IdAndTitleContainingIgnoreCaseAndUser_IdAndIsActive(pageable, type.name(), categoryId, cityId, title, ownerId, active)
                .map(advertisement -> modelMapper.map(advertisement, AdvertisementResponse.class))
                .map(advertisementResponse -> {
                    advertisementResponse.setDaysAgo(ChronoUnit.DAYS.between(advertisementResponse.getCreated(), LocalDateTime.now()));
                    return advertisementResponse;
                });
    }

    public OneAdvertisementResponse findAdvertisementById(Integer advertisementId) throws NotFoundException {
        return modelMapper.map(advertisementRepository.findById(advertisementId).orElseThrow(NotFoundException::new), OneAdvertisementResponse.class);
    }

    public AdvertisementResponse createNewAdvertisement(Integer userId, CreateAdvertisementRequest newAdvertisement) throws NotFoundException {
        AdvertisementEntity advertisementEntity = modelMapper.map(newAdvertisement, AdvertisementEntity.class);
        advertisementEntity.setId(null);
        advertisementEntity.setUser(userRepository.getById(userId));
        advertisementEntity.setCategory(categoryRepository.getById(newAdvertisement.getCategoryId()));
        //TODO change when u create update pictures
        advertisementEntity.setImagesUrls(new String[]{"url1", "url2"});
        advertisementEntity = advertisementRepository.saveAndFlush(advertisementEntity);
        return modelMapper.map(advertisementRepository.findById(advertisementEntity.getId()).orElseThrow(NotFoundException::new), AdvertisementResponse.class);
    }

    public OneAdvertisementResponse editAdvertisementById(Integer ownerId, EditAdvertisementRequest advertisementRequest) throws NotFoundException {
        if (advertisementRepository.findByUser_IdAndId(ownerId, advertisementRequest.getId()).isPresent()) {
            AdvertisementEntity advertisementEntity = modelMapper.map(advertisementRequest, AdvertisementEntity.class);
            advertisementEntity.setUser(userRepository.getById(ownerId));
            advertisementEntity.setImagesUrls(new String[]{"url1", "url2"});
            advertisementEntity.setCategory(categoryRepository.getById(advertisementRequest.getCategoryId()));
            System.out.println("beforee " + advertisementEntity);
            advertisementEntity = advertisementRepository.saveAndFlush(advertisementEntity);
            System.out.println("after " + advertisementEntity);
            return modelMapper.map(advertisementRepository.findById(advertisementEntity.getId()).orElseThrow(NotFoundException::new), OneAdvertisementResponse.class);
        }
        return null;
    }

    public void deleteAdvertisementById(Integer id) throws NotFoundException {
        AdvertisementEntity advertisementEntity = advertisementRepository.findById(id).orElseThrow(NotFoundException::new);
        advertisementEntity.setIsActive(false);
        advertisementRepository.saveAndFlush(advertisementEntity);
    }
}
