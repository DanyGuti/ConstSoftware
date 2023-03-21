CREATE TABLE Usuarios (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(40) NOT NULL UNIQUE KEY,
    email varchar(50) NOT NULL,
    password varchar(40) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);
