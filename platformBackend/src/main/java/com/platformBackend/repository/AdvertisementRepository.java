package com.platformBackend.repository;

import com.platformBackend.model.entity.Advertisement;
import com.platformBackend.model.entity.additional.Type;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisementRepository extends MongoRepository<Advertisement, ObjectId> {

    Page<Advertisement> findAllByTypeAndCategory__idAndNameContaining(Type type, ObjectId categoryId, String title, Pageable pageable);
}
