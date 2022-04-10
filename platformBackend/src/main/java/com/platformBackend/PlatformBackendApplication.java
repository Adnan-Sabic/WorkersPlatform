package com.platformBackend;

import com.platformBackend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class PlatformBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PlatformBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(UserRepository userRepository, CityRepository cityRepository, NotificationRepository notificationRepository, CategoryRepository categoryRepository, AdvertisementRepository advertisementRepository, MessageRepository messageRepository) {
        return args -> {
//            System.out.println(advertisementRepository.findAll());
//            Address address = new Address(new ObjectId(), "Marka Markovica 8");
//            User user = new User(
//                    "Marko",
//                    "Markovic",
//                    "061-111-220",
//                    "marko.markovic@gmail.com",
//                    "password123",
//                    "Ja sam Marko volim raditi",
//                    "https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj",
//                    address
//            );
//            userRepository.insert(user);
//            address = new Address(new ObjectId(), "Petra Petrovica 8");
//            user = new User(
//                    "Petar",
//                    "Petrović",
//                    "062-222-220",
//                    "petar.petrovic@gmail.com",
//                    "password123",
//                    "Ja sam Petar volim raditi",
//                    "https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj",
//                    address
//            );
//            userRepository.insert(user);
//            List<City> list = new ArrayList<City>() {{
//                add(City.builder().name("Sarajevo").build());
//                add(City.builder().name("Banja Luka").build());
//                add(City.builder().name("Mostar").build());
//                add(City.builder().name("Tuzla").build());
//                add(City.builder().name("Zenica").build());
//                add(City.builder().name("Bihać").build());
//                add(City.builder().name("Bijeljina").build());
//                add(City.builder().name("Foča").build());
//                add(City.builder().name("Teslić").build());
//                add(City.builder().name("Doboj").build());
//                add(City.builder().name("Trebinje").build());
//            } };
//            cityRepository.insert(list);

//            List<Notification> notificationList = new ArrayList<>() {{
//                add(Notification.builder().userId(new ObjectId("62503a0a7eb6670166ad65d1")).text("Imate novu poruku 1.").build());
//                add(Notification.builder().userId(new ObjectId("62503a0a7eb6670166ad65d1")).text("Imate novu poruku 2.").build());
//                add(Notification.builder().userId(new ObjectId("62503a0a7eb6670166ad65d1")).text("Imate novu poruku 3.").build());
//
//                add(Notification.builder().userId(new ObjectId("62503a0a7eb6670166ad65d3")).text("Imate novu poruku 1.").build());
//                add(Notification.builder().userId(new ObjectId("62503a0a7eb6670166ad65d3")).text("Imate novu poruku 2.").build());
//                add(Notification.builder().userId(new ObjectId("62503a0a7eb6670166ad65d3")).text("Imate novu poruku 3.").build());
//            }};
//            notificationRepository.insert(notificationList);

//            List<Category> categoryList = new ArrayList<Category>() {{
//                add(Category.builder().name("Vodoinstalater").build());
//                add(Category.builder().name("Moler").build());
//                add(Category.builder().name("Električar").build());
//                add(Category.builder().name("Bravar").build());
//                add(Category.builder().name("Kovač").build());
//                add(Category.builder().name("Staklar").build());
//                add(Category.builder().name("Stolar").build());
//                add(Category.builder().name("Zidar").build());
//                add(Category.builder().name("Građavinar").build());
//                add(Category.builder().name("Vrtlar").build());
//            }};
//            categoryRepository.insert(categoryList);


//            List<Advertisement> advertisementList = new ArrayList<>(){{
//                add(Advertisement.builder()
//                        .userId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                        .categoryId(new ObjectId("62504d089c5b8449a91d611e"))
//                        .type(Type.OFFER)
//                        .name("Molerske usluge BL")
//                        .description("Radim povoljno molerske usluge na teritoriji grada Sarajevo. Samo stanovi. Broj: 062-333-232")
//                        .images(new ArrayList<String>(){{
//                            add("url1");
//                            add("url2");
//                        }})
//                        .price(new BigDecimal(50))
//                        .build());
//                add(Advertisement.builder()
//                        .userId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                        .categoryId(new ObjectId("62504d089c5b8449a91d6126"))
//                        .type(Type.OFFER)
//                        .name("Kosim povoljno")
//                        .description("Kosim povoljno na teritoriji Gornji Vakuf")
//                        .images(new ArrayList<String>(){{
//                            add("url4");
//                            add("url3");
//                        }})
//                        .price(null)
//                        .build());
//                add(Advertisement.builder()
//                        .userId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                        .categoryId(new ObjectId("62504d089c5b8449a91d611d"))
//                        .type(Type.OFFER)
//                        .name("Vodoinstalater 062-333-333")
//                        .description("20 godina iskustva u razmin domacinstvima.")
//                        .images(new ArrayList<String>(){{
//                            add("url6");
//                            add("url7");
//                        }})
//                        .price(null)
//                        .build());
//
//                add(Advertisement.builder()
//                        .userId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                        .categoryId(new ObjectId("62504d089c5b8449a91d611d"))
//                        .type(Type.DEMAND)
//                        .name("Hitno potreban vodoinstalater")
//                        .description("Kvar u kupatilu voda ne moze da stane! 065-668-954")
//                        .images(new ArrayList<String>(){{
//                            add("url9");
//                            add("url11");
//                        }})
//                        .price(new BigDecimal(200))
//                        .build());
//                add(Advertisement.builder()
//                        .userId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                        .categoryId(new ObjectId("62504d089c5b8449a91d611f"))
//                        .type(Type.DEMAND)
//                        .name("Potreban električar")
//                        .description("Potrebno mi je razvesti struju u novoj kući. Cijena po dogovoru")
//                        .images(new ArrayList<String>(){{
//                            add("url5");
//                        }})
//                        .price(null)
//                        .build());
//                add(Advertisement.builder()
//                        .userId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                        .categoryId(new ObjectId("62504d089c5b8449a91d6121"))
//                        .type(Type.DEMAND)
//                        .name("Potreban kovač Konjic")
//                        .description("Potreban mi je kovač da mi napravi mač sinu za rodjendan")
//                        .images(new ArrayList<String>(){{
//                            add("url6");
//                        }})
//                        .price(null)
//                        .build());
//            }};
//            advertisementRepository.insert(advertisementList);

//            List<Message> messageList = new ArrayList<>(){{
//               add(Message.builder()
//                       .senderId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                       .receiverId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                       .text("Pozdrav da li radite na podrucju Gornjeg vakufa")
//                       .build());
//                add(Message.builder()
//                        .senderId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                        .receiverId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                        .text("Zavisi od kolicine rada i novca. LP")
//                        .build());
//                add(Message.builder()
//                        .senderId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                        .receiverId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                        .text("Ima mnogo rada. U pitanju je velika nova kuca, a cijena po kvadratu je 10KM")
//                        .build());
//                add(Message.builder()
//                        .senderId(new ObjectId("62503a0a7eb6670166ad65d1"))
//                        .receiverId(new ObjectId("62503a0a7eb6670166ad65d3"))
//                        .text("Prihvatam ponudu, cujemo se preko telefona radi daljeg dogovora. LP")
//                        .build());
//            }};
//
//            messageRepository.insert(messageList);
//
        };
    }
}
