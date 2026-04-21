-- =========================
-- BASE
-- =========================
CREATE TABLE empresa (
    id_empresa SERIAL PRIMARY KEY,
    nombre VARCHAR(150)
);
CREATE TABLE genero (
    id_genero SERIAL PRIMARY KEY,
    nombre VARCHAR(150)
);
CREATE TABLE artista (
    id_artista SERIAL PRIMARY KEY,
    nombre VARCHAR(150)
);
-- =========================
-- CATALOGO
-- =========================
CREATE TABLE catalogo_vinilo (
    id_catalogo_vinilo SERIAL PRIMARY KEY,
    id_artista INT REFERENCES artista(id_artista),
    id_genero INT REFERENCES genero(id_genero),
    id_empresa INT REFERENCES empresa(id_empresa),
    nombre_albums VARCHAR(150),
    anio INT,
    imagen_url VARCHAR(250)
);
-- =========================
-- ESTADO VINILO
-- =========================
CREATE TABLE estado_vinilo (
    id_estado_vinilo SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);
-- =========================
-- VINILO
-- =========================
CREATE TABLE vinilo (
    id_vinilo SERIAL PRIMARY KEY,
    id_catalogo INT REFERENCES catalogo_vinilo(id_catalogo_vinilo),
    id_estado_vinilo INT REFERENCES estado_vinilo(id_estado_vinilo),
    precio_venta NUMERIC(10,2),
    precio_compra NUMERIC(10,2),
    disponible BOOLEAN
);
-- =========================
-- ROLES
-- =========================
CREATE TABLE rol (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);
-- =========================
-- DIRECCION
-- =========================
CREATE TABLE direccion (
    id_direccion SERIAL PRIMARY KEY,
    calle VARCHAR(150),
    numero_ext INT,
    numero_int INT,
    colonia VARCHAR(50),
    ciudad VARCHAR(100),
    estado VARCHAR(100),
    codigo_postal VARCHAR(10),
    referencia VARCHAR(150)
);
-- =========================
-- USUARIO
-- =========================
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    id_rol INT REFERENCES rol(id_rol),
    id_proveedor INT,
    id_direccion INT REFERENCES direccion(id_direccion),
    nombre VARCHAR(100),
    apellido_pa VARCHAR(50),
    apellido_ma VARCHAR(50),
    telefono VARCHAR(15),
    correo VARCHAR(50),
    password VARCHAR(250)
);
-- =========================
-- ORDEN
-- =========================
CREATE TABLE orden (
    id_orden SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario),
    fecha DATE,
    total NUMERIC(10,2)
);
CREATE TABLE detalle_orden (
    id_detalle_o SERIAL PRIMARY KEY,
    id_orden INT REFERENCES orden(id_orden),
    id_vinilo INT REFERENCES vinilo(id_vinilo),
    precio NUMERIC(10,2)
);
-- =========================
-- COMPRA
-- =========================
CREATE TABLE compra_vinilo (
    id_compra_vinilo SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuario(id_usuario),
    fecha DATE
);
CREATE TABLE detalle_compra (
    id_detalle_c SERIAL PRIMARY KEY,
    id_compra INT REFERENCES compra_vinilo(id_compra_vinilo),
    id_vinilo INT REFERENCES vinilo(id_vinilo),
    id_estado_vinilo INT REFERENCES estado_vinilo(id_estado_vinilo),
    precio_compra NUMERIC(10,2)
);
-- =========================
-- PAQUETERIA
-- =========================
CREATE TABLE paqueteria (
    id_paqueteria SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    api_url VARCHAR(200),
    api_key VARCHAR(50)
);
-- =========================
-- ESTATUS ENVIO
-- =========================
CREATE TABLE estatus_envio (
    id_estatus_envio SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);
-- =========================
-- ENVIO
-- =========================
CREATE TABLE envio (
    id_envio SERIAL PRIMARY KEY,
    id_orden INT REFERENCES orden(id_orden),
    id_paqueteria INT REFERENCES paqueteria(id_paqueteria),
    id_direccion INT REFERENCES direccion(id_direccion),
    numero_guia VARCHAR(20),
    costo_envio NUMERIC(10,2),
    fecha_envio DATE,
    fecha_entrega_estimada DATE
);
