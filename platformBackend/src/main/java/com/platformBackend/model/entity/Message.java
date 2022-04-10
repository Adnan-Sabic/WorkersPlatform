package com.platformBackend.model.entity;

import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Data
@Builder
@Document
public class Message {
    @Id
    private ObjectId _id;
    private ObjectId senderId;
    @DocumentReference(lazy = true, collection = "user", lookup = "{'senderId' : ?#{#_id}}")
    private User sender;
    private ObjectId receiverId;
    @DocumentReference(lazy = true, collection = "user", lookup = "{'receiverId' : ?#{#_id}}")
    private User receiver;
    @CreatedDate
    private LocalDateTime created;
    @Builder.Default
    private Boolean seen = false;
    private String text;
}
