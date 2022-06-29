package com.platformBackend.util;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

@Data
@Component
@Validated
@ConfigurationProperties(prefix = "aws")
public class S3Properties {

    @NotNull
    private String secretKey;

    @NotNull
    private String accessKey;

    @NotNull
    private String host;

    @NotNull
    private String region;

    @NotNull
    private String bucketName;
}
