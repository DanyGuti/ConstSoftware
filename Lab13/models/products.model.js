const products = [
    {
        nombre: "Cacahuates",
        imagen: "/public/990.png",
        handle: "@cacahuates",
        precio: 20,
        state: "off"
    },
    {
        nombre: "PolloFrito",
        imagen: "/../public/pngimg.com-fried_chicken_PNG14094.png",
        handle: "@pollo",
        precio: 200,
        state: "off"
    },
    {
        nombre: "Flores",
        imagen: "/public/274d7614cd36432a341afdb087f10728.png",
        handle: "@flores",
        precio: 250,
        state: "off"
    },
]

module.exports = class Product{
    constructor(product){
        this.nombre = product.nombre;
        this.imagen = product.imagen;
        this.handle = product.handle;
        this.precio = product.precio;
    }

    save(){
        products.push(this);
    }

    static fetch_all(){
        return products;
    }

}