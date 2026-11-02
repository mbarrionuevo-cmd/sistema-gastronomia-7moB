CREATE DATABASE OUTREBLANC;
USE OUTREBLANC;
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    documento VARCHAR(20) NULL,
    id_fiscal VARCHAR(20) NULL,
    email VARCHAR(120) NULL,
    telefono VARCHAR(25) NULL,
    password_hash VARCHAR(255) NOT NULL,
    doble_factor BOOLEAN NOT NULL,
    intentos_fallidos INT NOT NULL,
    direccion VARCHAR(150) NULL,
    razon_social VARCHAR(120) NULL,
    referencia VARCHAR(150) NULL,
    fecha_registro DATETIME NOT NULL,
    estado VARCHAR(20) NOT NULL,
    foto VARCHAR(255) NULL,
    ultimo_login DATETIME NULL,
    fecha_creacion DATETIME NOT NULL,
    creado_por INT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (creado_por) REFERENCES usuarios(id_usuario)
);
CREATE TABLE usuarios_roles (
    id_usuario INT NOT NULL,
    id_rol INT NOT NULL,
    usuario_rol VARCHAR(60) NULL,
    referencia VARCHAR(150) NULL,
    PRIMARY KEY (id_usuario, id_rol),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT,
    documento VARCHAR(20) NULL,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(120) NULL,
    direccion VARCHAR(150) NULL,
    localidad VARCHAR(80) NULL,
    referencia VARCHAR(200) NULL,
    activo BOOLEAN NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_cliente)
);
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    descripcion VARCHAR(150) NULL,
    activo BOOLEAN NOT NULL,
    PRIMARY KEY (id_categoria)
);
CREATE TABLE platos (
    id_plato INT AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NULL,
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    apto_celiacos BOOLEAN NOT NULL,
    PRIMARY KEY (id_plato),
    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
);
CREATE TABLE cadetes (
    id_cadete INT AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    vehiculo VARCHAR(50) NOT NULL,
    patente VARCHAR(15) NULL,
    activo BOOLEAN NOT NULL,
    fecha_ingreso DATE NULL,
    PRIMARY KEY (id_cadete)
);
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_cadete INT NULL,
    estado_pedido VARCHAR(30) NOT NULL,
    id_usuario INT NULL,
    fecha_hora DATETIME NOT NULL,
    direccion_entrega VARCHAR(150) NOT NULL,
    referencia_entrega VARCHAR(150) NULL,
    observaciones TEXT NULL,
    total DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_cadete)
        REFERENCES cadetes(id_cadete),
    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);
CREATE TABLE detalles_pedidos (
    id_detalle INT AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_plato INT NOT NULL,
    cantidad INT NOT NULL,
    estado_pedido VARCHAR(30) NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    observaciones TEXT NULL,
    PRIMARY KEY (id_detalle),
    FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_plato)
        REFERENCES platos(id_plato)
);
CREATE TABLE metodos_pago (
    id_metodo_pago INT AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    descripcion VARCHAR(150) NULL,
    activo BOOLEAN NOT NULL,
    PRIMARY KEY (id_metodo_pago)
);
CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT,
    id_pedido INT NOT NULL,
    id_metodo_pago INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(30) NOT NULL,
    observaciones TEXT NULL,
    PRIMARY KEY (id_venta),
    FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_metodo_pago)
        REFERENCES metodos_pago(id_metodo_pago),
    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);
CREATE TABLE resenas (
    id_resena INT AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    id_pedido INT NOT NULL,
    calificacion INT NOT NULL,
    comentario VARCHAR(500) NULL,
    PRIMARY KEY (id_resena),
    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido)
);
INSERT INTO usuarios
(nombre_usuario, nombre, apellido, documento, id_fiscal,
 email, telefono, password_hash, doble_factor,
 intentos_fallidos, direccion, razon_social, referencia,
 fecha_registro, estado, foto, ultimo_login,
 fecha_creacion, creado_por)
VALUES
('admin', 'Micaela', 'Barrionuevo', '30114222', NULL,
 'admin@outreblanc.com', '2914001001', 'clave_prueba',
 FALSE, 0, 'Av. Alem 100', NULL, NULL,
 '2026-10-01 09:00:00', 'Activo', NULL, NULL,
 '2026-10-01 09:00:00', NULL),

('cajero1', 'Aldana', 'Samudio', '32111222', NULL,
 'caja@outreblanc.com', '2914001002', 'clave_prueba',
 FALSE, 0, 'Sarmiento 250', NULL, NULL,
 '2026-10-02 09:00:00', 'Activo', NULL, NULL,
 '2026-10-02 09:00:00', 1);

INSERT INTO usuarios_roles
(id_usuario, id_rol, usuario_rol, referencia)
VALUES
(1, 1, 'Administrador', 'Usuario administrador'),
(2, 2, 'Cajero', 'Usuario de caja');

INSERT INTO clientes
(documento, nombre, apellido, telefono, email,
 direccion, localidad, referencia, activo, fecha_registro)
VALUES
('40111222', 'Lucciano', 'Amaya', '2914501001',
 'sofia@email.com', 'Alsina 450', 'Bahia Blanca',
 'Casa con puerta azul', TRUE, '2026-10-10 12:00:00'),

('42111222', 'Juan', 'Perez', '2914501002',
 'juan@email.com', 'San Martin 820', 'Bahia Blanca',
 'Departamento 2', TRUE, '2026-10-11 13:00:00'),

('43111222', 'Valentina', 'Lopez', '2914501003',
 'valentina@email.com', 'Zelarrayan 1200', 'Bahia Blanca',
 NULL, TRUE, '2026-10-12 20:00:00');
 
INSERT INTO categorias (nombre, descripcion, activo)
VALUES
('Entradas', 'Entradas y porciones', TRUE),
('Platos principales', 'Platos principales del menu', TRUE),
('Ensaladas', 'Ensaladas variadas', TRUE),
('Postres', 'Postres dulces', TRUE),
('Bebidas', 'Bebidas con y sin alcohol', TRUE);

INSERT INTO platos
(id_categoria, nombre, descripcion, precio, activo,
 fecha_creacion, apto_celiacos)
VALUES
(1, 'Empanada de carne', 'Empanada de carne',
 1500, TRUE, '2026-10-01 10:00:00', FALSE),

(1, 'Empanada de jamon y queso', 'Empanada de jamon y queso',
 1500, TRUE, '2026-10-01 10:00:00', FALSE),
 
(1, 'Empanada de verduras', 'Empanada de verduras',
 1500, TRUE, '2026-10-01 10:00:00', FALSE),

(1, 'Papas fritas con cheddar y panceta',
 'Porcion de papas con cheddar y panceta',
 5500, TRUE, '2026-10-01 10:00:00', FALSE),
 
(1, 'Rabas', 'porcion de rabas',
 6000, TRUE, '2026-10-01 10:00:00', FALSE),

(1, 'Provoleta', 'Provoleta a la parrilla',
 6000, TRUE, '2026-10-01 10:00:00', FALSE),

(2, 'Milanesa napolitana con papas fritas',
 'Milanesa con salsa, queso y papas',
 8500, TRUE, '2026-10-01 10:00:00', FALSE),

(2, 'Hamburguesa completa', 'Hamburguesa completa',
 6500, TRUE, '2026-10-01 10:00:00', FALSE),

(2, 'Pizza muzzarella', 'Pizza de muzzarella',
 7000, TRUE, '2026-10-01 10:00:00', FALSE),

(2, 'Pizza especial', 'Pizza con jamon',
 8500, TRUE, '2026-10-01 10:00:00', FALSE),

(2, 'Pastel de papa', 'Pastel de papa casero',
 7500, TRUE, '2026-10-01 10:00:00', FALSE),

(2, 'Noquis con salsa', 'Noquis con salsa a eleccion',
 7000, TRUE, '2026-10-01 10:00:00', FALSE),
 
(1, 'Bife de chorizo', 'bife de chorizo con guarnicion',
 6500, TRUE, '2026-10-01 10:00:00', FALSE),
 
(1, 'Tarta de verduras', 'Tarta con diversas verduras',
 3000, TRUE, '2026-10-01 10:00:00', FALSE),

(3, 'Ensalada Cesar', 'Ensalada Cesar',
 6000, TRUE, '2026-10-01 10:00:00', FALSE),

(3, 'Ensalada mixta', 'Lechuga, tomate y cebolla',
 4000, TRUE, '2026-10-01 10:00:00', FALSE),

(4, 'Flan casero', 'Flan casero',
 3000, TRUE, '2026-10-01 10:00:00', FALSE),

(4, 'Helado', 'Porcion de helado',
 2500, TRUE, '2026-10-01 10:00:00', FALSE),

(4, 'Tiramisu', 'Postre tiramisu',
 4000, TRUE, '2026-10-01 10:00:00', FALSE),
 
(1, 'Panqueque ', 'Panqueque con dulce de leche',
 1500, TRUE, '2026-10-01 10:00:00', FALSE),

(5, 'Gaseosa', 'Botella de gaseosa',
 2000, TRUE, '2026-10-01 10:00:00', FALSE),

(5, 'Agua sin gas', 'Botella de agua sin gas',
 1500, TRUE, '2026-10-01 10:00:00', FALSE),

(5, 'Jugo', 'Jugo de frutas',
 1800, TRUE, '2026-10-01 10:00:00', FALSE),
 
(1, 'Vino', 'Vino tinto o blanco',
 2500, TRUE, '2026-10-01 10:00:00', FALSE);

INSERT INTO cadetes
(nombre, apellido, telefono, vehiculo, patente, activo, fecha_ingreso)
VALUES
('Pedro', 'Ramirez', '2914601001', 'Moto',
 'AB123CD', TRUE, '2024-03-01'),

('Camila', 'Torres', '2914601002', 'Moto',
 'AC456EF', TRUE, '2025-06-15'),

('Nicolas', 'Diaz', '2914601003', 'Bicicleta',
 NULL, TRUE, '2026-01-10');

INSERT INTO pedidos
(id_cliente, id_cadete, estado_pedido, id_usuario,
 fecha_hora, direccion_entrega, referencia_entrega,
 observaciones, total)
VALUES
(1, 1, 'Pedido entregado', 2,
 '2026-10-20 12:30:00', 'Alsina 450',
 'Casa con puerta gris', 'Sin observaciones', 11500),

(2, 2, 'Pedido entregado', 2,
 '2026-10-20 20:15:00', 'San Martin 820',
 'Departamento 2', 'Entregar en recepcion', 9000),

(3, 3, 'Pedido en camino', 2,
 '2026-10-21 21:00:00', 'Zelarrayan 1200',
 NULL, 'Avisar al llegar', 15500);

INSERT INTO detalles_pedidos
(id_pedido, id_plato, cantidad, estado_pedido,
 precio_unitario, subtotal, observaciones)
VALUES
(1, 1, 2, 'Entregado', 1500, 3000, NULL),
(1, 5, 1, 'Entregado', 8500, 8500, NULL),
(2, 7, 1, 'Entregado', 7000, 7000, NULL),
(2, 16, 1, 'Entregado', 2000, 2000, NULL),
(3, 6, 2, 'En camino', 6500, 13000, NULL),
(3, 14, 1, 'En camino', 2500, 2500, NULL);

INSERT INTO metodos_pago (nombre, descripcion, activo)
VALUES
('Efectivo', 'Pago en efectivo', TRUE),
('Transferencia', 'Pago por transferencia', TRUE),
('Tarjeta', 'Pago con tarjeta', TRUE);

INSERT INTO ventas
(id_pedido, id_metodo_pago, id_usuario, fecha_hora,
 subtotal, descuento, total, estado, observaciones)
VALUES
(1, 1, 2, '2026-10-20 12:35:00',
 11500, 0, 11500, 'Pagado', NULL),

(2, 2, 2, '2026-10-20 20:20:00',
 9000, 0, 9000, 'Pagado', NULL);

INSERT INTO resenas
(id_cliente, id_pedido, calificacion, comentario)
VALUES
(1, 1, 5, 'La comida llego rica y a tiempo.'),
(2, 2, 4, 'Muy buena la pizza.');


