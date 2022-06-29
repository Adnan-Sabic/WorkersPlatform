-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `city`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `city` ;

CREATE TABLE IF NOT EXISTS `city` (
                                                  `id` INT NOT NULL AUTO_INCREMENT,
                                                  `name` VARCHAR(60) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idcity_UNIQUE` (`id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
                                                  `id` INT NOT NULL AUTO_INCREMENT,
                                                  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                  `role` ENUM('NORMAL', 'ADMIN') NOT NULL DEFAULT 'NORMAL',
    `cityId` INT NULL,
    `firstName` VARCHAR(45) NULL,
    `lastName` VARCHAR(45) NULL,
    `contactNumber` VARCHAR(16) NULL,
    `email` VARCHAR(45) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `about` VARCHAR(1000) NULL,
    `imageUrl` VARCHAR(2048) NULL,
    `isActive` TINYINT NOT NULL DEFAULT '0',
    `removedBecause` VARCHAR(500) NULL,
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    PRIMARY KEY (`id`),
    INDEX `fk_user_city1_idx` (`cityId` ASC) VISIBLE,
    CONSTRAINT `fk_user_city1`
    FOREIGN KEY (`cityId`)
    REFERENCES `city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `notification` ;

CREATE TABLE IF NOT EXISTS `notification` (
                                                          `id` INT NOT NULL AUTO_INCREMENT,
                                                          `userId` INT NOT NULL,
                                                          `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                          `seen` TINYINT NOT NULL DEFAULT '0',
                                                          `text` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idnotification_UNIQUE` (`id` ASC) VISIBLE,
    INDEX `fk_notification_user_idx` (`userId` ASC) VISIBLE,
    CONSTRAINT `fk_notification_user`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
                                                      `id` INT NOT NULL AUTO_INCREMENT,
                                                      `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `advertisement`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `advertisement` ;

CREATE TABLE IF NOT EXISTS `advertisement` (
                                                           `id` INT NOT NULL AUTO_INCREMENT,
                                                           `userId` INT NOT NULL,
                                                           `categoryId` INT NOT NULL,
                                                           `type` ENUM('OFFER', 'DEMAND') NOT NULL,
    `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `title` VARCHAR(45) NOT NULL,
    `description` VARCHAR(1000) NULL,
    `imagesUrls` JSON NOT NULL,
    `price` DECIMAL NULL,
    `isActive` TINYINT NOT NULL DEFAULT 1,
    `removedBecause` VARCHAR(500) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idadvertisement_UNIQUE` (`id` ASC) VISIBLE,
    INDEX `fk_advertisement_user1_idx` (`userId` ASC) VISIBLE,
    INDEX `fk_advertisement_category1_idx` (`categoryId` ASC) VISIBLE,
    CONSTRAINT `fk_advertisement_user1`
    FOREIGN KEY (`userId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_advertisement_category1`
    FOREIGN KEY (`categoryId`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
                                                     `id` INT NOT NULL AUTO_INCREMENT,
                                                     `senderId` INT NOT NULL,
                                                     `receiverId` INT NOT NULL,
                                                     `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                     `seen` TINYINT NOT NULL DEFAULT '0',
                                                     `text` VARCHAR(500) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `idmessage_UNIQUE` (`id` ASC) VISIBLE,
    INDEX `fk_message_user1_idx` (`senderId` ASC) VISIBLE,
    INDEX `fk_message_user2_idx` (`receiverId` ASC) VISIBLE,
    CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`senderId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_message_user2`
    FOREIGN KEY (`receiverId`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
    ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
