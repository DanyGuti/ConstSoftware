CREATE TABLE Products(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    handle VARCHAR(100) NOT NULL,
    precio INT(10) NOT NULL,
    estado VARCHAR(40) NOT NULL
);

INSERT INTO Products(id, nombre, imagen, handle, precio, estado) VALUES
(1, 'Cacahuates', '/public/990.png', '@cacahuates', 20, 'off'),
(2, 'PolloFrito', '/public/pngimg.com-fried_chicken_PNG14094.png', '@pollo', 200, 'off'),
(3, 'Flores', '/public/274d7614cd36432a341afdb087f10728.png', '@flores', 250, 'off');
