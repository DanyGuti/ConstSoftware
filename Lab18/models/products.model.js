const db = require("../util/database");
// const products = [
//     {
//         nombre: "Cacahuates",
//         imagen: "/public/990.png",
//         handle: "@cacahuates",
//         precio: 20,
//         state: "off"
//     },
//     {
//         nombre: "PolloFrito",
//         imagen: "/../public/pngimg.com-fried_chicken_PNG14094.png",
//         handle: "@pollo",
//         precio: 200,
//         state: "off"
//     },
//     {
//         nombre: "Flores",
//         imagen: "/public/274d7614cd36432a341afdb087f10728.png",
//         handle: "@flores",
//         precio: 250,
//         state: "off"
//     },
// ]

module.exports = class Product{
    constructor(product){
        this.id = product.id;
        this.nombre = product.nombre;
        this.imagen = product.imagen;
        this.handle = product.handle;
        this.precio = product.precio;
        this.estado = product.estado;
    }

    save(){
        return db.execute(
            `INSERT INTO Products(nombre, handle, precio, imagen, estado)
            VALUES(?, ?, ?, ?, ?)`,
            [this.nombre, this.handle, this.precio, this.imagen, this.estado]
        );
        // products.push(this);
    }

    static fetch_all(){
        return db.execute(`SELECT * FROM Products`);
        // return products;
    }
    static fetch(id) {
        let query = `SELECT * FROM 'Products'`;
        if (id != 0) {
            query += `WHERE id = ?`
            return db.execute(query, [id]);
        } 
        return db.execute(query);
    }

}