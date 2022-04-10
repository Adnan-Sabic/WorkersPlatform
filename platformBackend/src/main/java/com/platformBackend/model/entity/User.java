package com.platformBackend.model.entity;

import com.platformBackend.model.entity.additional.Address;
import com.platformBackend.model.entity.additional.Role;
import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document
public class User {
    @Id
    private ObjectId _id;
    @CreatedDate
    private LocalDateTime created;
    @Builder.Default
    private Role role = Role.NORMAL;
    private String firstName;
    private String lastName;
    private String contactNumber;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String about;
    private String image;
    private Address address;
    @Builder.Default
    private Boolean isActive = true;
}
