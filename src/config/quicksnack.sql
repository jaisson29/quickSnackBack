

--
-- Base de datos: `quicksnack`
--
DROP DATABASE IF EXISTS quicksnack;
CREATE DATABASE IF NOT EXISTS quicksnack;
USE quicksnack;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `catId` int(11) NOT NULL,
  `catNom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`catId`, `catNom`) VALUES
(0, 'OPERACIONES'),
(1, 'Bebidas Calientes'),
(2, 'Bebidas Frias'),
(3, 'Organico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `compraId` int(11) NOT NULL,
  `prodId` int(11) NOT NULL,
  `comCantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detcompra`
--

CREATE TABLE `detcompra` (
  `detCompraId` int(11) NOT NULL,
  `provId` int(11) NOT NULL,
  `fechaCompra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detventa`
--

CREATE TABLE `detventa` (
  `transacId` int(11) NOT NULL,
  `prodId` int(11) NOT NULL,
  `venCantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dominio`
--

CREATE TABLE `dominio` (
  `domId` int(11) NOT NULL,
  `domNom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `dominio`
--

INSERT INTO `dominio` (`domId`, `domNom`) VALUES
(1, 'GENDER'),
(2, 'DOC-TYPE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagina`
--

CREATE TABLE `pagina` (
  `paginaId` int(11) NOT NULL,
  `paginaNom` varchar(45) NOT NULL,
  `paginaIcon` varchar(45) NOT NULL,
  `paginaRuta` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `pagina`
--

INSERT INTO `pagina` (`paginaId`, `paginaNom`, `paginaIcon`, `paginaRuta`) VALUES
(1, 'Inicio', 'fa-house', '/home'),
(2, 'Menu', 'fa-check', '/menu'),
(3, 'Productos', 'fa-boxes-stacked', '/productos'),
(4, 'Historial', 'fa-list', '/historial'),
(5, 'Paginas', 'fa-piggy-bank', '/paginas'),
(6, 'Categorias', 'fa-filter', '/categorias'),
(7, 'Dominio', 'fa-box', '/dominio'),
(8, 'Valor', 'fa-box', '/valor'),
(9, 'Compra', 'fa-cart-shopping', '/compra'),
(10, 'Perfil', 'fa-user', '/perfil'),
(11, 'Proveedor', 'fa-car', '/proveedor'),
(12, 'Usuarios', 'fa-users', '/usuarios');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `perfilId` int(11) NOT NULL,
  `perfilNom` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`perfilId`, `perfilNom`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'USUARIO'),
(3, 'CAJERO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfilxpagina`
--

CREATE TABLE `perfilxpagina` (
  `paginaId` int(11) NOT NULL,
  `perfilId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `prodId` int(11) NOT NULL,
  `catId` int(11) NOT NULL,
  `prodNom` varchar(255) NOT NULL,
  `prodDescr` varchar(255) NOT NULL,
  `prodImg` varchar(255) NOT NULL,
  `prodValCom` bigint(10) NOT NULL,
  `prodValVen` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`prodId`, `catId`, `prodNom`, `prodDescr`, `prodImg`, `prodValCom`, `prodValVen`) VALUES
(32, 2, 'Gaseosa', 'Cappuccino', 'logoQS.svg', 123, 1234),
(33, 2, 'Quick', 'Snack', 'logoQSD.svg', 100000000000000, 999999999999999),
(34, 2, 'Gaseosa', 'Fantas de naranja', 'form-select.png', 123, 12345),
(35, 2, 'Perro', 'Caliente', 'td.png', 123, 1234);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `provId` int(11) NOT NULL,
  `provNom` varchar(45) NOT NULL,
  `provNit` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaccion`
--

CREATE TABLE `transaccion` (
  `transacId` int(11) NOT NULL,
  `transacFecha` datetime NOT NULL,
  `transacCant` bigint(15) NOT NULL,
  `usuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuId` int(11) NOT NULL,
  `usuTipoDoc` int(11) NOT NULL,
  `usuNoDoc` varchar(12) NOT NULL,
  `usuGen` int(11) NOT NULL,
  `usuNom` varchar(255) NOT NULL,
  `usuEmail` varchar(255) NOT NULL,
  `usuContra` varchar(20) NOT NULL,
  `usuIngreso` datetime NOT NULL,
  `usuImg` varchar(255) DEFAULT NULL,
  `perfilId` int(11) NOT NULL,
  `usuFecha` datetime DEFAULT NULL,
  `usuPassCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuId`, `usuTipoDoc`, `usuNoDoc`, `usuGen`, `usuNom`, `usuEmail`, `usuContra`, `usuIngreso`, `usuImg`, `perfilId`, `usuFecha`, `usuPassCode`) VALUES
(1, 4, '10700', 1, 'jais', 'jais@outllok.com', '12349', '2023-07-23 12:29:34', 'imgPath', 1, NULL, NULL),
(2, 3, '107000454', 1, 'Jaisson', 'jaiss@outllok.com', '12349', '2023-09-08 15:39:24', NULL, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor`
--

CREATE TABLE `valor` (
  `valorId` int(11) NOT NULL,
  `param` varchar(255) NOT NULL,
  `domId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `valor`
--

INSERT INTO `valor` (`valorId`, `param`, `domId`) VALUES
(1, 'masculino', 1),
(2, 'femenino', 1),
(3, 'T.I', 2),
(4, 'C.C', 2),
(5, 'C.E', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`catId`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`prodId`,`compraId`),
  ADD KEY `productXPurchDet_idx` (`prodId`),
  ADD KEY `purchBillXPurchDet_idx` (`compraId`);

--
-- Indices de la tabla `detcompra`
--
ALTER TABLE `detcompra`
  ADD PRIMARY KEY (`detCompraId`),
  ADD KEY `purchBillXProvider_idx` (`provId`);

--
-- Indices de la tabla `detventa`
--
ALTER TABLE `detventa`
  ADD PRIMARY KEY (`transacId`,`prodId`),
  ADD KEY `saleDetXProduct_idx` (`prodId`);

--
-- Indices de la tabla `dominio`
--
ALTER TABLE `dominio`
  ADD PRIMARY KEY (`domId`);

--
-- Indices de la tabla `pagina`
--
ALTER TABLE `pagina`
  ADD PRIMARY KEY (`paginaId`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`perfilId`);

--
-- Indices de la tabla `perfilxpagina`
--
ALTER TABLE `perfilxpagina`
  ADD KEY `profileXPage_idx` (`perfilId`),
  ADD KEY `pageXProfile_idx` (`paginaId`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`prodId`),
  ADD KEY `productXCategory_idx` (`catId`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`provId`);

--
-- Indices de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD PRIMARY KEY (`transacId`),
  ADD KEY `saleBillXUser_idx` (`usuId`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuId`),
  ADD UNIQUE KEY `usuNoDoc` (`usuNoDoc`),
  ADD UNIQUE KEY `usuEmail_UNIQUE` (`usuEmail`),
  ADD KEY `userXProfile_idx` (`perfilId`),
  ADD KEY `genderXValue_idx` (`usuGen`),
  ADD KEY `docTypeXValue_idx` (`usuTipoDoc`);

--
-- Indices de la tabla `valor`
--
ALTER TABLE `valor`
  ADD PRIMARY KEY (`valorId`),
  ADD KEY `valueXDomain_idx` (`domId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `catId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `detcompra`
--
ALTER TABLE `detcompra`
  MODIFY `detCompraId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dominio`
--
ALTER TABLE `dominio`
  MODIFY `domId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pagina`
--
ALTER TABLE `pagina`
  MODIFY `paginaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `perfilId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `prodId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `provId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transaccion`
--
ALTER TABLE `transaccion`
  MODIFY `transacId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usuId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `valor`
--
ALTER TABLE `valor`
  MODIFY `valorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `productXPurchDet` FOREIGN KEY (`prodId`) REFERENCES `producto` (`prodId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `purchBillXPurchDet` FOREIGN KEY (`compraId`) REFERENCES `detcompra` (`detCompraId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detcompra`
--
ALTER TABLE `detcompra`
  ADD CONSTRAINT `purchBillXProvider` FOREIGN KEY (`provId`) REFERENCES `proveedor` (`provId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detventa`
--
ALTER TABLE `detventa`
  ADD CONSTRAINT `saleDetXProduct` FOREIGN KEY (`prodId`) REFERENCES `producto` (`prodId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `saleDetXSaleBill` FOREIGN KEY (`transacId`) REFERENCES `transaccion` (`transacId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `perfilxpagina`
--
ALTER TABLE `perfilxpagina`
  ADD CONSTRAINT `pageXProfile` FOREIGN KEY (`paginaId`) REFERENCES `pagina` (`paginaId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `profileXPage` FOREIGN KEY (`perfilId`) REFERENCES `perfil` (`perfilId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `productXCategory` FOREIGN KEY (`catId`) REFERENCES `categoria` (`catId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `transaccion`
--
ALTER TABLE `transaccion`
  ADD CONSTRAINT `saleBillXUser` FOREIGN KEY (`usuId`) REFERENCES `usuario` (`usuId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `docTypeXValue` FOREIGN KEY (`usuTipoDoc`) REFERENCES `valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `genderXValue` FOREIGN KEY (`usuGen`) REFERENCES `valor` (`valorId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userXProfile` FOREIGN KEY (`perfilId`) REFERENCES `perfil` (`perfilId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `valor`
--
ALTER TABLE `valor`
  ADD CONSTRAINT `valueXDomain` FOREIGN KEY (`domId`) REFERENCES `dominio` (`domId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

