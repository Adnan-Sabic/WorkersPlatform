package com.platformBackend.service;

import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    public List<UserEntity> findAll() {
        userRepository.findAll().forEach(userEntity -> System.out.println(userEntity));
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities;
    }
}
