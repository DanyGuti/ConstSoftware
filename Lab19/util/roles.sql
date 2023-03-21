CREATE TABLE privilegios(
    id int(11) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);
INSERT INTO privilegios(id, nombre, created_at) VALUES
(1, 'ver_productos', '2023-03-20 20:31:12'),
(2, 'registrar_producto', '2023-03-20 20:32:01');

CREATE TABLE roles(
    id int(11) NOT NULL,
    nombre VARCHAR(40) NOT NULL,
    descripcion VARCHAR(400) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp() 
);

INSERT INTO roles(id, nombre, descripcion, created_at) VALUES
(1, 'vendedor', '', '2023-03-20 20:33:00'),
(2, 'comprador', '','2023-03-20 20:34:24');

CREATE TABLE rol_privilegio(
    idRol int(11) NOT NULL,
    idPrivilegio int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp() 
);

INSERT INTO rol_privilegio(idRol, idPrivilegio, created_at) VALUES
(1, 2, '2023-03-20 20:34:12'),
(2, 1, '2023-03-20 20:35:01'),
(1, 1, '2023-03-20 20:36:01');

CREATE TABLE Usuarios (
    id int(11) NOT NULL,
    nombre varchar(40) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(40) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

INSERT INTO Usuarios(id, nombre, email, password, created_at) VALUES
(1, 'DanielGtz', 'danyguti2001@hotmail.com', 'GutySquash10*','2023-03-20 20:38:01'),
(2, 'GustavoGtz', 'gpcorporativo@hotmail.com', 'GusSquash10*','2023-03-20 20:39:01'),
(3, 'Simona', 'simonalamona@hotmail.com', '123Hlao*','2023-03-20 20:39:01'),
(4, 'Aquiles', 'aquilescastro@hotmail.com', 'chi0lai&les1','2023-03-20 20:40:01');

CREATE TABLE usuario_rol(
    idUsuario int(11) NOT NULL,
    idRol int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp()
);

INSERT INTO usuario_rol(idUsuario, idRol, created_at) VALUES
(1, 1, '2023-03-20 20:41:31'),
(4, 2, '2023-03-20 20:42:11');

ALTER TABLE privilegios
 ADD PRIMARY KEY (id);
ALTER TABLE roles ADD PRIMARY KEY (id);

ALTER TABLE rol_privilegio
 ADD PRIMARY KEY(idRol, idPrivilegio),
ADD KEY idPrivilegio(idPrivilegio);

ALTER TABLE Usuarios
 ADD PRIMARY KEY (id),
 ADD UNIQUE KEY nombre(nombre);

ALTER TABLE usuario_rol
 ADD PRIMARY KEY(idUsuario, idRol),
ADD KEY idRol(idRol);

ALTER TABLE privilegios
 MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 3;

ALTER TABLE roles
 MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 3;

ALTER TABLE Usuarios
 MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 5;


ALTER TABLE rol_privilegio
 ADD CONSTRAINT rol_privilegio_ibfk_1 FOREIGN KEY (idRol) REFERENCES roles(id),
 ADD CONSTRAINT rol_privilegio_ibfk_2 FOREIGN KEY (idPrivilegio) REFERENCES privilegios(id);

ALTER TABLE usuario_rol
 ADD CONSTRAINT usuario_rol_ibfk_1 FOREIGN KEY (idUsuario) REFERENCES Usuarios(id),
 ADD CONSTRAINT usuario_rol_ibfk_2 FOREIGN KEY (idRol) REFERENCES roles(id);



