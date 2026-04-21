-- =========================
-- EMPRESA
-- =========================
INSERT INTO empresa (nombre) VALUES
('Sony Music'),
('Universal Music'),
('Warner Music Group'),
('EMI Records'),
('Atlantic Records'),
('Columbia Records'),
('Capitol Records'),
('Interscope Records'),
('Def Jam Recordings'),
('Virgin Records');

-- =========================
-- GENERO
-- =========================
INSERT INTO genero (nombre) VALUES
('Rock'),
('Pop'),
('Hip-Hop'),
('Jazz'),
('Blues'),
('Electronic'),
('Reggae'),
('Metal'),
('Classical'),
('R&B'),
('Funk'),
('Soul'),
('Country'),
('Latin'),
('Punk');

-- =========================
-- ARTISTA
-- =========================
INSERT INTO artista (nombre) VALUES
('The Beatles'),
('Michael Jackson'),
('Daft Punk'),
('Pink Floyd'),
('Led Zeppelin'),
('David Bowie'),
('Queen'),
('The Rolling Stones'),
('Nirvana'),
('Radiohead'),
('Kendrick Lamar'),
('Jay-Z'),
('Miles Davis'),
('Bob Marley'),
('Metallica'),
('Prince'),
('Fleetwood Mac'),
('The Doors'),
('Aretha Franklin'),
('Elvis Presley');

-- =========================
-- CATALOGO VINILO
-- =========================
INSERT INTO catalogo_vinilo (id_artista, id_genero, id_empresa, nombre_albums, anio) VALUES
(1, 1, 1, 'Abbey Road', 1969),
(2, 2, 2, 'Thriller', 1982),
(3, 6, 1, 'Random Access Memories', 2013),
(4, 1, 3, 'The Dark Side of the Moon', 1973),
(5, 1, 3, 'Led Zeppelin IV', 1971),
(6, 1, 4, 'The Rise and Fall of Ziggy Stardust', 1972),
(7, 1, 4, 'A Night at the Opera', 1975),
(8, 1, 1, 'Sticky Fingers', 1971),
(9, 1, 5, 'Nevermind', 1991),
(10, 1, 5, 'OK Computer', 1997),
(11, 3, 6, 'To Pimp a Butterfly', 2015),
(12, 3, 9, 'The Blueprint', 2001),
(13, 4, 6, 'Kind of Blue', 1959),
(14, 7, 4, 'Legend', 1984),
(15, 8, 1, 'Master of Puppets', 1986),
(16, 11, 7, 'Purple Rain', 1984),
(17, 2, 8, 'Rumours', 1977),
(18, 1, 1, 'L.A. Woman', 1971),
(19, 12, 5, 'I Never Loved a Man the Way I Love You', 1967),
(20, 2, 2, 'Elvis Presley', 1956),
(1, 1, 1, 'Sgt. Pepper''s Lonely Hearts Club Band', 1967),
(1, 1, 1, 'Let It Be', 1970),
(2, 2, 2, 'Bad', 1987),
(4, 1, 3, 'Wish You Were Here', 1975),
(7, 1, 4, 'News of the World', 1977),
(6, 1, 4, 'Heroes', 1977),
(9, 1, 5, 'In Utero', 1993),
(10, 1, 5, 'The Bends', 1995),
(5, 1, 3, 'Physical Graffiti', 1975),
(15, 8, 1, 'Ride the Lightning', 1984);

-- =========================
-- ESTADO VINILO
-- =========================
INSERT INTO estado_vinilo (nombre) VALUES
('Nuevo'),
('Usado - Bueno'),
('Usado - Regular'),
('Usado - Malo'),
('Sellado'),
('Coleccionista');

-- =========================
-- VINILOS (INVENTARIO)
-- =========================
INSERT INTO vinilo (id_catalogo, id_estado_vinilo, precio_venta, precio_compra, disponible) VALUES
(1,  1, 500.00, 300.00, TRUE),
(2,  2, 450.00, 250.00, TRUE),
(3,  1, 600.00, 350.00, TRUE),
(4,  1, 750.00, 450.00, TRUE),
(5,  2, 680.00, 400.00, TRUE),
(6,  1, 720.00, 420.00, TRUE),
(7,  3, 390.00, 200.00, TRUE),
(8,  2, 470.00, 270.00, TRUE),
(9,  1, 520.00, 310.00, TRUE),
(10, 1, 580.00, 340.00, TRUE),
(11, 2, 430.00, 240.00, TRUE),
(12, 1, 490.00, 280.00, TRUE),
(13, 6, 950.00, 600.00, TRUE),
(14, 1, 410.00, 220.00, TRUE),
(15, 2, 640.00, 380.00, TRUE),
(16, 1, 700.00, 410.00, TRUE),
(17, 1, 530.00, 310.00, TRUE),
(18, 3, 360.00, 180.00, TRUE),
(19, 5, 820.00, 500.00, TRUE),
(20, 2, 780.00, 470.00, TRUE),
(21, 1, 510.00, 300.00, TRUE),
(22, 4, 280.00, 130.00, FALSE),
(23, 2, 460.00, 260.00, TRUE),
(24, 1, 740.00, 440.00, TRUE),
(25, 3, 370.00, 190.00, TRUE),
(26, 1, 690.00, 400.00, TRUE),
(27, 2, 500.00, 290.00, TRUE),
(28, 1, 560.00, 330.00, TRUE),
(29, 6, 990.00, 650.00, TRUE),
(30, 2, 610.00, 360.00, TRUE);

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
('Av. Siempre Viva',      742,  NULL, 'Centro',          'CDMX',        'CDMX',          '01000', 'Casa amarilla'),
('Calle Falsa',           123,  2,    'Roma',             'CDMX',        'CDMX',          '06700', 'Departamento 2'),
('Insurgentes Sur',      1500,  NULL, 'Del Valle',        'CDMX',        'CDMX',          '03100', 'Edificio azul'),
('Av. Juárez',            300,  5,    'Centro Histórico', 'CDMX',        'CDMX',          '06000', 'Frente al parque'),
('Calle Morelos',          88,  NULL, 'Narvarte',         'CDMX',        'CDMX',          '03020', 'Casa con reja verde'),
('Río Consulado',         210,  NULL, 'Pensil',           'CDMX',        'CDMX',          '11430', 'Cerca del metro'),
('Av. Revolución',        455,  3,    'Mixcoac',          'CDMX',        'CDMX',          '01460', 'Piso 3'),
('Calzada de Tlalpan',    870,  NULL, 'Portales',         'CDMX',        'CDMX',          '09300', 'Junto a farmacia'),
('Blvd. Miguel de Cervantes', 90, NULL,'Coyoacán',        'CDMX',        'CDMX',          '04000', 'Casa con jardín'),
('Calle Hidalgo',          15,  1,    'Cuauhtémoc',       'Guadalajara', 'Jalisco',        '44200', 'Cerca de la catedral'),
('Av. Vallarta',          200,  NULL, 'Chapalita',        'Guadalajara', 'Jalisco',        '45040', 'Casa blanca'),
('Calle Zaragoza',         50,  NULL, 'Centro',           'Monterrey',   'Nuevo León',     '64000', 'Local interior'),
('Av. Constitución',      789,  2,    'Obispado',         'Monterrey',   'Nuevo León',     '64010', 'Departamento 2B'),
('Paseo de la Reforma',  2000,  NULL, 'Lomas',            'CDMX',        'CDMX',          '11000', 'Torre corporativa'),
('Av. Universidad',       350,  NULL, 'Copilco',          'CDMX',        'CDMX',          '04360', 'Frente a la UNAM');

-- =========================
-- USUARIO
-- =========================
INSERT INTO usuario (id_rol, id_proveedor, id_direccion, nombre, apellido_pa, apellido_ma, telefono, correo, password) VALUES
(2, NULL,  1, 'Juan',     'Perez',      'Lopez',      '5512345678', 'juan@test.com',       '1234'),
(2, NULL,  2, 'Maria',    'Gomez',      'Diaz',       '5511112222', 'maria@test.com',      '1234'),
(2, NULL,  3, 'Carlos',   'Hernandez',  'Martinez',   '5533334444', 'carlos@test.com',     '1234'),
(2, NULL,  4, 'Ana',      'Torres',     'Ruiz',       '5544445555', 'ana@test.com',        '1234'),
(2, NULL,  5, 'Luis',     'Ramirez',    'Flores',     '5555556666', 'luis@test.com',       '1234'),
(2, NULL,  6, 'Sofia',    'Mendoza',    'Vargas',     '5566667777', 'sofia@test.com',      '1234'),
(2, NULL,  7, 'Diego',    'Jimenez',    'Cruz',       '5577778888', 'diego@test.com',      '1234'),
(2, NULL,  8, 'Valeria',  'Morales',    'Reyes',      '5588889999', 'valeria@test.com',    '1234'),
(2, NULL,  9, 'Andres',   'Ortega',     'Guerrero',   '5599990000', 'andres@test.com',     '1234'),
(2, NULL, 10, 'Camila',   'Rios',       'Castillo',   '5500001111', 'camila@test.com',     '1234'),
(2, NULL, 11, 'Fernando', 'Navarro',    'Ibarra',     '5511223344', 'fernando@test.com',   '1234'),
(2, NULL, 12, 'Lucia',    'Delgado',    'Vega',       '5522334455', 'lucia@test.com',      '1234'),
(1, NULL, 13, 'Admin',    'Sistema',    'General',    '5500000001', 'admin@tienda.com',    'admin123'),
(3, NULL, 14, 'Proveedor','Discos',     'SA',         '5500000002', 'proveedor@discos.com','prov456'),
(2, NULL, 15, 'Roberto',  'Salinas',    'Pena',       '5533445566', 'roberto@test.com',    '1234');

-- =========================
-- ORDEN
-- =========================
INSERT INTO orden (id_usuario, fecha, total) VALUES
(1,  '2026-04-07', 500.00),
(2,  '2026-04-07', 450.00),
(3,  '2026-04-08', 750.00),
(4,  '2026-04-08', 1200.00),
(5,  '2026-04-09', 680.00),
(6,  '2026-04-09', 520.00),
(7,  '2026-04-10', 990.00),
(8,  '2026-04-10', 430.00),
(9,  '2026-04-11', 1450.00),
(10, '2026-04-11', 600.00),
(1,  '2026-04-12', 720.00),
(2,  '2026-04-12', 870.00),
(3,  '2026-04-13', 460.00),
(11, '2026-04-13', 1100.00),
(12, '2026-04-14', 580.00),
(15, '2026-04-14', 740.00),
(5,  '2026-04-15', 390.00),
(7,  '2026-04-15', 820.00),
(9,  '2026-04-16', 640.00),
(10, '2026-04-16', 510.00);

-- =========================
-- DETALLE ORDEN
-- =========================
INSERT INTO detalle_orden (id_orden, id_vinilo, precio) VALUES
(1,  1,  500.00),
(2,  2,  450.00),
(3,  4,  750.00),
(4,  13, 950.00),
(4,  14, 250.00),
(5,  5,  680.00),
(6,  9,  520.00),
(7,  29, 990.00),
(8,  11, 430.00),
(9,  19, 820.00),
(9,  6,  630.00),
(10, 3,  600.00),
(11, 7,  390.00),
(11, 23, 330.00),
(12, 16, 700.00),
(12, 17, 170.00),
(13, 8,  460.00),
(14, 24, 740.00),
(14, 26, 360.00),
(15, 10, 580.00),
(16, 15, 640.00),
(16, 30, 100.00),
(17, 25, 370.00),
(18, 20, 780.00),
(18, 27, 40.00),
(19, 28, 560.00),
(19, 21, 80.00),
(20, 12, 490.00),
(20, 22, 20.00),
(20, 18, 0.00);

-- =========================
-- COMPRA VINILO
-- =========================
INSERT INTO compra_vinilo (id_usuario, fecha) VALUES
(1,  '2026-04-01'),
(13, '2026-04-02'),
(13, '2026-04-05'),
(14, '2026-04-06'),
(13, '2026-04-08'),
(14, '2026-04-10');

INSERT INTO detalle_compra (id_compra, id_vinilo, id_estado_vinilo, precio_compra) VALUES
(1, 3,  1, 350.00),
(2, 7,  3, 120.00),
(2, 8,  2, 200.00),
(3, 11, 2, 190.00),
(3, 18, 3,  80.00),
(3, 22, 4,  60.00),
(4, 25, 2, 150.00),
(4, 27, 1, 250.00),
(5, 13, 6, 520.00),
(5, 19, 5, 440.00),
(6, 29, 6, 600.00),
(6, 20, 2, 380.00);

-- =========================
-- PAQUETERIA
-- =========================
INSERT INTO paqueteria (nombre, api_url, api_key) VALUES
('DHL',      'https://api.dhl.com',       'KEY123'),
('FedEx',    'https://api.fedex.com',     'KEY456'),
('Estafeta', 'https://api.estafeta.com',  'KEY789'),
('Redpack',  'https://api.redpack.com.mx','KEY101'),
('J&T',      'https://api.jtexpress.mx',  'KEY202'),
('Sendex',   'https://api.sendex.mx',     'KEY303');

-- =========================
-- ESTATUS ENVIO
-- =========================
INSERT INTO estatus_envio (nombre) VALUES
('Preparando'),
('En tránsito'),
('Entregado'),
('Cancelado'),
('Devuelto'),
('En espera de recolección');

-- =========================
-- ENVIO
-- =========================
INSERT INTO envio (id_orden, id_paqueteria, id_direccion, numero_guia, costo_envio, fecha_envio, fecha_entrega_estimada) VALUES
(1,  1, 1,  'DHL123456',  120.00, '2026-04-07', '2026-04-10'),
(2,  2, 2,  'FDX987654',  150.00, '2026-04-07', '2026-04-11'),
(3,  3, 3,  'EST111222',  100.00, '2026-04-08', '2026-04-12'),
(4,  1, 4,  'DHL222333',  120.00, '2026-04-08', '2026-04-11'),
(5,  4, 5,  'RDP333444',   90.00, '2026-04-09', '2026-04-13'),
(6,  5, 6,  'JNT444555',   85.00, '2026-04-09', '2026-04-14'),
(7,  2, 7,  'FDX555666',  150.00, '2026-04-10', '2026-04-13'),
(8,  3, 8,  'EST666777',  100.00, '2026-04-10', '2026-04-14'),
(9,  1, 9,  'DHL777888',  120.00, '2026-04-11', '2026-04-14'),
(10, 6, 10, 'SDX888999',   95.00, '2026-04-11', '2026-04-15'),
(11, 4, 1,  'RDP999000',   90.00, '2026-04-12', '2026-04-16'),
(12, 2, 2,  'FDX000111',  150.00, '2026-04-12', '2026-04-15'),
(13, 5, 3,  'JNT111000',   85.00, '2026-04-13', '2026-04-17'),
(14, 1, 14, 'DHL321654',  130.00, '2026-04-13', '2026-04-16'),
(15, 3, 15, 'EST654321',  100.00, '2026-04-14', '2026-04-18'),
(16, 6, 11, 'SDX159753',   95.00, '2026-04-14', '2026-04-18'),
(17, 4, 12, 'RDP753951',   90.00, '2026-04-15', '2026-04-19'),
(18, 5, 13, 'JNT852963',   85.00, '2026-04-15', '2026-04-19'),
(19, 2, 5,  'FDX963741',  150.00, '2026-04-16', '2026-04-19'),
(20, 1, 6,  'DHL147258',  120.00, '2026-04-16', '2026-04-20');
