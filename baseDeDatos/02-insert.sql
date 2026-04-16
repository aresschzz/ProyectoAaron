-- =========================
-- EMPRESA
-- =========================
INSERT INTO empresa (nombre) VALUES
('Sony Music'),
('Universal Music');

-- =========================
-- GENERO
-- =========================
INSERT INTO genero (nombre) VALUES
('Rock'),
('Pop'),
('Hip-Hop');

-- =========================
-- ARTISTA
-- =========================
INSERT INTO artista (nombre) VALUES
('The Beatles'),
('Michael Jackson'),
('Daft Punk');

-- =========================
-- CATALOGO VINILO
-- =========================
INSERT INTO catalogo_vinilo (id_artista, id_genero, id_empresa, nombre_albums, anio) VALUES
(1, 1, 1, 'Abbey Road', 1969),
(2, 2, 2, 'Thriller', 1982),
(3, 3, 1, 'Random Access Memories', 2013);

-- =========================
-- ESTADO VINILO
-- =========================
INSERT INTO estado_vinilo (nombre) VALUES
('Nuevo'),
('Usado - Bueno'),
('Usado - Regular');

-- =========================
-- VINILOS (INVENTARIO)
-- =========================
INSERT INTO vinilo (id_catalogo, id_estado_vinilo, precio_venta, precio_compra, disponible) VALUES
(1, 1, 500.00, 300.00, TRUE),
(2, 2, 450.00, 250.00, TRUE),
(3, 1, 600.00, 350.00, TRUE);

-- =========================
-- ROLES
-- =========================
INSERT INTO rol (nombre) VALUES
('admin'),
('cliente'),
('proveedor');

-- =========================
-- DIRECCION
-- =========================
INSERT INTO direccion (calle, numero_ext, numero_int, colonia, ciudad, estado, codigo_postal, referencia) VALUES
('Av. Siempre Viva', 742, NULL, 'Centro', 'CDMX', 'CDMX', '01000', 'Casa amarilla'),
('Calle Falsa', 123, 2, 'Roma', 'CDMX', 'CDMX', '06700', 'Departamento 2');

-- =========================
-- USUARIO
-- =========================
INSERT INTO usuario (id_rol, id_proveedor, id_direccion, nombre, apellido_pa, apellido_ma, telefono, correo, password) VALUES
(2, NULL, 1, 'Juan', 'Perez', 'Lopez', '5512345678', 'juan@test.com', '1234'),
(2, NULL, 2, 'Maria', 'Gomez', 'Diaz', '5511112222', 'maria@test.com', '1234');

-- =========================
-- ORDEN
-- =========================
INSERT INTO orden (id_usuario, fecha, total) VALUES
(1, '2026-04-07', 500.00),
(2, '2026-04-07', 450.00);

-- =========================
-- DETALLE ORDEN
-- =========================
INSERT INTO detalle_orden (id_orden, id_vinilo, precio) VALUES
(1, 1, 500.00),
(2, 2, 450.00);

-- =========================
-- COMPRA VINILO
-- =========================
INSERT INTO compra_vinilo (id_usuario, fecha) VALUES
(1, '2026-04-01');

INSERT INTO detalle_compra (id_compra, id_vinilo, id_estado_vinilo, precio_compra) VALUES
(1, 3, 1, 350.00);

-- =========================
-- PAQUETERIA
-- =========================
INSERT INTO paqueteria (nombre, api_url, api_key) VALUES
('DHL', 'https://api.dhl.com', 'KEY123'),
('FedEx', 'https://api.fedex.com', 'KEY456');

-- =========================
-- ESTATUS ENVIO
-- =========================
INSERT INTO estatus_envio (nombre) VALUES
('Preparando'),
('En tránsito'),
('Entregado');

-- =========================
-- ENVIO
-- =========================
INSERT INTO envio (id_orden, id_paqueteria, id_direccion, numero_guia, costo_envio, fecha_envio, fecha_entrega_estimada) VALUES
(1, 1, 1, 'DHL123456', 120.00, '2026-04-07', '2026-04-10'),
(2, 2, 2, 'FDX987654', 150.00, '2026-04-07', '2026-04-11');