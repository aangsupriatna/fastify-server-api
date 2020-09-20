CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `phone` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `description` VARCHAR(50) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_phone_1_idx` (`user_id` ASC),
  CONSTRAINT `fk_phone_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);