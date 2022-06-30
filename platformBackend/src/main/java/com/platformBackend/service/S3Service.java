package com.platformBackend.service;

import com.amazonaws.ClientConfiguration;
import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.platformBackend.util.S3Properties;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class S3Service {

    private final AmazonS3 s3Client;
    private final String bucketName;

    private final Duration duration;

    public S3Service(S3Properties s3Properties) {

        AWSCredentials credentials = new BasicAWSCredentials(s3Properties.getAccessKey(), s3Properties.getSecretKey());
        ClientConfiguration clientConfiguration = new ClientConfiguration();
        clientConfiguration.setSignerOverride("AWSS3V4SignerType");

        s3Client = AmazonS3ClientBuilder
                .standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(s3Properties.getHost(), s3Properties.getRegion()))
                .withPathStyleAccessEnabled(true)
                .withClientConfiguration(clientConfiguration)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();

        this.bucketName = s3Properties.getBucketName();
        this.duration = s3Properties.getLinkDuration();
    }

    private String generateLink(String filename, HttpMethod method) {
        GeneratePresignedUrlRequest request =
                new GeneratePresignedUrlRequest(bucketName, filename)
                        .withMethod(method)
                        .withExpiration(Date.from(Instant.now().plusMillis(this.duration.toMillis())));
        return s3Client.generatePresignedUrl(request).toString();
    }

    public String getFile(String filename) {
        return generateLink(filename, HttpMethod.GET);
    }

    public String uploadFile(String filename) {
        return generateLink(filename, HttpMethod.PUT);
    }

}
