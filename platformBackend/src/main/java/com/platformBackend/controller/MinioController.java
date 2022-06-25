package com.platformBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("api/minio")
public class MinioController {

    @GetMapping
    public void testMinio() {

    }
}
