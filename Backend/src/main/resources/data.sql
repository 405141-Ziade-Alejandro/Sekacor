INSERT INTO INSUMO_PRIMARIO (ID, TIPO, CANTIDAD, UNIDAD, SUB_TIPO, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (1, 'PLASTICO', 0.0, 'KILOGRAMO', 'NEGRO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'PLASTICO', 0.0, 'KILOGRAMO', 'COLOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'TAPA', 0.0, 'UNIDADES', 'ROSCA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'TAPA', 0.0, 'UNIDADES', 'CALCE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'TORNILLOS', 0.0, 'UNIDADES', 'NONE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 'TORNILLO_GRANDE', 0.0, 'UNIDADES', 'NONE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, 'TEE', 0.0, 'UNIDADES', 'NONE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 'STICKER', 0.0, 'UNIDADES', 'TANQUE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, 'STICKER', 0.0, 'UNIDADES', 'CAMARA_SEPTICA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO USUARIO ( NOMBRE, CONTRASEÑA, ROLE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    ('Luciano', 'adminpass', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Lucas', 'empleadopass', 'EMPLEADO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Gabriel', 'transpass', 'TRANSPORTISTA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO TIPO_TANQUE (
     TIPO, CAPA, CANTIDAD, PLASTICO_NEGRO, PLASTICO_COLOR, COSTO,
    TAPA_TIPO, TORNILLO, TORNILLO_GRANDE, TEE, TIPO_STICKER, INVENTARIO_PRIMERA,
    INVENTARIO_SEGUNDA, CREATED_DATE, LAST_UPDATED_AT
) VALUES
      ( 'Tanque 300L', 'UNICAPA', 300.00, 5.00, 0.00, 750.00, 'CALCE', 2, 0, false, 'TANQUE', 10, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Tanque 500L', 'BICAPA', 500.00, 8.50, 1.50, 950.00, 'ROSCA', 4, 0, false, 'TANQUE', 15, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Tanque 750L', 'TRICAPA', 750.00, 12.00, 2.20, 1200.00, 'ROSCA', 4, 0, false, 'TANQUE', 12, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Tanque 1000L', 'TRICAPA', 1000.00, 14.00, 3.50, 1300.00, 'ROSCA', 6, 0, false, 'TANQUE', 10, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Tanque 1100L', 'BICAPA', 1100.00, 12.00, 3.00, 1150.00, 'CALCE', 6, 0, false, 'TANQUE', 8, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Cámara Séptica 800L', 'UNICAPA', 800.00, 10.00, 0.00, 1050.00, 'CALCE', 0, 4, true, 'CAMARA_SEPTICA', 6, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
      ( 'Cámara Séptica 1200L', 'UNICAPA', 1200.00, 13.00, 0.00, 1350.00, 'CALCE', 0, 6, true, 'CAMARA_SEPTICA', 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- 🔹 10 registros del 01/06/2025
INSERT INTO TANQUE ( TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT)
VALUES
                                                                                           ( 1, 1, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 2, 1, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 3, 2, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 4, 2, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 5, 1, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 6, 1, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 7, 1, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 1, 2, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 2, 2, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
                                                                                           ( 3, 1, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00');

-- 🔹 20 registros del 02/06/2025
INSERT INTO TANQUE ( TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT) VALUES
                                                                                           ( 4, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 5, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 6, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 7, 2, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 1, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 2, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 3, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 4, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 5, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 6, 2, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 7, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 1, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 2, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 3, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 4, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 5, 2, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 6, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 7, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 1, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
                                                                                           ( 2, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00');
-- 🔹 10 registros del 05/07/2025
INSERT INTO TANQUE (TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT) VALUES
                                                                                       (1, 1, 'PRIMERA', '2025-07-05 08:00:00', '2025-07-05 08:00:00'),
                                                                                       (2, 2, 'SEGUNDA', '2025-07-05 08:30:00', '2025-07-05 08:30:00'),
                                                                                       (3, 1, 'PRIMERA', '2025-07-05 09:00:00', '2025-07-05 09:00:00'),
                                                                                       (4, 2, 'SEGUNDA', '2025-07-05 09:30:00', '2025-07-05 09:30:00'),
                                                                                       (5, 1, 'PRIMERA', '2025-07-05 10:00:00', '2025-07-05 10:00:00'),
                                                                                       (6, 1, 'SEGUNDA', '2025-07-05 10:30:00', '2025-07-05 10:30:00'),
                                                                                       (7, 2, 'PRIMERA', '2025-07-05 11:00:00', '2025-07-05 11:00:00'),
                                                                                       (1, 2, 'SEGUNDA', '2025-07-05 11:30:00', '2025-07-05 11:30:00'),
                                                                                       (2, 1, 'PRIMERA', '2025-07-05 12:00:00', '2025-07-05 12:00:00'),
                                                                                       (3, 2, 'SEGUNDA', '2025-07-05 12:30:00', '2025-07-05 12:30:00');

-- 🔹 10 registros del 10/07/2025
INSERT INTO TANQUE (TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT) VALUES
                                                                                       (4, 1, 'PRIMERA', '2025-07-10 08:00:00', '2025-07-10 08:00:00'),
                                                                                       (5, 1, 'SEGUNDA', '2025-07-10 08:30:00', '2025-07-10 08:30:00'),
                                                                                       (6, 2, 'PRIMERA', '2025-07-10 09:00:00', '2025-07-10 09:00:00'),
                                                                                       (7, 1, 'SEGUNDA', '2025-07-10 09:30:00', '2025-07-10 09:30:00'),
                                                                                       (1, 1, 'PRIMERA', '2025-07-10 10:00:00', '2025-07-10 10:00:00'),
                                                                                       (2, 1, 'SEGUNDA', '2025-07-10 10:30:00', '2025-07-10 10:30:00'),
                                                                                       (3, 1, 'PRIMERA', '2025-07-10 11:00:00', '2025-07-10 11:00:00'),
                                                                                       (4, 2, 'SEGUNDA', '2025-07-10 11:30:00', '2025-07-10 11:30:00'),
                                                                                       (5, 1, 'PRIMERA', '2025-07-10 12:00:00', '2025-07-10 12:00:00'),
                                                                                       (6, 1, 'SEGUNDA', '2025-07-10 12:30:00', '2025-07-10 12:30:00');

-- 🔹 10 registros del 15/07/2025
INSERT INTO TANQUE (TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT) VALUES
                                                                                       (7, 1, 'PRIMERA', '2025-07-15 08:00:00', '2025-07-15 08:00:00'),
                                                                                       (1, 1, 'SEGUNDA', '2025-07-15 08:30:00', '2025-07-15 08:30:00'),
                                                                                       (2, 2, 'PRIMERA', '2025-07-15 09:00:00', '2025-07-15 09:00:00'),
                                                                                       (3, 1, 'SEGUNDA', '2025-07-15 09:30:00', '2025-07-15 09:30:00'),
                                                                                       (4, 1, 'PRIMERA', '2025-07-15 10:00:00', '2025-07-15 10:00:00'),
                                                                                       (5, 1, 'SEGUNDA', '2025-07-15 10:30:00', '2025-07-15 10:30:00'),
                                                                                       (6, 1, 'PRIMERA', '2025-07-15 11:00:00', '2025-07-15 11:00:00'),
                                                                                       (7, 2, 'SEGUNDA', '2025-07-15 11:30:00', '2025-07-15 11:30:00'),
                                                                                       (1, 1, 'PRIMERA', '2025-07-15 12:00:00', '2025-07-15 12:00:00'),
                                                                                       (2, 2, 'SEGUNDA', '2025-07-15 12:30:00', '2025-07-15 12:30:00');

INSERT INTO PRICE_LIST ( NOMBRE, GANANCIA, COMISION, CORRALON, VOL_KM, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    ( 'Minorista Local',           1.00, 0.05, 0.00, 'ZERO',      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Mayorista Ciudad',          0.90, 0.03, 0.00, 'CIEN',      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Distribuidor Regional',     0.85, 0.02, 0.00, 'DOSCIENTOS',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Cliente Especial',          0.80, 0.01, 0.00, 'CIEN',      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Promoción Temporada Alta',  0.75, 0.00, 0.00, 'ZERO',      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO CLIENTE ( NOMBRE, TELEFONO, LISTA_PRECIO_ID, DIRECCION, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    ( 'Ferretería El Tornillo',       '1123456789', 1, 'Av. Siempreviva 123',        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Materiales El Roble',          '1134567890', 2, 'Calle Falsa 456',            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Corralón El Ladrillo',         '1145678901', 3, 'Ruta 8 Km 45',               CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Obras SRL',                    '1156789012', 2, 'Juan B. Justo 500',          CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'ConstruMarket',                '1167890123', 1, 'Mitre 1050',                 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'VIP Cliente Juan Perez',       '1178901234', 4, 'Belgrano 2250',              CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Distribuidora El Aguatero',    '1189012345', 3, 'San Martín 700',             CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Obrador del Norte',            '1190123456', 5, 'Panamericana Km 33',         CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Corralón Zona Sur',            '1111234567', 1, 'Av. Calchaquí 1000',         CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ( 'Ferretería 3 Hermanos',       '1112345678', 4, 'Sarmiento 999',              CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- 🔹 JUNIO 2025 - 10 Pedidos
INSERT INTO PEDIDO (CLIENTE_ID, FECHA_ENTREGA, PRECIO_TOTAL, STATE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (1, '2025-06-03 10:00:00', 1500.00, 'PREPARANDO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '2025-06-05 11:00:00', 2600.00, 'LISTA',       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, '2025-06-07 09:30:00', 3100.00, 'ENVIANDO',    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, '2025-06-08 12:00:00', 900.00,  'FINALIZADO',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, '2025-06-10 14:00:00', 1800.00, 'CANCELADO',   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, '2025-06-12 10:15:00', 2200.00, 'PREPARANDO',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, '2025-06-15 16:00:00', 2700.00, 'LISTA',       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, '2025-06-18 13:30:00', 1350.00, 'ENVIANDO',    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (9, '2025-06-21 08:45:00', 2500.00, 'FINALIZADO',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (10,'2025-06-25 17:20:00', 1450.00, 'PREPARANDO',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- 🔹 JULIO 2025 - 5 Pedidos
INSERT INTO PEDIDO (CLIENTE_ID, FECHA_ENTREGA, PRECIO_TOTAL, STATE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (3, '2025-07-03 11:00:00', 1800.00, 'LISTA',       CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, '2025-07-06 09:00:00', 2200.00, 'ENVIANDO',    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, '2025-07-10 15:45:00', 950.00,  'FINALIZADO',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (7, '2025-07-13 14:30:00', 3050.00, 'PREPARANDO',  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, '2025-07-15 10:30:00', 2750.00, 'CANCELADO',   CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Pedido 1
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (1, 1, 2, 1500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 2
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (2, 2, 1, 1200.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 3, 1, 1400.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 3
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (3, 4, 2, 3100.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 4
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (4, 1, 1, 900.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 5
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (5, 2, 2, 1800.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 6
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (6, 3, 1, 1100.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (6, 5, 1, 1100.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 7
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (7, 6, 2, 2700.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 8
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (8, 1, 1, 750.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (8, 7, 1, 600.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 9
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (9, 3, 2, 2500.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 10
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (10, 4, 1, 1450.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 11
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (11, 5, 2, 1800.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 12
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (12, 2, 2, 2200.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 13
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (13, 1, 1, 950.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 14
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (14, 3, 1, 1200.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (14, 5, 1, 1850.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pedido 15
INSERT INTO PEDIDO_DETALLE (pedido_id, TIPO_TANQUE_ID, QUANTITY, PRICE, CREATED_DATE, LAST_UPDATED_AT)
VALUES (15, 4, 2, 2750.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);