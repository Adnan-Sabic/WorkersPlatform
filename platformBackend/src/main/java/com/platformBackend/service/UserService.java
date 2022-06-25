package com.platformBackend.service;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.model.request.RegisterUserRequest;
import com.platformBackend.model.request.UserProfileRequest;
import com.platformBackend.model.response.JwtUser;
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

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CityRepository cityRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

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
        return modelMapper.map(userRepository.findById(userId).orElseThrow(NotFoundException::new), UserProfileResponse.class);
    }

    public UserProfileResponse editUserById(Integer userId, UserProfileRequest userProfileRequest) {
        UserEntity userEntity = userRepository.findById(userId).get();
        userEntity.setFirstName(userProfileRequest.getFirstName());
        userEntity.setLastName(userProfileRequest.getLastName());
        userEntity.setContactNumber(userProfileRequest.getContactNumber());
        userEntity.setAbout(userProfileRequest.getAbout());
        //TODO maybe smarter?
        userEntity.setCity(cityRepository.getById(userProfileRequest.getCityId()));
        System.out.println(userEntity);
        userEntity = userRepository.saveAndFlush(userEntity);
        System.out.println("after" + userEntity);
        return modelMapper.map(userEntity, UserProfileResponse.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return modelMapper.map(userRepository.findByUsername(username).
                orElseThrow(() -> new UsernameNotFoundException(username)), JwtUser.class);
    }
}
