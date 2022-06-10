package com.platformBackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.platformBackend.model.enums.Role;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "created", nullable = false)
    private LocalDateTime created;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, columnDefinition = "ENUM('NORMAL', 'ADMIN')")
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cityId")
    @JsonIgnore
    private CityEntity city;

    @Column(name = "firstName", length = 45)
    private String firstName;

    @Column(name = "lastName", length = 45)
    private String lastName;

    @Column(name = "contactNumber", length = 16)
    private String contactNumber;

    @Column(name = "email", nullable = false, length = 45)
    private String email;

    @Column(name = "username", nullable = false, length = 45)
    private String username;

    @Column(name = "password", nullable = false, length = 128)
    private String password;

    @Column(name = "about", length = 1000)
    private String about;

    @Column(name = "imageUrl", length = 2048)
    private String imageUrl;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive = false;

    @Column(name = "removedBecause", length = 500)
    private String removedBecause;

}