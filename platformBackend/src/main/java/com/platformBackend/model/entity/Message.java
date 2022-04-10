package com.platformBackend.model.entity;

import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@Document
public class Message {
    @Id
    private ObjectId _id;
    private ObjectId senderId;
    private ObjectId receiverId;
    @CreatedDate
    private LocalDateTime created;
    @Builder.Default
    private Boolean seen = false;
    private String text;
}
