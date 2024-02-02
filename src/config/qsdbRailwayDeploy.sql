-- Active: 1701211025608@@127.0.0.1@3306@railway

-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------

-- Schema railway

-- -----------------------------------------------------

-- DROP SCHEMA IF EXISTS `railway` ;

-- -----------------------------------------------------

-- Schema railway

-- -----------------------------------------------------

-- CREATE SCHEMA IF NOT EXISTS `railway` DEFAULT CHARACTER SET utf8 ;

USE `railway` ;

-- -----------------------------------------------------

-- Table `railway`.`perfil`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`perfil` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`perfil` (
        `perfilId` INT NOT NULL AUTO_INCREMENT,
        `perfilNom` VARCHAR(45) NOT NULL,
        `paginaRuta` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`perfilId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`dominio`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`dominio` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`dominio` (
        `domId` INT NOT NULL AUTO_INCREMENT,
        `domNom` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`domId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`valor`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`valor` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`valor` (
        `valorId` INT NOT NULL AUTO_INCREMENT,
        `param` VARCHAR(255) NOT NULL,
        `domId` INT NOT NULL,
        PRIMARY KEY (`valorId`),
        INDEX `valueXDomain_idx` (`domId` ASC),
        CONSTRAINT `valueXDomain` FOREIGN KEY (`domId`) REFERENCES `railway`.`dominio` (`domId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`usuario`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`usuario` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`usuario` (
        `usuId` INT NOT NULL AUTO_INCREMENT,
        `usuTipoDoc` INT NOT NULL,
        `usuNoDoc` VARCHAR(12) NOT NULL,
        `usuGen` INT NOT NULL,
        `usuNom` VARCHAR(255) NOT NULL,
        `usuEmail` VARCHAR(255) NOT NULL,
        `usuContra` VARCHAR(255) NOT NULL,
        `usuIngreso` DATETIME NOT NULL,
        `usuImg` VARCHAR(255) NULL,
        `perfilId` INT NOT NULL,
        `usuKey` LONGTEXT NULL,
        `usuOlvid` DATETIME NULL,
        PRIMARY KEY (`usuId`),
        INDEX `userXProfile_idx` (`perfilId` ASC),
        INDEX `genderXValue_idx` (`usuGen` ASC),
        INDEX `docTypeXValue_idx` (`usuTipoDoc` ASC),
        UNIQUE INDEX `usuEmail_UNIQUE` (`usuEmail` ASC),
        UNIQUE INDEX `usuNoDoc_UNIQUE` (`usuNoDoc` ASC),
        INDEX `usuIngreso` (`usuIngreso` ASC),
        INDEX `usuOlvid` (`usuOlvid` ASC),
        CONSTRAINT `userXProfile` FOREIGN KEY (`perfilId`) REFERENCES `railway`.`perfil` (`perfilId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `genderXValue` FOREIGN KEY (`usuGen`) REFERENCES `railway`.`valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `docTypeXValue` FOREIGN KEY (`usuTipoDoc`) REFERENCES `railway`.`valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

ALTER TABLE railway.usuario AUTO_INCREMENT = 101;

-- -----------------------------------------------------

-- Table `railway`.`pagina`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`pagina` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`pagina` (
        `paginaId` INT NOT NULL AUTO_INCREMENT,
        `paginaNom` VARCHAR(45) NOT NULL,
        `paginaIcon` VARCHAR(45) NOT NULL,
        `paginaRuta` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`paginaId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`perxpag`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`perxpag` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`perxpag` (
        `paginaId` INT NOT NULL,
        `perfilId` INT NOT NULL,
        INDEX `profileXPage_idx` (`perfilId` ASC),
        INDEX `pageXProfile_idx` (`paginaId` ASC),
        CONSTRAINT `profileXPage` FOREIGN KEY (`perfilId`) REFERENCES `railway`.`perfil` (`perfilId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `pageXProfile` FOREIGN KEY (`paginaId`) REFERENCES `railway`.`pagina` (`paginaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`categoria`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`categoria` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`categoria` (
        `catId` INT NOT NULL AUTO_INCREMENT,
        `catNom` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`catId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`producto`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`producto` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`producto` (
        `prodId` INT NOT NULL AUTO_INCREMENT,
        `catId` INT NOT NULL,
        `prodNom` VARCHAR(255) NOT NULL,
        `prodDescr` VARCHAR(255) NOT NULL,
        `prodImg` VARCHAR(255) NOT NULL,
        `prodValCom` BIGINT(10) NOT NULL,
        `prodValVen` BIGINT(10) NOT NULL,
        PRIMARY KEY (`prodId`),
        INDEX `productXCategory_idx` (`catId` ASC),
        INDEX `prodNom` (`prodNom` ASC),
        INDEX `prodValCom` (`prodValCom` ASC),
        INDEX `prodValVen` (`prodValVen` ASC),
        CONSTRAINT `productXCategory` FOREIGN KEY (`catId`) REFERENCES `railway`.`categoria` (`catId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`transaccion`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`transaccion` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`transaccion` (
        `transacId` INT NOT NULL AUTO_INCREMENT,
        `transacFecha` DATETIME NOT NULL,
        `usuId` INT NOT NULL,
        `transacTipo` INT NOT NULL,
        PRIMARY KEY (`transacId`),
        INDEX `saleBillXUser_idx` (`usuId` ASC),
        INDEX `transacXValor_idx` (`transacTipo` ASC),
        CONSTRAINT `saleBillXUser` FOREIGN KEY (`usuId`) REFERENCES `railway`.`usuario` (`usuId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `transacXValor` FOREIGN KEY (`transacTipo`) REFERENCES `railway`.`valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`proveedor`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`proveedor` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`proveedor` (
        `provId` INT NOT NULL AUTO_INCREMENT,
        `provNom` VARCHAR(45) NOT NULL,
        `provNit` BIGINT(10) NOT NULL,
        PRIMARY KEY (`provId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`compra`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`compra` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`compra` (
        `compraId` INT NOT NULL AUTO_INCREMENT,
        `provId` INT NOT NULL,
        `fechaCompra` DATE NOT NULL,
        PRIMARY KEY (`compraId`),
        INDEX `purchBillXProvider_idx` (`provId` ASC),
        CONSTRAINT `purchBillXProvider` FOREIGN KEY (`provId`) REFERENCES `railway`.`proveedor` (`provId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`detVenta`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`detVenta` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`detVenta` (
        `detVentaId` INT NOT NULL AUTO_INCREMENT,
        `prodId` INT NOT NULL,
        `transacId` INT NOT NULL,
        `detVenCant` INT NOT NULL,
        PRIMARY KEY (`detVentaId`),
        INDEX `saleDetXProduct_idx` (`prodId` ASC),
        INDEX `saleDetXSaleBill_idx` (`transacId` ASC),
        CONSTRAINT `saleDetXProduct` FOREIGN KEY (`prodId`) REFERENCES `railway`.`producto` (`prodId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `saleDetXSaleBill` FOREIGN KEY (`transacId`) REFERENCES `railway`.`transaccion` (`transacId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `railway`.`detCompra`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `railway`.`detCompra` ;

CREATE TABLE
    IF NOT EXISTS `railway`.`detCompra` (
        `detComId` INT NOT NULL AUTO_INCREMENT,
        `prodId` INT NOT NULL,
        `compraId` INT NOT NULL,
        `detComCant` INT NOT NULL,
        INDEX `productXPurchDet_idx` (`prodId` ASC),
        PRIMARY KEY (`detComId`),
        CONSTRAINT `productXPurchDet` FOREIGN KEY (`prodId`) REFERENCES `railway`.`producto` (`prodId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `comXDetCom` FOREIGN KEY (`compraId`) REFERENCES `railway`.`compra` (`compraId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Data for table `railway`.`perfil`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`perfil` (
        `perfilId`,
        `perfilNom`,
        `paginaRuta`
    )
VALUES (1, 'Administrador', 'usuarios');

INSERT INTO
    `railway`.`perfil` (
        `perfilId`,
        `perfilNom`,
        `paginaRuta`
    )
VALUES (2, 'Usuario', 'menu');

INSERT INTO
    `railway`.`perfil` (
        `perfilId`,
        `perfilNom`,
        `paginaRuta`
    )
VALUES (3, 'Cajero', 'transaccion');

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`dominio`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`dominio` (`domId`, `domNom`)
VALUES (1, 'GENERO');

INSERT INTO
    `railway`.`dominio` (`domId`, `domNom`)
VALUES (2, 'TIPO-DOC');

INSERT INTO
    `railway`.`dominio` (`domId`, `domNom`)
VALUES (3, 'TIPO-TRANSAC');

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`valor`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (1, 'masculino', 1);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (2, 'femenino', 1);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (3, 'T.I', 2);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (4, 'C.C', 2);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (5, 'C.E', 2);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (6, 'Recarga', 3);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (7, 'Pago', 3);

INSERT INTO
    `railway`.`valor` (`valorId`, `param`, `domId`)
VALUES (8, 'no definido', 1);

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`usuario`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`usuario` (
        `usuId`,
        `usuTipoDoc`,
        `usuNoDoc`,
        `usuGen`,
        `usuNom`,
        `usuEmail`,
        `usuContra`,
        `usuIngreso`,
        `usuImg`,
        `perfilId`,
        `usuKey`,
        `usuOlvid`
    )
VALUES (
        1,
        4,
        '0000000000',
        8,
        'Persona',
        'persona@qs.com',
        '$2b$08$h/pm./sYdIdw.nEIsjDOKOl5suIzGQNvkDSESMrCkxZVstZ4o80m',
        '2023-07-23 12:29:34',
        'default-img.webp',
        2,
        NULL,
        NULL
    );

COMMIT;

INSERT INTO
    `railway`.`usuario` (
        `usuId`,
        `usuTipoDoc`,
        `usuNoDoc`,
        `usuGen`,
        `usuNom`,
        `usuEmail`,
        `usuContra`,
        `usuIngreso`,
        `usuImg`,
        `perfilId`,
        `usuKey`,
        `usuOlvid`
    )
VALUES (
        2,
        4,
        '1070004545',
        1,
        'Jay Val',
        'jaissonvalbuena29@outlook.com',
        '$2b$10$YKbM/aw/pv5RG2hatLqnSeoTUThl4RlC1bw4.LliK0y/h/6is1tUu',
        '2023-07-23 12:29:34',
        'default-img.webp',
        1,
        NULL,
        NULL
    );

INSERT INTO
    `railway`.`usuario` (
        `usuId`,
        `usuTipoDoc`,
        `usuNoDoc`,
        `usuGen`,
        `usuNom`,
        `usuEmail`,
        `usuContra`,
        `usuIngreso`,
        `usuImg`,
        `perfilId`,
        `usuKey`,
        `usuOlvid`
    )
VALUES (
        3,
        4,
        '12345',
        2,
        'Fercho',
        'fercho@outllok.com',
        '$2b$08$a4g8L.J./gc0SY6FC3G3Ye.MQSREtLVjoU0mEsOZONVagFDsuC1ZS',
        '2023-07-23 12:29:34',
        'default-img.webp',
        2,
        NULL,
        NULL
    );

INSERT INTO
    `railway`.`usuario` (
        `usuId`,
        `usuTipoDoc`,
        `usuNoDoc`,
        `usuGen`,
        `usuNom`,
        `usuEmail`,
        `usuContra`,
        `usuIngreso`,
        `usuImg`,
        `perfilId`,
        `usuKey`,
        `usuOlvid`
    )
VALUES (
        4,
        4,
        '32154',
        1,
        'Miguel',
        'miguel@outllok.com',
        '$2b$08$HcUjxg/KiyMVCDT8H5zL1eXUVZ42ivGb5Jk9KHh7xNMrr56/HwL6m',
        '2023-07-23 12:29:34',
        'default-img.webp',
        3,
        NULL,
        NULL
    );

INSERT INTO
    `railway`.`usuario` (
        `usuId`,
        `usuTipoDoc`,
        `usuNoDoc`,
        `usuGen`,
        `usuNom`,
        `usuEmail`,
        `usuContra`,
        `usuIngreso`,
        `usuImg`,
        `perfilId`,
        `usuKey`,
        `usuOlvid`
    )
VALUES (
        5,
        4,
        '987654',
        1,
        'Camilo',
        'camilo@outllok.com',
        '$2b$08$h/pm./sYdIdw.nEIsjDOKOl5suIzGQNvkDSESMrCkxZVstZ4o80m.',
        '2023-07-23 12:29:34',
        'default-img.webp',
        3,
        NULL,
        NULL
    );

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`pagina`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        1,
        'Inicio',
        'fa-house',
        '/home'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (2, 'Menu', 'fa-list', '/menu');

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        3,
        'Productos',
        'fa-boxes',
        '/productos'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        4,
        'Historial',
        'fa-piggy-bank',
        '/historial'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        5,
        'Paginas',
        'fa-file',
        '/paginas'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        6,
        'Categorias',
        'fa-filter',
        '/categorias'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        7,
        'Dominio',
        'fa-box',
        '/dominio'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (8, 'Valor', 'fa-box', '/valor');

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        9,
        'Compra',
        'fa-cart-shopping',
        '/compra'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        10,
        'Perfil',
        'fa-box',
        '/perfil'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        11,
        'Proveedor',
        'fa-car',
        '/proveedor'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        12,
        'Usuarios',
        'fa-users',
        '/usuarios'
    );

INSERT INTO
    `railway`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (
        13,
        'Transacción',
        'fa-cash-register',
        '/transaccion'
    );

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`perxpag`

-- -----------------------------------------------------

-- ------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (1, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (1, 2);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (1, 3);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (2, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (2, 2);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (2, 3);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (3, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (3, 3);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (13, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (13, 2);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (13, 3);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (5, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (6, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (6, 3);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (7, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (8, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (9, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (10, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (11, 1);

INSERT INTO
    `railway`.`perxpag` (`paginaId`, `perfilId`)
VALUES (12, 1);

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`categoria`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`categoria` (`catId`, `catNom`)
VALUES (2, 'BEBIDAS CALIENTES');

INSERT INTO
    `railway`.`categoria` (`catId`, `catNom`)
VALUES (3, 'BEBIDAS FRIAS');

INSERT INTO
    `railway`.`categoria` (`catId`, `catNom`)
VALUES (4, 'ORGANICOS');

INSERT INTO
    `railway`.`categoria` (`catId`, `catNom`)
VALUES (1, 'OPERACIONES');

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`producto`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        1,
        1,
        '100000',
        'Producto de recarga',
        'default-img.webp',
        100000,
        100000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        2,
        1,
        '50000',
        'Producto de recarga',
        'default-img.webp',
        50000,
        50000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        3,
        1,
        '20000',
        'Producto de recarga',
        'default-img.webp',
        20000,
        20000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        4,
        1,
        '10000',
        'Producto de recarga',
        'default-img.webp',
        10000,
        10000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        5,
        1,
        '5000',
        'Producto de recarga',
        'default-img.webp',
        5000,
        5000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        6,
        1,
        '2000',
        'Producto de recarga',
        'default-img.webp',
        2000,
        2000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        7,
        1,
        '1000',
        'Producto de recarga',
        'default-img.webp',
        1000,
        1000
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        8,
        1,
        '500',
        'Producto de recarga',
        'default-img.webp',
        500,
        500
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        9,
        1,
        '200',
        'Producto de recarga',
        'default-img.webp',
        200,
        200
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        10,
        1,
        '100',
        'Producto de recarga',
        'default-img.webp',
        100,
        100
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        11,
        1,
        '50',
        'Producto de recarga',
        'default-img.webp',
        50,
        50
    );

INSERT INTO
    `railway`.`producto` (
        `prodId`,
        `catId`,
        `prodNom`,
        `prodDescr`,
        `prodImg`,
        `prodValCom`,
        `prodValVen`
    )
VALUES (
        12,
        2,
        'Dummy',
        'Product',
        'default-img.webp',
        15000,
        30000
    );

COMMIT;

-- -----------------------------------------------------

-- Data for table `railway`.`proveedor`

-- -----------------------------------------------------

START TRANSACTION;

USE `railway`;

INSERT INTO
    `railway`.`proveedor` (`provId`, `provNom`, `provNit`)
VALUES (1, 'QS', 12349 -12349);

COMMIT;
