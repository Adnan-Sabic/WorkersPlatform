-- unique username and email
ALTER TABLE `workersdb`.`user`
    ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
    ADD UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE;

ALTER TABLE `workersdb`.`advertisement`
    CHANGE COLUMN `isActive` `isActive` TINYINT NOT NULL DEFAULT '1' ;