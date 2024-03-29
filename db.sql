CREATE TABLE `personal` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstname` VARCHAR(32) NOT NULL,
  `lastname` VARCHAR(32) DEFAULT NULL,
  `telephone` VARCHAR(15) DEFAULT NULL,
  `account` VARCHAR(64)DEFAULT NULL,
  `iban` VARCHAR(24) NOT NULL,
  `paymentDataId` VARCHAR(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `address` (
  `personal_id` INT(11) NOT NULL,
  `address` VARCHAR(64) DEFAULT NULL,
  `house_number` VARCHAR(6) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `city` VARCHAR(32) DEFAULT NULL,
  FOREIGN KEY (personal_id)
        REFERENCES personal (id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;