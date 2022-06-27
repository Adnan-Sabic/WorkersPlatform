package com.platformBackend.model.entity;

import com.platformBackend.model.enums.AdvType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "advertisement")
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class AdvertisementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "userId", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "categoryId", nullable = false)
    private CategoryEntity category;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, columnDefinition = "ENUM('OFFER', 'DEMAND')")
    private AdvType type;

    @Column(name = "created", nullable = false)
    private LocalDateTime created = LocalDateTime.now();;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "price", precision = 10)
    private BigDecimal price;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive = true;

    @Column(name = "removedBecause", length = 500)
    private String removedBecause;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "imagesUrls", nullable = false)
    private String[] imagesUrls;

}