package com.platformBackend.model.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
public class User {
    @Id
    private ObjectId id;
    private LocalDateTime created;
    private Role role;
    private String firstName;
    private String lastName;
    private String contactNumber;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String about;
    private String image;
    private Address address;

    public User(LocalDateTime created, Role role, String firstName, String lastName, String contactNumber, String email, String password, String about, String image, Address address) {
        this.created = created;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.password = password;
        this.about = about;
        this.image = image;
        this.address = address;
    }
}
