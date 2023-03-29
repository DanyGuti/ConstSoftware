-- A modo de referencia, incluimos los esquemas de las tablas que creaste en la práctica 
-- anterior y que serán con las que trabajaremos en esta práctica:

-- Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
-- Entregan(Clave, RFC, Numero, Fecha, Cantidad)
-- Proveedores(RFC, RazonSocial)
-- Proyectos(Numero, Denominacion)

-- Nota: De ser necesario crea los registros adecuados para probar que las
-- consultas funcionan correctamente.
-- Con base en lo que se explica en la lectura sobre funciones agregadas, plantea
-- y ejecuta las siguientes consultas, agregando los alias de columna necesarios para que los resultados resulten legibles:

-- 1.- La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.
SELECT SUM(M.precio) as 'SumaPrecios1997', SUM(E.cantidad) 'SumaCantidades1997'
FROM materiales as M, entregan as E
WHERE M.clave = E.clave
AND E.fecha BETWEEN '1997-01-01' AND '1997-12-31'
ORDER BY SUM(M.precio);

SELECT SUM(precio)
FROM materiales
WHERE clave IN (
    SELECT clave
    FROM entregan
    WHERE fecha BETWEEN '1997-01-01' AND '1997-12-31'
    GROUP BY cantidad
)


-- 2.- Para cada proveedor, obtener la razón social del proveedor, número de entregas
--  e importe total de las entregas realizadas.
SELECT P.razonsocial, E.rfc, E.cantidad as 'Total entregas', (M.precio * E.cantidad) as 'Importe total'
FROM proveedores as P, entregan as E, materiales as M
WHERE P.rfc = E.rfc AND E.clave = M.clave
GROUP BY P.razonsocial;

-- 3.- Por cada material obtener la clave y descripción del material, la cantidad total entregada,
--  la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las entregas de 
-- aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.
SELECT MIN(E.cantidad) as 'MinimaCantidadEntregada', MAX(E.cantidad) as 'MaximaCantidadEntregada',
SUM(E.cantidad) as 'CantidadEntregada', M.clave, M.descripcion, SUM(M.precio*E.cantidad) as 'ImportePorMaterial', AVG(E.cantidad) as 'PromedioCantidadEntregada'
FROM entregan as E, materiales as M
WHERE E.clave = M.clave
GROUP BY M.descripcion
HAVING AVG(E.cantidad) > 400;

-- 4.- Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado,
--  detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la
--  cantidad promedio sea menor a 500.
SELECT P.razonsocial, M.clave, M.descripcion, AVG(E.cantidad) as 'CantidadPromedioEntregada'
FROM proveedores as P, materiales as M, entregan as E
WHERE P.rfc = E.rfc AND E.clave = M.clave
GROUP BY P.razonsocial
HAVING AVG(E.cantidad) > 500;

-- Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos
--  de proveedores: aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos
--  para los que la cantidad promedio entregada sea mayor a 450.

-- Utilizando la sentencia
-- INSERT INTO tabla VALUES (valorcolumna1, valorcolumna2, [...] , valorcolumnan) ;

-- Considerando que los valores de tipos CHAR y VARCHAR deben ir encerrados entre apóstrofes,
--  los valores numéricos se escriben directamente y los de fecha, como
--  '1-JAN-00' para 1o. de enero del 2000, inserta cinco nuevos materiales.
-- done

INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES(2500, 'Concreto FC 1/4', 170, 17);
SELECT LAST_INSERT_ID();
INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES (2500, 'EEEE800101', 5010,'2023-03-28', 300)


INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES(2550, 'Concreto FC 1/8', 180, 18);
SELECT LAST_INSERT_ID();
INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES (2550, 'EEEE800101', 5010,'2023-03-28', 300)


INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES(2600, 'Ladrillo gris', 200, 20);
SELECT LAST_INSERT_ID();
INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES (2600, 'AAAA800101', 5010,'2023-03-28', 500)


INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES(2650, 'Tubería PVC 1/2', 50, 5);
SELECT LAST_INSERT_ID();
INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES (2650, 'AAAA800101', 5010,'2023-03-28', 100)


INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES(2580, 'Tubería PVC 1/4', 60, 6);
SELECT LAST_INSERT_ID();
INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES (2580, 'EEEE800101', 5010,'2023-03-28', 300)


INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES(2500, 'Concreto FC 1/4', 170, 17);
SELECT LAST_INSERT_ID();
INSERT INTO entregan (clave, rfc, numero, fecha, cantidad) VALUES (2500, 'EEEE800101', 5010,'2023-03-28', 300)


--  Con base en lo que se explica en la lectura sobre consultas con roles 
-- y subconsultas, plantea y ejecuta las siguientes consultas:

-- Clave y descripción de los materiales que nunca han sido entregados.
SELECT descripcion, clave
FROM materiales
WHERE clave NOT IN( 
		SELECT clave 
		FROM entregan
);
-- Razón social de los proveedores que han realizado entregas tanto al
--  proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.
CREATE VIEW as VamosMexico as SELECT razonsocial as 'RazonSocial'
FROM proveedores
WHERE rfc IN(
        SELECT rfc
        FROM entregan
        WHERE numero IN(
            SELECT numero
            FROM proyecto
            WHERE denomincacion = 'Vamos México'
        )
)
CREATE VIEW as QueretaroLimpio as SELECT razonsocial as 'RazonSocial'
FROM proveedores
WHERE rfc IN(
        SELECT rfc
        FROM entregan
        WHERE numero IN(
            SELECT numero
            FROM proyecto
            WHERE denomincacion = 'Querétaro Limpio'
        )
)

SELECT Q.RazonSocial
FROM queretarolimpio as Q, vamosméxico as V
WHERE Q.RazonSocial = V.RazonSocial;
-- Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'.


SELECT descripcion as 'Material que nunca ha sido entregado en CIT Yucatan'
FROM Materiales 
WHERE clave NOT IN (
    SELECT clave 
    FROM Entregan 
    WHERE numero IN (
        SELECT numero
        FROM Proyectos 
        WHERE denominacion = 'CIT Yucatán'
    )
);

-- Razón social y promedio de cantidad entregada de los proveedores
--  cuyo promedio de cantidad entregada es mayor al promedio de la cantidad 
-- entregada por el proveedor con el RFC 'VAGO780901'.


SELECT P.razonsocial, E.cantidad
    FROM proveedores as P, entregan as E
    WHERE P.rfc IN (
            SELECT E.rfc
            FROM entregan as E (
                SELECT AVG(E.cantidad)
                FROM entregan as E
                WHERE E.rfc = 'VAGO780901'
        )
)

-- RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango'
--  y cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001.