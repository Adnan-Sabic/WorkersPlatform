package com.platformBackend.model.entity;

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

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "senderId", nullable = false)
    private UserEntity sender;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "receiverId", nullable = false)
    private UserEntity receiver;

    @Column(name = "created", nullable = false)
    private LocalDateTime created;

    @Column(name = "seen", nullable = false)
    private Boolean seen = false;

    @Column(name = "text", nullable = false, length = 500)
    private String text;

}