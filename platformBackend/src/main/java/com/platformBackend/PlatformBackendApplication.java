package com.platformBackend;

import com.platformBackend.model.entity.Address;
import com.platformBackend.model.entity.Role;
import com.platformBackend.model.entity.User;
import com.platformBackend.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class PlatformBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlatformBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(UserRepository repository) {
        return args -> {
            Address address = new Address(new ObjectId(), "Djure Djakovica 8");
            User user = new User(
                    LocalDateTime.now(),
                    Role.NORMAL,
                    "Adoo",
                    "Sabic",
                    "0611112220",
                    "ado_ado@gmail.com",
                    "password123",
                    "Ja sam adnan",
                    "urlSLike",
                    address
            );
            repository.findUserByEmail("ado_ado@gmail.com").ifPresentOrElse(System.out::println, () -> System.out.println("not found"));
            repository.insert(user);

        };
    }
}
