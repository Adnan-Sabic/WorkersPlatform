package com.platformBackend.util;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;

@Data
@Component
@Validated
@ConfigurationProperties(prefix = "token")
public class TokenProperties {

    @NotNull
    private String secret;

    @NotNull
    private Duration expire;
}
