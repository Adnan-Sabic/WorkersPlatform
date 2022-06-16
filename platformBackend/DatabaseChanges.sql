-- unique username and email
ALTER TABLE `workersdb`.`user`
    ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
    ADD UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE;