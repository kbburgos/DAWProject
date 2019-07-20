-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 20-07-2019 a las 17:13:59
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sis_medic`
--
CREATE DATABASE IF NOT EXISTS `db_sis_medic` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `db_sis_medic`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

DROP TABLE IF EXISTS `cita`;
CREATE TABLE IF NOT EXISTS `cita` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `node` text NOT NULL,
  `message` text NOT NULL,
  `date_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_web` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_user_reg` int(11) NOT NULL,
  PRIMARY KEY (`id_cita`),
  KEY `id_medico` (`id_medico`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_user_reg` (`id_user_reg`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
CREATE TABLE IF NOT EXISTS `especialidad` (
  `id_esp` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `cread_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_esp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico_especialidad`
--

DROP TABLE IF EXISTS `medico_especialidad`;
CREATE TABLE IF NOT EXISTS `medico_especialidad` (
  `id_me` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_medico` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_me`),
  KEY `id_especialidad` (`id_especialidad`),
  KEY `id_medico` (`id_medico`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `created_ad` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `table_img`
--

DROP TABLE IF EXISTS `table_img`;
CREATE TABLE IF NOT EXISTS `table_img` (
  `id_img` int(11) NOT NULL AUTO_INCREMENT,
  `image` longblob NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_img`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tratamientos`
--

DROP TABLE IF EXISTS `tratamientos`;
CREATE TABLE IF NOT EXISTS `tratamientos` (
  `id_tratamiento` int(11) NOT NULL AUTO_INCREMENT,
  `cara` varchar(30) NOT NULL,
  `tratamiento` varchar(30) NOT NULL,
  `pos` int(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_tratamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tratamientos_citas`
--

DROP TABLE IF EXISTS `tratamientos_citas`;
CREATE TABLE IF NOT EXISTS `tratamientos_citas` (
  `id_tc` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tratamiento` int(11) NOT NULL,
  `id_cita` int(11) NOT NULL,
  PRIMARY KEY (`id_tc`),
  KEY `id_cita` (`id_cita`),
  KEY `id_tratamiento` (`id_tratamiento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `pasword` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `rol` int(11) NOT NULL,
  `image` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  KEY `rol` (`rol`),
  KEY `image` (`image`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `cita_ibfk_3` FOREIGN KEY (`id_user_reg`) REFERENCES `user` (`id_user`);

--
-- Filtros para la tabla `medico_especialidad`
--
ALTER TABLE `medico_especialidad`
  ADD CONSTRAINT `medico_especialidad_ibfk_1` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_esp`),
  ADD CONSTRAINT `medico_especialidad_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `user` (`id_user`);

--
-- Filtros para la tabla `tratamientos_citas`
--
ALTER TABLE `tratamientos_citas`
  ADD CONSTRAINT `tratamientos_citas_ibfk_1` FOREIGN KEY (`id_cita`) REFERENCES `cita` (`id_cita`),
  ADD CONSTRAINT `tratamientos_citas_ibfk_2` FOREIGN KEY (`id_tratamiento`) REFERENCES `tratamientos` (`id_tratamiento`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id_rol`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`image`) REFERENCES `table_img` (`id_img`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
