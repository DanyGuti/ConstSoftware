/*
Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco (título, año, nombre, sueldo)
Actor (nombre, dirección, telefono, fechanacimiento, sexo)
Productor (idproductor, nombre, dirección, teléfono)
Estudio (nomestudio, dirección)
*/
/* 1.- El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado. */
/* Use Elenco table: sueldo */
SELECT SUM(sueldo), nombre
FROM ELENCO
GROUP BY nombre
ORDER BY SUM(sueldo) DESC;

/* 2.- El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's. */
/* Use Pelicula table: presupuesto, titulo, año */
/* Nombre de columnas en select de 'as' */
SELECT nomestudio, SUM(presupuesto) as 'Monto por Estudio Cinematográfico'
FROM Pelicula
/* WHERE anio > 1980 AND anio <= 1989 */
WHERE anio BETWEEN 1980 AND 1989
GROUP BY nomestudio
ORDER BY SUM(presupuesto) DESC;

/* 3.- Nombre y sueldo promedio de los actores (sólo hombres) que reciben en 
	promedio un pago superior a 5 millones de dolares por película. */
/* Use Elenco table: sueldo, nombre, titulo */
/* Use Actor table: sexo */
SELECT AVG(E.sueldo) as 'Sueldo promedio superior a 5,000,000', E.nombre, E.titulo, A.sexo
FROM Actor as A, Elenco as E
WHERE E.nombre = A.nombre
AND E.titulo = A.titulo
AND A.sexo = 'Hombre'
GROUP BY E.titulo, E.nombre
HAVING AVG(E.sueldo) > 500000000
ORDER BY AVG(E.sueldo) DESC;

/* 4.- Título y año de producción de las películas con menor presupuesto.
 (Por ejemplo, la película de Titanic se ha
 producido en varias ocasiones entre la lista de películas estaría la
  producción de Titanic y el año que fue filmada con menor presupuesto).
*/
SELECT anio, titulo, MIN(presupuesto) as 'Mínimo de presupesto'
FROM Pelicula
GROUP BY titulo, anio
ORDER BY MIN(presupuesto)

/* 5.- Mostrar el sueldo de la actriz mejor pagada */
SELECT A.sexo, MAX(E.sueldo) as 'Sueldo actriz mejor pagada', E.nombre
FROM Actor as A, Elenco as E
GROUP BY E.nombre
ORDER BY MAX(E.sueldo);