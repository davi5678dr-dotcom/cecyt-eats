-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2026 a las 09:14:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cecyt_eats`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 3, 1, 12.00),
(2, 1, 4, 1, 10.00),
(3, 1, 1, 1, 25.00),
(4, 2, 6, 1, 28.00),
(5, 2, 5, 1, 35.00),
(6, 2, 1, 1, 25.00),
(7, 3, 1, 2, 25.00),
(8, 3, 3, 1, 12.00),
(9, 4, 3, 2, 12.00),
(10, 4, 4, 1, 10.00),
(11, 4, 1, 1, 25.00),
(12, 5, 6, 1, 28.00),
(13, 5, 4, 1, 10.00),
(14, 5, 3, 1, 12.00),
(15, 6, 3, 2, 12.00),
(16, 6, 4, 2, 10.00),
(17, 6, 2, 2, 18.00),
(18, 7, 4, 2, 10.00),
(19, 7, 3, 1, 12.00),
(20, 7, 2, 1, 18.00),
(21, 8, 3, 1, 12.00),
(22, 8, 1, 1, 30.00),
(23, 8, 6, 1, 28.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL,
  `estado_pedido` enum('Pendiente','Preparando','Listo para entrega','Entregado') NOT NULL DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `fecha_hora`, `total`, `estado_pedido`) VALUES
(1, 5, '2026-06-15 08:53:15', 47.00, 'Entregado'),
(2, 7, '2026-06-15 09:10:52', 88.00, 'Listo para entrega'),
(3, 8, '2026-06-15 09:20:18', 62.00, 'Preparando'),
(4, 10, '2026-06-15 09:45:53', 59.00, 'Listo para entrega'),
(5, 12, '2026-06-15 10:01:47', 50.00, 'Preparando'),
(6, 15, '2026-06-17 20:57:36', 80.00, 'Listo para entrega'),
(7, 17, '2026-06-18 16:20:49', 50.00, 'Listo para entrega'),
(8, 24, '2026-06-20 00:13:42', 70.00, 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(120) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(8,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `estado_disponible` tinyint(1) NOT NULL DEFAULT 1,
  `imagen` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `descripcion`, `precio`, `stock`, `estado_disponible`, `imagen`) VALUES
(1, 'Torta de Jamón', 'Con jitomate, lechuga y crema.', 30.00, 9, 1, ''),
(2, 'Quesadilla de Queso', 'Tortilla de maíz, queso Oaxaca.', 18.00, 6, 1, ''),
(3, 'Arroz con Leche', 'Postre tradicional con canela.', 12.00, -4, 1, ''),
(4, 'Agua de Jamaica', 'Bebida natural, sin azúcar.', 10.00, 13, 1, ''),
(5, 'Tacos de Guisado', '3 tacos con salsa verde.', 35.00, 7, 1, ''),
(6, 'Ensalada César', 'Lechuga, crutones y aderezo.', 28.00, 0, 1, ''),
(7, 'Chilaquiles', 'tiene chile, pollo, crema, queso doble crema ', 35.00, 7, 1, ''),
(8, 'Tacos  Dorados', 'Tienen Pollo, Crema, Lechuga, Queso doble crema', 29.00, 4, 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `correo` varchar(120) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `rol` enum('alumno','administrador') NOT NULL DEFAULT 'alumno'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo`, `contrasena`, `rol`) VALUES
(1, 'Maria ', 'mar@gmail.com', '$2b$10$DKarngpwxK4zhB.iFqENC.Lafodt3DgEhlE17C2hPeMhL4l1xKXG6', 'alumno'),
(2, 'David ', 'dav@gmail.com', '$2b$10$RL0SFjHPeM4jM3kzc/HCkOMxDa1PkBRaRacY6xfjJWi3a8Drp2n5C', 'alumno'),
(3, 'David', 'david@gmail.com', '$2b$10$alyq0keNNN.aE63fXlYO6uTQl.Pd3BaJmLuf1zMUSh6ZJ3LYyYpYu', 'administrador'),
(4, 'Berenice ', 'bere1234@gmail.com', '$2b$10$L7vSf68fqGudUcPU0iaoUO6fITYWDwF6GBUYdq/vRUCk5UCk5xW.6', 'alumno'),
(5, 'valeria ', 'vale@gmail.com', '$2b$10$h5CCVOhZozVwTbucZvr2hOfJqnyhM/a0COGvtPEa5um8bNM6e0fPm', 'alumno'),
(6, 'Carlos', 'car@gmail.com', '$2b$10$BPe978Tn4qCQhhw0mg1jPecQtyuJyf1dxZuEZpCdRRG4bsoIwlRxe', 'administrador'),
(7, 'mauricio', 'mau@gmail.com', '$2b$10$BiM4i/vRGSJduPX7UI8vKeZC.QMmz7T29lLNOxeLWP15s.elkhMAG', 'alumno'),
(8, 'noe david ', 'noda@gmail.com', '$2b$10$0dNsOGOoqSvG5odn6iTjDOMOkzDUramFw.MM6aMIKCIJpmf4SmYYq', 'alumno'),
(9, 'cristobal', 'crsi@gmail.com', '$2b$10$3HWCG/mQtN8/4ZftGEl6JOb0N/Zu1BHPPACkl.ZmVYL0qk2W36GLe', 'administrador'),
(10, 'Julio', 'juli@gmail.com', '$2b$10$VmjIRGkQfl.ngWtNIICb3O.wVbFMP/AiQCXeaWV8tNonzwVcIc3zi', 'alumno'),
(11, 'Angeles ', 'anage@gmail.com', '$2b$10$tMSjAkE.uWz6.yKgqdoL.uX0aqOMmaGR//i.kpzLacLy/mhBEiGma', 'administrador'),
(12, 'Diego', 'diego@gmail.com', '$2b$10$bowk/E9A1sxhj3/s6N7ESeJ.FOBBruCCS5is9V9vERLbbWvX7Aq/G', 'alumno'),
(13, 'Esme ', 'esme@gmail.com', '$2b$10$k9Re18KcN77ztMF4ZwhHC.gY4dXisjk/lgL8kgVQKnzhqH5O8MNmG', 'administrador'),
(14, 'Octavio', 'octa@gmail.com', '$2b$10$gWikWA4OvWlM1OMP9xKEX.ZpvpGhzDB3GjLfTSBtaV7q1P2BVQqQW', 'alumno'),
(15, 'Valentina ', 'vala@gmail.com', '$2b$10$ih75boZ5IcvZlFpvBJT/0.fo7jVPCfdvh.5ZmpiyDUqDoyNWm1p7W', 'alumno'),
(16, 'Brayan ', 'bra1234@gmail.com', '$2b$10$qmxvVP0fj2grDPvJQMuFX.taZbmA4/m03m4YhG74PJ2z0IFtdh4C2', 'administrador'),
(17, 'Karla', 'kar@gmail.com', '$2b$10$m19QFZXGg02ub8L5sIO5qegDtvAIQ16Ya2WaiPeAu.4q.3YiPVQeq', 'alumno'),
(18, 'Angel  seberiano', 'ange@gmail.com', '$2b$10$q0T2FyLibkH2f.ziWZ7TDemBFvc5tJJPUZ5hEkEemJcX4rCR8Xzt2', 'administrador'),
(19, 'David González ', 'Davgo@gmail.com', '$2b$10$v0qqRrg2LagkN5S4kaY9c.wr5Bvn2cfS.zFduJPMNy07Hsu5TZKNa', 'alumno'),
(20, 'Nayeli', 'naye67@gmail.com', '$2b$10$.jBs4spPtsLFg7FOxbwEl.kDFydA/4OAB3p8jT3xai.YaGmd/N4tK', 'alumno'),
(21, 'Susana', 'susi@gmail.com', '$2b$10$jQss5Z8qBVCnGIn2XNNWUuVzH.T8AsWEo/W96cuYutbbd2R9XojHe', 'alumno'),
(22, 'Marian gomes ', 'maria@gmail.com', '$2b$10$6/5W4lcArIDamL6qTn.QAOmOIk5xgjAvWD2P9xf84w/UIBebh5XMO', 'administrador'),
(23, 'Lorenzo', 'lorezo@gmail.com', '$2b$10$rUz.iJREuLBO2YjvPI4IeOT.6JYzXN1x5dLF3v1JH.w.A7PR0C/oW', 'alumno'),
(24, 'Tere Gomes ', 'te12@gmail.com', '$2b$10$VD3qKf1nxg8ca7jyEIzAmekphLO/7OC3iyBav/MaB1CP9wn2IcGAW', 'alumno'),
(25, 'Chavo', 'chavi@gmail.com', '$2b$10$egvUKeQQZeHDKx3XpQcPW.2e/sJOI/N0WnT4dyzbl5ev4l19kdq/G', 'alumno');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
