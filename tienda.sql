-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-04-2026 a las 13:35:03
-- Versión del servidor: 8.4.3
-- Versión de PHP: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int UNSIGNED NOT NULL,
  `producto_id` int UNSIGNED NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `fecha_agregado` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `categoria` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `instock` tinyint(1) DEFAULT '1',
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `categoria`, `precio`, `imagen`, `instock`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Elden Ring: Shadow of the Erdtree', 'La expansión más brutal de Elden Ring. Nuevas zonas, jefes imposibles y lore profundo.', 'Souls-like', 59.99, 'elden-ring-shadow.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(2, 'Black Myth: Wukong', 'Juego de acción inspirado en Journey to the West con combates intensos y bosses épicos.', 'Action RPG', 69.99, 'black-myth-wukong.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(3, 'Lies of P', 'Versión oscura de Pinocho con combates precisos y mecánicas souls-like muy exigentes.', 'Souls-like', 49.99, 'lies-of-p.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(4, 'Nioh 3', 'Secuela del aclamado Nioh con sistema de combate ultra profundo y dificultad alta.', 'Action RPG', 69.99, 'nioh-3.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(5, 'Phantom Blade Zero', 'Souls-like con estilo wuxia y combates extremadamente fluidos y desafiantes.', 'Souls-like', 59.99, 'phantom-blade-zero.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(6, 'DOOM: The Dark Ages', 'Regresa el Doom Slayer en esta precuela brutal con acción nonstop y dificultad alta.', 'FPS', 59.99, 'doom-dark-ages.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(7, 'Stellar Blade', 'Hack and slash con combates precisos y jefes que requieren reflejos perfectos.', 'Action', 69.99, 'stellar-blade.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(8, 'Senua\'s Saga: Hellblade II', 'Secuela con narrativa intensa, puzzles y combates muy realistas y duros.', 'Action Adventure', 49.99, 'hellblade-2.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(9, 'Mortal Shell II', 'Souls-like minimalista donde debes dominar diferentes shells para sobrevivir.', 'Souls-like', 39.99, 'mortal-shell-2.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(10, 'Sekiro: Shadows Die Twice', 'Clásico de FromSoftware con sistema de postura y parries ultra exigente.', 'Action Adventure', 49.99, 'sekiro.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(11, 'Celeste', 'Platformer 2D extremadamente difícil con una historia emotiva y precisión milimétrica.', 'Platformer', 19.99, 'celeste.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02'),
(12, 'Hades II', 'Roguelike con combates fluidos, diálogos excelentes y runs cada vez más difíciles.', 'Roguelike', 29.99, 'hades-2.jpg', 1, '2026-04-01 15:18:02', '2026-04-01 15:18:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
