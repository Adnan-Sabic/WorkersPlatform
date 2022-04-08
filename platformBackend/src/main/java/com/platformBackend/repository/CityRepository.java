package com.platformBackend.repository;

import com.platformBackend.model.entity.City;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends MongoRepository<City, ObjectId> {
}
