package com.platformBackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "message")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "senderId", nullable = false)
    @JsonIgnore
    private UserEntity sender;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "receiverId", nullable = false)
    @JsonIgnore
    private UserEntity receiver;

    @Column(name = "created", nullable = false)
    private LocalDateTime created;

    @Column(name = "seen", nullable = false)
    private Boolean seen = false;

    @Column(name = "text", nullable = false, length = 500)
    private String text;

}