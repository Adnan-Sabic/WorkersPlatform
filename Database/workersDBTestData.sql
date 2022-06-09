
INSERT INTO `workersdb`.`city` (`id`,`name`) VALUES (1,'Sarajevo');
INSERT INTO `workersdb`.`city` (`id`,`name`) VALUES (2,'Banja Luka');
INSERT INTO `workersdb`.`city` (`id`,`name`) VALUES (3,'Bihać');
INSERT INTO `workersdb`.`city` (`id`,`name`) VALUES (4,'Mostar');


INSERT INTO `workersdb`.`user` (`city_id`, `firstName`, `lastName`, `contactNumber`, `email`, `username`, `password`, `about`, `imageUrl`) VALUES ('1', 'Marko', 'Marković', '061222333', 'marko.markovic@gmail.com', 'MarkoM', 'password123', 'Ja sam Marko volim raditi', 'https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj');
INSERT INTO `workersdb`.`user` (`city_id`, `firstName`, `lastName`, `contactNumber`, `email`, `username`, `password`, `about`, `imageUrl`) VALUES ('2', 'Petar', 'Petrović', '062445652', 'petar.petrovic@gmail.com', 'PetarP', 'password123', 'Ja sam Petar volim raditi', 'https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj');


INSERT INTO `workersdb`.`notification` (`userId`, `text`) VALUES ('1', 'Notifikacija 1');
INSERT INTO `workersdb`.`notification` (`userId`, `text`) VALUES ('1', 'Notifikacija 2');
INSERT INTO `workersdb`.`notification` (`userId`, `text`) VALUES ('2', 'Poruka 1');
INSERT INTO `workersdb`.`notification` (`userId`, `text`) VALUES ('2', 'Poruka 2');


INSERT INTO `workersdb`.`message` (`senderId`, `receiverId`, `text`) VALUES ('1', '2', 'Cao koliko bi kostao 1m kvadratni?');
INSERT INTO `workersdb`.`message` (`senderId`, `receiverId`, `text`) VALUES ('2', '1', '10KM,  LP.');
INSERT INTO `workersdb`.`message` (`senderId`, `receiverId`, `text`) VALUES ('1', '2', 'Moze li 7KM, LP.');
INSERT INTO `workersdb`.`message` (`senderId`, `receiverId`, `text`) VALUES ('2', '1', 'Moze.');


INSERT INTO `workersdb`.`category` (`name`) VALUES ('Vodoinstalater');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Moler');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Električar');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Bravar');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Kovač');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Staklar');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Stolar');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Zidar');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Građavinar');
INSERT INTO `workersdb`.`category` (`name`) VALUES ('Vrtlar');


INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`, `price`) VALUES ('1', '2', 'OFFER', 'Molerske usluge', 'Radim povoljno molerske usluge na teritoriji grada Sarajevo. Samo stanovi. Broj: 062-333-232', '[\"url1\",\"url2\"]', '50');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`) VALUES ('1', '10', 'OFFER', 'Kosim povoljno', 'Kosim povoljno na teritoriji Gornji Vakuf', '[\"url1\",\"url2\"]');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`) VALUES ('1', '1', 'OFFER', 'Vodoinstalater 062-333-333', '20 godina iskustva u razmin domacinstvima.', '[\"url1\",\"url2\"]');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`) VALUES ('1', '6', 'OFFER', 'Staklarske usluge Cazin', 'Od malih kucanskih staklenih proizvoda do velik prozora za zgrade', '[\"url1\",\"url2\"]');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`, `price`) VALUES ('2', '1', 'DEMAND', 'Hitno potreban vodoinstalater', 'Kvar u kupatilu voda ne moze da stane! 065-668-954', '[\"url1\", \"url2\"]', '200');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`) VALUES ('2', '3', 'DEMAND', 'Potreban električar', 'Potrebno mi je razvesti struju u novoj kući. Cijena po dogovoru', '[\"url1\", \"url2\"]');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`) VALUES ('2', '5', 'DEMAND', 'Potreban kovač Konjic', 'Potreban mi je kovač da mi napravi mač sinu za rodjendan', '[\"url1\", \"url2\"]');
INSERT INTO `workersdb`.`advertisement` (`userId`, `categoryId`, `type`, `title`, `description`, `imagesUrls`, `price`) VALUES ('2', '6', 'DEMAND', 'Potreban staklar Cazin', 'Potreban mi je staklar da mi napravi stalaže u frizideru.', '[\"url1\", \"url2\"]', '10');


