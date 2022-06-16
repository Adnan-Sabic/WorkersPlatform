package com.platformBackend.service;

import com.platformBackend.exception.NotFoundException;
import com.platformBackend.model.entity.UserEntity;
import com.platformBackend.model.request.RegisterUserRequest;
import com.platformBackend.model.response.UserResponse;
import com.platformBackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByUsername(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userEntity.getRole().name()));
        return new User(userEntity.getUsername(), userEntity.getPassword(), authorities);
    }
}
