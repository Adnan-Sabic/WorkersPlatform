package com.platformBackend.repository;

import com.platformBackend.model.entity.AdvertisementEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdvertisementRepository extends JpaRepository<AdvertisementEntity, Integer> {
    @Query("""
            select a from AdvertisementEntity a where 
            (?1 is null or ?1 = 'ALL' or a.type = ?1) and 
            (?2 is null or a.category.id = ?2) and 
            (?3 is null or a.user.city.id = ?3) and 
            (?4 is null or upper(a.title) like upper(concat('%', ?4, '%'))) and
            (?5 is null or a.user.id = ?5) and
            (?6 is null or a.isActive = ?6)""")
    Page<AdvertisementEntity> findAllByTypeAndCategory_IdAndUser_City_IdAndTitleContainingIgnoreCaseAndUser_IdAndIsActive(Pageable pageable, String type, Integer categoryId, Integer cityId, String title, Integer userId, Boolean active);

    Optional<AdvertisementEntity> findByUser_IdAndId(Integer ownerId, Integer advertisementId);
}
