-- MySQL Script generated by MySQL Workbench
-- Sun Mar  6 11:54:55 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`persons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(120) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `photo` VARCHAR(255) NOT NULL,
  `person_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `FK_users_persons_idx` (`person_id` ASC) VISIBLE,
  CONSTRAINT `FK_users_persons`
    FOREIGN KEY (`person_id`)
    REFERENCES `mydb`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`addresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`addresses` (
  `id` INT NOT NULL,
  `street` VARCHAR(250) NOT NULL,
  `number` VARCHAR(16) NOT NULL,
  `complement` VARCHAR(250) NULL,
  `district` VARCHAR(250) NOT NULL,
  `city` VARCHAR(250) NOT NULL,
  `state` VARCHAR(250) NOT NULL,
  `country` VARCHAR(250) NOT NULL,
  `zipcode` VARCHAR(8) NOT NULL,
  `person_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_addresses_persons_idx` (`person_id` ASC) VISIBLE,
  CONSTRAINT `FK_addresses_persons`
    FOREIGN KEY (`person_id`)
    REFERENCES `mydb`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ingredients` (
  `id` INT NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `type` TINYINT NOT NULL,
  `available` TINYINT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_status` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`orders` (
  `id` INT NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `status_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_orders_users_idx` (`user_id` ASC) VISIBLE,
  INDEX `FK_orders_status_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `FK_orders_status`
    FOREIGN KEY (`status_id`)
    REFERENCES `mydb`.`order_status` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_orders_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`order_items`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`order_items` (
  `id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `name` VARCHAR(60) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_order_items_orders_idx` (`order_id` ASC) VISIBLE,
  CONSTRAINT `FK_order_items_orders`
    FOREIGN KEY (`order_id`)
    REFERENCES `mydb`.`orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`item_ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`item_ingredients` (
  `id` INT NOT NULL,
  `order_item_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `ingredient_price` DECIMAL(10,2) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_item_ingredients_ingredient_idx` (`ingredient_id` ASC) VISIBLE,
  INDEX `FK_item_ingredients_order_items_idx` (`order_item_id` ASC) VISIBLE,
  CONSTRAINT `FK_item_ingredients_ingredient`
    FOREIGN KEY (`ingredient_id`)
    REFERENCES `mydb`.`ingredients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_item_ingredients_order_items`
    FOREIGN KEY (`order_item_id`)
    REFERENCES `mydb`.`order_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;