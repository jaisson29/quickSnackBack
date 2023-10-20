-- Active: 1697735015419@@127.0.0.1@3306@quicksnack

-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------

-- Schema quickSnack

-- -----------------------------------------------------

DROP SCHEMA IF EXISTS `quickSnack` ;

-- -----------------------------------------------------

-- Schema quickSnack

-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `quickSnack` DEFAULT CHARACTER SET utf8 ;

USE `quickSnack` ;

-- -----------------------------------------------------

-- Table `quickSnack`.`perfil`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`perfil` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`perfil` (
        `perfilId` INT NOT NULL AUTO_INCREMENT,
        `perfilNom` VARCHAR(45) NOT NULL,
        `paginaRuta` VARCHAR(100) NOT NULL,
        PRIMARY KEY (`perfilId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`dominio`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`dominio` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`dominio` (
        `domId` INT NOT NULL AUTO_INCREMENT,
        `domNom` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`domId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`valor`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`valor` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`valor` (
        `valorId` INT NOT NULL AUTO_INCREMENT,
        `param` VARCHAR(255) NOT NULL,
        `domId` INT NOT NULL,
        PRIMARY KEY (`valorId`),
        INDEX `valueXDomain_idx` (`domId` ASC),
        CONSTRAINT `valueXDomain` FOREIGN KEY (`domId`) REFERENCES `quickSnack`.`dominio` (`domId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`usuario`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`usuario` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`usuario` (
        `usuId` INT NOT NULL AUTO_INCREMENT,
        `usuTipoDoc` INT NOT NULL,
        `usuNoDoc` VARCHAR(12) NOT NULL,
        `usuGen` INT NOT NULL,
        `usuNom` VARCHAR(255) NOT NULL,
        `usuEmail` VARCHAR(255) NOT NULL,
        `usuContra` VARCHAR(20) NOT NULL,
        `usuIngreso` DATETIME NOT NULL,
        `usuImg` VARCHAR(255) NULL,
        `perfilId` INT NOT NULL,
        `usuFecha` DATETIME NULL,
        `usuPassCode` VARCHAR(255) NULL,
        PRIMARY KEY (`usuId`),
        INDEX `userXProfile_idx` (`perfilId` ASC),
        INDEX `genderXValue_idx` (`usuGen` ASC),
        INDEX `docTypeXValue_idx` (`usuTipoDoc` ASC),
        UNIQUE INDEX `usuEmail_UNIQUE` (`usuEmail` ASC),
        UNIQUE INDEX `usuNoDoc_UNIQUE` (`usuNoDoc` ASC),
        INDEX `usuIngreso` (`usuIngreso` ASC),
        CONSTRAINT `userXProfile` FOREIGN KEY (`perfilId`) REFERENCES `quickSnack`.`perfil` (`perfilId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `genderXValue` FOREIGN KEY (`usuGen`) REFERENCES `quickSnack`.`valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `docTypeXValue` FOREIGN KEY (`usuTipoDoc`) REFERENCES `quickSnack`.`valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`pagina`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`pagina` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`pagina` (
        `paginaId` INT NOT NULL AUTO_INCREMENT,
        `paginaNom` VARCHAR(45) NOT NULL,
        `paginaIcon` VARCHAR(45) NOT NULL,
        `paginaRuta` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`paginaId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`perxpag`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`perxpag` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`perxpag` (
        `paginaId` INT NOT NULL,
        `perfilId` INT NOT NULL,
        INDEX `profileXPage_idx` (`perfilId` ASC),
        INDEX `pageXProfile_idx` (`paginaId` ASC),
        CONSTRAINT `profileXPage` FOREIGN KEY (`perfilId`) REFERENCES `quickSnack`.`perfil` (`perfilId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `pageXProfile` FOREIGN KEY (`paginaId`) REFERENCES `quickSnack`.`pagina` (`paginaId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`categoria`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`categoria` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`categoria` (
        `catId` INT NOT NULL AUTO_INCREMENT,
        `catNom` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`catId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`producto`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`producto` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`producto` (
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
        CONSTRAINT `productXCategory` FOREIGN KEY (`catId`) REFERENCES `quickSnack`.`categoria` (`catId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`transaccion`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`transaccion` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`transaccion` (
        `transacId` INT NOT NULL AUTO_INCREMENT,
        `transacFecha` DATETIME NOT NULL,
        `usuId` INT NOT NULL,
        `transacTipo` INT NOT NULL,
        PRIMARY KEY (`transacId`),
        INDEX `saleBillXUser_idx` (`usuId` ASC),
        INDEX `transacXValor_idx` (`transacTipo` ASC),
        CONSTRAINT `saleBillXUser` FOREIGN KEY (`usuId`) REFERENCES `quickSnack`.`usuario` (`usuId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `transacXValor` FOREIGN KEY (`transacTipo`) REFERENCES `quickSnack`.`valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`proveedor`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`proveedor` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`proveedor` (
        `provId` INT NOT NULL AUTO_INCREMENT,
        `provNom` VARCHAR(45) NOT NULL,
        `provNit` BIGINT(10) NOT NULL,
        PRIMARY KEY (`provId`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`compra`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`compra` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`compra` (
        `compraId` INT NOT NULL AUTO_INCREMENT,
        `provId` INT NOT NULL,
        `fechaCompra` DATE NOT NULL,
        PRIMARY KEY (`compraId`),
        INDEX `purchBillXProvider_idx` (`provId` ASC),
        CONSTRAINT `purchBillXProvider` FOREIGN KEY (`provId`) REFERENCES `quickSnack`.`proveedor` (`provId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`detVenta`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`detVenta` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`detVenta` (
        `detVentalId` INT NOT NULL AUTO_INCREMENT,
        `prodId` INT NOT NULL,
        `transacId` INT NOT NULL,
        `detVenCant` INT NOT NULL,
        PRIMARY KEY (`detVentalId`),
        INDEX `saleDetXProduct_idx` (`prodId` ASC),
        INDEX `saleDetXSaleBill_idx` (`transacId` ASC),
        CONSTRAINT `saleDetXProduct` FOREIGN KEY (`prodId`) REFERENCES `quickSnack`.`producto` (`prodId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `saleDetXSaleBill` FOREIGN KEY (`transacId`) REFERENCES `quickSnack`.`transaccion` (`transacId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `quickSnack`.`detCompra`

-- -----------------------------------------------------

DROP TABLE IF EXISTS `quickSnack`.`detCompra` ;

CREATE TABLE
    IF NOT EXISTS `quickSnack`.`detCompra` (
        `detComId` INT NOT NULL AUTO_INCREMENT,
        `prodId` INT NOT NULL,
        `compraId` INT NOT NULL,
        `detComCant` INT NOT NULL,
        INDEX `productXPurchDet_idx` (`prodId` ASC),
        PRIMARY KEY (`detComId`),
        CONSTRAINT `productXPurchDet` FOREIGN KEY (`prodId`) REFERENCES `quickSnack`.`producto` (`prodId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `comXDetCom` FOREIGN KEY (`compraId`) REFERENCES `quickSnack`.`compra` (`compraId`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`perfil`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`perfil` (
        `perfilId`,
        `perfilNom`,
        `paginaRuta`
    )
VALUES (1, 'Administrador', 'usuarios');

INSERT INTO
    `quickSnack`.`perfil` (
        `perfilId`,
        `perfilNom`,
        `paginaRuta`
    )
VALUES (2, 'Usuario', 'menu');

INSERT INTO
    `quickSnack`.`perfil` (
        `perfilId`,
        `perfilNom`,
        `paginaRuta`
    )
VALUES (3, 'Cajero', 'transaccion');

COMMIT;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`dominio`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`dominio` (`domId`, `domNom`)
VALUES (1, 'GENERO');

INSERT INTO
    `quickSnack`.`dominio` (`domId`, `domNom`)
VALUES (2, 'TIPO-DOC');

INSERT INTO
    `quickSnack`.`dominio` (`domId`, `domNom`)
VALUES (3, 'TIPO-TRANSAC');

COMMIT;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`valor`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (1, 'masculino', 1);

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (2, 'femenino', 1);

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (3, 'T.I', 2);

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (4, 'C.C', 2);

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (5, 'C.E', 2);

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (6, 'Recarga', 3);

INSERT INTO
    `quickSnack`.`valor` (`valorId`, `param`, `domId`)
VALUES (7, 'Pago', 3);

COMMIT;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`usuario`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`usuario` (
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
        `usuFecha`,
        `usuPassCode`
    )
VALUES (
        1,
        4,
        '1070004545',
        1,
        'Jay Val',
        'jais@outllok.com',
        '12349',
        '2023-07-23 12:29:34',
        'default-img.webp',
        1,
        NULL,
        NULL
    );

INSERT INTO
    `quickSnack`.`usuario` (
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
        `usuFecha`,
        `usuPassCode`
    )
VALUES (
        2,
        4,
        '12345',
        2,
        'Fercho',
        'fercho@outllok.com',
        '12349',
        '2023-07-23 12:29:34',
        'default-img.webp',
        2,
        NULL,
        NULL
    );

INSERT INTO
    `quickSnack`.`usuario` (
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
        `usuFecha`,
        `usuPassCode`
    )
VALUES (
        3,
        4,
        '32154',
        1,
        'Miguel',
        'miguel@outllok.com',
        '12349',
        '2023-07-23 12:29:34',
        'default-img.webp',
        3,
        NULL,
        NULL
    );

INSERT INTO
    `quickSnack`.`usuario` (
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
        `usuFecha`,
        `usuPassCode`
    )
VALUES (
        4,
        4,
        '987654',
        1,
        'Camilo',
        'camilo@outllok.com',
        '12349',
        '2023-07-23 12:29:34',
        'default-img.webp',
        3,
        NULL,
        NULL
    );

COMMIT;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`pagina`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (2, 'Menu', 'fa-list', '/menu');

INSERT INTO
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
        `paginaId`,
        `paginaNom`,
        `paginaIcon`,
        `paginaRuta`
    )
VALUES (8, 'Valor', 'fa-box', '/valor');

INSERT INTO
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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
    `quickSnack`.`pagina` (
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

-- Data for table `quickSnack`.`perxpag`

-- -----------------------------------------------------

-- ------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (1, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (1, 2);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (1, 3);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (2, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (2, 2);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (2, 3);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (3, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (3, 3);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (13, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (13, 2);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (13, 3);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (5, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (6, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (6, 3);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (7, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (8, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (9, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (10, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (11, 1);

INSERT INTO
    `quickSnack`.`perxpag` (`paginaId`, `perfilId`)
VALUES (12, 1);

COMMIT;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`categoria`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`categoria` (`catId`, `catNom`)
VALUES (2, 'BEBIDAS CALIENTES');

INSERT INTO
    `quickSnack`.`categoria` (`catId`, `catNom`)
VALUES (3, 'BEBIDAS FRIAS');

INSERT INTO
    `quickSnack`.`categoria` (`catId`, `catNom`)
VALUES (4, 'ORGANICOS');

INSERT INTO
    `quickSnack`.`categoria` (`catId`, `catNom`)
VALUES (1, 'OPERACIONES');

COMMIT;

-- -----------------------------------------------------

-- Data for table `quickSnack`.`producto`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`producto` (
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
        '100.000',
        'Producto de recarga',
        'default-img.webp',
        100000,
        100000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
        '50.000',
        'Producto de recarga',
        'default-img.webp',
        50000,
        50000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
        '20.000',
        'Producto de recarga',
        'default-img.webp',
        20000,
        20000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
        '10.000',
        'Producto de recarga',
        'default-img.webp',
        10000,
        10000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
        '5.000',
        'Producto de recarga',
        'default-img.webp',
        5000,
        5000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
        '2.000',
        'Producto de recarga',
        'default-img.webp',
        2000,
        2000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
        '1.000',
        'Producto de recarga',
        'default-img.webp',
        1000,
        1000
    );

INSERT INTO
    `quickSnack`.`producto` (
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
    `quickSnack`.`producto` (
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
    `quickSnack`.`producto` (
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
    `quickSnack`.`producto` (
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
    `quickSnack`.`producto` (
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

-- Data for table `quickSnack`.`proveedor`

-- -----------------------------------------------------

START TRANSACTION;

USE `quickSnack`;

INSERT INTO
    `quickSnack`.`proveedor` (`provId`, `provNom`, `provNit`)
VALUES (1, 'QS', 12349 -12349);

COMMIT;