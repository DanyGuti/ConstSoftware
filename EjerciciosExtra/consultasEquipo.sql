/*
Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco (título, año, nombre, sueldo)
Actor (nombre, dirección, telefono, fechanacimiento, sexo)
Productor (idproductor, nombre, dirección, teléfono)
Estudio (nomestudio, dirección)
*/

-- 1.- Actrices de "Las brujas de Salem"

SELECT Nombre FROM Elenco as E, Actor as A
WHERE E.nombre = A.nombre
AND sexo = 'F' AND Titulo = 'Las brujas de Salem'

-- Con subconsultas
SELECT Nombre
FROM Elenco
WHERE titulo = 'Las Brujas de Salem'
AND Nombre IN(
        SELECT Nombre
        FROM Actor
        WHERE sexo = 'F');

-- 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.
-- Sin subconsultas
SELECT Pr.Nombre, P.titulo, P.anio as 'Nombres de productores de peliculas que aparece Sharon Stone'
FROM Productor as P, Pelicula as P, Elenco as E
WHERE Pr.idproductor = P.idproductor
AND E.anio = P.anio
AND P.titulo = E.titulo
AND E.nombre = 'Sharon Stone'
DISTINCT Pr.idproductor
ORDER BY P.anio DESC
-- Con subconsultas
-- Tablas 