/* Descripcion de los materiales que NO han sido entregados*/

-- AR : PI{Descripcion}Materiales - PI{Descripcion}{Materiales >< Entregan}

-- 1.-
SELECT Descripcion
FROM materiales
EXCEPT -- Or minus
(SELECT Descripcion FROM materiales as M, Entregan as E WHERE M.clave = E.clave)

-- 2.-
SELECT Descripcion
FROM materiales
WHERE clave NOT IN (SELECT clave FROM Entregan)

-- 3.-
SELECT Descripcion
FROM materiales
WHERE NOT EXISTS (SELECT * FROM Entregan E WHERE M.clave = E.clave)
