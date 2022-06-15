package com.platformBackend.service;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.model.request.RegisterUserRequest;
import com.platformBackend.model.response.UserResponse;
import com.platformBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    public List<UserEntity> findAll() {
        List<UserEntity> userEntities = userRepository.findAll();
        return userEntities;
    }

    public UserResponse registerUser(RegisterUserRequest newUser) throws NotFoundException {
        UserEntity userEntity = modelMapper.map(newUser, UserEntity.class);
        userEntity = userRepository.saveAndFlush(userEntity);
        return modelMapper.map(userRepository.findById(userEntity.getId()).orElseThrow(NotFoundException::new), UserResponse.class);
    }
}
