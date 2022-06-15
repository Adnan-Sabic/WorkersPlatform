package com.platformBackend.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.Instant;

@Data
@Entity
@Table(name = "notification")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "userId", nullable = false)
    private UserEntity user;

    @Column(name = "created", nullable = false)
    private Instant created;

    @Column(name = "seen", nullable = false)
    private Boolean seen = false;

    @Column(name = "text", nullable = false, length = 200)
    private String text;

}