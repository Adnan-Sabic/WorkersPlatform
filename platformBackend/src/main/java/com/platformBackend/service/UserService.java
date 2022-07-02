package com.platformBackend.service;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.model.request.RegisterUserRequest;
import com.platformBackend.model.request.UserProfileRequest;
import com.platformBackend.model.response.JwtUser;
import com.platformBackend.model.response.UserInfoResponse;
import com.platformBackend.model.response.UserProfileResponse;
import com.platformBackend.model.response.UserResponse;
import com.platformBackend.repository.CityRepository;
import com.platformBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CityRepository cityRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    private final S3Service s3Service;

    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    public UserResponse registerUser(RegisterUserRequest newUser) throws NotFoundException {
        UserEntity userEntity = modelMapper.map(newUser, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        userEntity = userRepository.saveAndFlush(userEntity);
        return modelMapper.map(userRepository.findById(userEntity.getId()).orElseThrow(NotFoundException::new), UserResponse.class);
    }

    public UserProfileResponse findUserById(Integer userId) throws NotFoundException {
        UserProfileResponse response = modelMapper.map(userRepository.findById(userId).orElseThrow(NotFoundException::new), UserProfileResponse.class);
        if (response.getImageUrl() != null) {
            response.setImageUrl(s3Service.getFile(response.getImageUrl()));
        }
        return response;
    }

    public UserInfoResponse findUserInfoById(Integer userId) throws NotFoundException {
        UserInfoResponse response = modelMapper.map(userRepository.findById(userId).orElseThrow(NotFoundException::new), UserInfoResponse.class);
        if (response.getImageUrl() != null) {
            response.setImageUrl(s3Service.getFile(response.getImageUrl()));
        }
        return response;
    }

    public UserProfileResponse editUserById(Integer userId, UserProfileRequest userProfileRequest) {
        UserEntity userEntity = userRepository.findById(userId).get();
        userEntity.setFirstName(userProfileRequest.getFirstName());
        userEntity.setLastName(userProfileRequest.getLastName());
        userEntity.setContactNumber(userProfileRequest.getContactNumber());
        userEntity.setAbout(userProfileRequest.getAbout());
        if(userProfileRequest.getCityId() != null) {
            userEntity.setCity(cityRepository.getById(userProfileRequest.getCityId()));
        }
        if (userEntity.getImageUrl() == null && userProfileRequest.getUpdateImage()) {
            userEntity.setImageUrl(UUID.randomUUID().toString());
        }
        userEntity = userRepository.saveAndFlush(userEntity);
        UserProfileResponse response = modelMapper.map(userEntity, UserProfileResponse.class);
        response.setImageUrl(s3Service.uploadFile(response.getImageUrl()));
        return response;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return modelMapper.map(userRepository.findByUsername(username).
                orElseThrow(() -> new UsernameNotFoundException(username)), JwtUser.class);
    }
}
