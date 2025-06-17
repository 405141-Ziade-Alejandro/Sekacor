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


INSERT INTO USUARIO (ID, NOMBRE, CONTRASEÑA, ROLE, CREATED_DATE, LAST_UPDATED_AT)
VALUES
    (1, 'oso', 'adminpass', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'wally', 'empleadopass', 'EMPLEADO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'gavi', 'transpass', 'TRANSPORTISTA', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- INSERT INTO TIPO_TANQUE (
--     ID, TIPO, CAPA, CANTIDAD, PLASTICO_NEGRO, PLASTICO_COLOR, COSTO,
--     TAPA_TIPO, TORNILLO, TORNILLO_GRANDE, TEE, TIPO_STICKER, INVENTARIO_PRIMERA,
--     INVENTARIO_SEGUNDA, CREATED_DATE, LAST_UPDATED_AT
-- ) VALUES
--       (1, 'Tanque 300L', 'UNICAPA', 300.00, 5.00, 0.00, 750.00, 'CALCE', 2, 0, false, 'TANQUE', 10, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--       (2, 'Tanque 500L', 'BICAPA', 500.00, 8.50, 1.50, 950.00, 'ROSCA', 4, 0, false, 'TANQUE', 15, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--       (3, 'Tanque 750L', 'TRICAPA', 750.00, 12.00, 2.20, 1200.00, 'ROSCA', 4, 0, false, 'TANQUE', 12, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--       (4, 'Tanque 1000L', 'TRICAPA', 1000.00, 14.00, 3.50, 1300.00, 'ROSCA', 6, 0, false, 'TANQUE', 10, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--       (5, 'Tanque 1100L', 'BICAPA', 1100.00, 12.00, 3.00, 1150.00, 'CALCE', 6, 0, false, 'TANQUE', 8, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--       (6, 'Cámara Séptica 800L', 'UNICAPA', 800.00, 10.00, 0.00, 1050.00, 'CALCE', 0, 4, true, 'CAMARA_SEPTICA', 6, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--       (7, 'Cámara Séptica 1200L', 'UNICAPA', 1200.00, 13.00, 0.00, 1350.00, 'CALCE', 0, 6, true, 'CAMARA_SEPTICA', 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- -- 🔹 10 registros del 01/06/2025
-- INSERT INTO TANQUE (ID, TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT)
-- VALUES
--                                                                                            (1, 1, 1, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (2, 2, 1, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (3, 3, 2, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (4, 4, 2, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (5, 5, 1, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (6, 6, 1, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (7, 7, 1, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (8, 1, 2, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (9, 2, 2, 'PRIMERA', '2025-06-01 10:00:00', '2025-06-01 10:00:00'),
--                                                                                            (10, 3, 1, 'SEGUNDA', '2025-06-01 10:00:00', '2025-06-01 10:00:00');
--
-- -- 🔹 20 registros del 02/06/2025
-- INSERT INTO TANQUE (ID, TANK_TYPE_ID, USER_ID, QUALITY, CREATED_DATE, LAST_UPDATED_AT) VALUES
--                                                                                            (11, 4, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (12, 5, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (13, 6, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (14, 7, 2, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (15, 1, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (16, 2, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (17, 3, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (18, 4, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (19, 5, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (20, 6, 2, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (21, 7, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (22, 1, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (23, 2, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (24, 3, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (25, 4, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (26, 5, 2, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (27, 6, 1, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (28, 7, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (29, 1, 2, 'PRIMERA', '2025-06-02 10:00:00', '2025-06-02 10:00:00'),
--                                                                                            (30, 2, 1, 'SEGUNDA', '2025-06-02 10:00:00', '2025-06-02 10:00:00');
