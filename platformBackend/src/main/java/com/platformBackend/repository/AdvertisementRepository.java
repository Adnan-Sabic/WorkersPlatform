package com.platformBackend.repository;

import com.platformBackend.model.entity.AdvertisementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisementRepository extends JpaRepository<AdvertisementEntity, Integer> {
//    Page<Advertisement> findAllByTypeAndCategory__idAndNameContaining(Type type, ObjectId categoryId, String title, Pageable pageable);
}
