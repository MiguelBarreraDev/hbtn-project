--
-- Base de datos: `holberton_db`
--

CREATE DATABASE IF NOT EXISTS `holberton_db`;
use `holberton_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_request`
--

CREATE TABLE `api_request` (
  `id` int(8) NOT NULL,
  `url` text NOT NULL,
  `cabecera` longtext NOT NULL,
  `cuerpo` longtext NOT NULL,
  `f_consulta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `f_respuesta` timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `api_response`
--

CREATE TABLE `api_response` (
  `id` int(8) NOT NULL,
  `url` text NOT NULL,
  `cabecera` longtext NOT NULL,
  `cuerpo` longtext NOT NULL,
  `f_consulta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `f_respuesta` timestamp
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `id` int(8) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `calificacion` int(11) NOT NULL,
  `creado_por` text NOT NULL,
  `creado_el` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `actualizado_por` text NOT NULL,
  `actualizado_el` timestamp,
  `eliminado_por` text NOT NULL,
  `eliminado_el` timestamp,
  `eliminado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reporte`
--

INSERT INTO `reporte` (`id`, `id_usuario`, `id_tipo`, `calificacion`, `creado_por`, `creado_el`, `actualizado_por`, `actualizado_el`, `eliminado_por`, `eliminado_el`, `eliminado`) VALUES
(1, 2, 1, 5, 'rogelio', '2022-10-25 17:39:36', 'rogelio', '', 'rogelio', '', 0),
(2, 2, 2, 12, 'rogelio', '2022-10-25 17:44:59', 'rogelio', '', 'rogelio', '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(50) NOT NULL,
  `nombre` text NOT NULL,
  `descripcion` text,
  `creado_el` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creado_por` text NOT NULL,
  `actualizado_el` timestamp,
  `actualizado_por` text NOT NULL,
  `eliminado_el` timestamp,
  `eliminado_por` text NOT NULL,
  `eliminado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`, `creado_el`, `creado_por`, `actualizado_el`, `actualizado_por`, `eliminado_el`, `eliminado_por`, `eliminado`) VALUES
(1, 'admin', 'administrador', '2022-10-25 17:20:48', 'ruben', '', 'ruben', '', 'ruben', 0),
(2, 'staff', 'usuarios del staff, menor al admin', '2022-10-25 17:21:45', 'ruben', '', 'ruben', '', 'ruben', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(50) NOT NULL,
  `id_rol` int(50) NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `email` text NOT NULL,
  `estado` int(50) NOT NULL,
  `creado_el` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creado_por` text NOT NULL,
  `actualizado_el` timestamp,
  `actualizado_por` text NOT NULL,
  `eliminado_el` timestamp,
  `eliminado_por` text NOT NULL,
  `eliminado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_rol`, `nombre`, `apellido`, `email`, `estado`, `creado_el`, `creado_por`, `actualizado_el`, `actualizado_por`, `eliminado_el`, `eliminado_por`, `eliminado`) VALUES
(1, 1, 'ruben', 'cadenas', 'ruben.cadenas@holbertonschool.com', 1, '0000-00-00 00:00:00', 'ruben', '', 'ruben', '', 'ruben', 0),
(2, 1, 'rogelio', 'conde', '3701@holbertonstudents.com', 0, '2022-10-25 17:34:33', 'ruben', '', 'ruben', '', 'ruben', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `api_request`
--
ALTER TABLE `api_request`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `api_response`
--
ALTER TABLE `api_response`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_roles_option` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_roles_options` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `api_request`
--
ALTER TABLE `api_request`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `api_response`
--
ALTER TABLE `api_response`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `fk_roles_option` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_roles_options` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;