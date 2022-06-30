package com.platformBackend.service;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.AdvertisementEntity;
import com.platformBackend.model.enums.AdvType;
import com.platformBackend.model.helpers.ImageWithUid;
import com.platformBackend.model.request.CreateAdvertisementRequest;
import com.platformBackend.model.request.EditAdvertisementRequest;
import com.platformBackend.model.response.AdvertisementResponse;
import com.platformBackend.model.response.EditAdvertisementResponse;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    private final S3Service s3Service;

    public Page<AdvertisementResponse> findAll(Pageable pageable, AdvType type, Integer categoryId, Integer cityId, String title, Integer ownerId, Boolean active) {
        return advertisementRepository.findAllByTypeAndCategory_IdAndUser_City_IdAndTitleContainingIgnoreCaseAndUser_IdAndIsActive(pageable, type.name(), categoryId, cityId, title, ownerId, active)
                .map(advertisement -> modelMapper.map(advertisement, AdvertisementResponse.class))
                .map(advertisementResponse -> {
                    advertisementResponse.setDaysAgo(ChronoUnit.DAYS.between(advertisementResponse.getCreated(), LocalDateTime.now()));
                    advertisementResponse.setPresignedUrls(advertisementResponse.getPresignedUrls().stream().map(s3Service::getFile).collect(Collectors.toList()));
                    return advertisementResponse;
                });
    }

    public OneAdvertisementResponse findAdvertisementById(Integer advertisementId) throws NotFoundException {
        OneAdvertisementResponse response = modelMapper.map(advertisementRepository.findById(advertisementId).orElseThrow(NotFoundException::new), OneAdvertisementResponse.class);
        response.setImagesWithUid(response.getImages().stream().map(uuid -> new ImageWithUid(uuid, s3Service.getFile(uuid))).collect(Collectors.toList()));
        return response;
    }

    public AdvertisementResponse createNewAdvertisement(Integer userId, CreateAdvertisementRequest newAdvertisement) throws NotFoundException {
        AdvertisementEntity advertisementEntity = modelMapper.map(newAdvertisement, AdvertisementEntity.class);
        advertisementEntity.setId(null);
        advertisementEntity.setUser(userRepository.getById(userId));
        advertisementEntity.setCategory(categoryRepository.getById(newAdvertisement.getCategoryId()));

        List<String> uuids = new ArrayList<>();
        for (int i = 0; i < newAdvertisement.getNumberOfImages(); ++i) {
            uuids.add(UUID.randomUUID().toString());
        }
        advertisementEntity.setImagesUrls(uuids.toArray(new String[newAdvertisement.getNumberOfImages()]));
        advertisementEntity = advertisementRepository.saveAndFlush(advertisementEntity);
        AdvertisementResponse advertisementResponse = modelMapper.map(advertisementRepository.findById(advertisementEntity.getId()).orElseThrow(NotFoundException::new), AdvertisementResponse.class);
        advertisementResponse.setPresignedUrls(advertisementResponse.getPresignedUrls().stream().map(s3Service::uploadFile).collect(Collectors.toList()));
        return advertisementResponse;
    }

    public EditAdvertisementResponse editAdvertisementById(Integer ownerId, EditAdvertisementRequest advertisementRequest) throws NotFoundException {
        if (advertisementRepository.findByUser_IdAndId(ownerId, advertisementRequest.getId()).isPresent()) {
            AdvertisementEntity noChangedEntity = advertisementRepository.getById(advertisementRequest.getId());
            AdvertisementEntity advertisementEntity = modelMapper.map(advertisementRequest, AdvertisementEntity.class);
            advertisementEntity.setUser(userRepository.getById(ownerId));
            advertisementEntity.setCategory(categoryRepository.getById(advertisementRequest.getCategoryId()));

            List<String> newUuids = new ArrayList<>();
            List<String> newListOfUrls = new ArrayList<>();
            for (String imageUid : advertisementRequest.getImagesUid()) {
                if (Arrays.asList(noChangedEntity.getImagesUrls()).contains(imageUid)) {
                    newListOfUrls.add(imageUid);
                } else {
                    newUuids.add(UUID.randomUUID().toString());
                }
            }
            newListOfUrls.addAll(newUuids);
            advertisementEntity.setImagesUrls(newListOfUrls.toArray(new String[0]));

            advertisementEntity = advertisementRepository.saveAndFlush(advertisementEntity);
            EditAdvertisementResponse advertisementResponse = modelMapper.map(advertisementRepository.findById(advertisementEntity.getId()).orElseThrow(NotFoundException::new), EditAdvertisementResponse.class);
            advertisementResponse.setPresignedUrls(newUuids.stream().map(s3Service::uploadFile).collect(Collectors.toList()));
            return advertisementResponse;
        }
        return null;
    }

    public void deleteAdvertisementById(Integer id) throws NotFoundException {
        AdvertisementEntity advertisementEntity = advertisementRepository.findById(id).orElseThrow(NotFoundException::new);
        advertisementEntity.setIsActive(false);
        advertisementRepository.saveAndFlush(advertisementEntity);
    }
}
