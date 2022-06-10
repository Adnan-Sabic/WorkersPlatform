package com.platformBackend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "userId", nullable = false)
    @JsonIgnore
    private UserEntity user;

    @Column(name = "created", nullable = false)
    private Instant created;

    @Column(name = "seen", nullable = false)
    private Boolean seen = false;

    @Column(name = "text", nullable = false, length = 200)
    private String text;

}