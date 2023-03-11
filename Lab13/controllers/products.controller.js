const Product = require('../models/products.model');

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
}

// Exportar lista de productos hacia el comprar
exports.get_lista = (req, res) => {
    res.render(__dirname + '/../views/comprar',{products: Product.fetch_all()});
};

exports.get_cart = (req, res) => {
    if (isObjectEmpty(req.body)) res.render(__dirname + '/../views/comprar');
    res.render(__dirname + '/../views/carrito', {products: Product.fetch_all()});
};


// Exportar lista de productos hacia el carrito
exports.post_cart = (req, res) => {
    let products = Product.fetch_all();
    let data = req.body;
    console.log(req.body)
    const { Cacahuates, PolloFrito, Flores, Maruchan } = req.body;
    if (isObjectEmpty(data)) res.render(__dirname + '/../views/index');
    else {
        let dataJSON = JSON.parse(JSON.stringify(data));
        var bufferData = "";
        if (dataJSON.Cacahuates == "on") bufferData += "Cacahuates";
        if (dataJSON.PolloFrito == "on") bufferData += " Pollo Frito ";
        if (dataJSON.flores == "on") bufferData += " Flores";
        if (dataJSON.Maruchan == "on") bufferData += " Maruchan";
        res.render(__dirname + '/../views/carrito', { caca: Cacahuates, pf: PolloFrito, flor: Flores, maruchan:Maruchan, products: products });
    }
};

// Get para poder renderizar al nuevo producto agregado
exports.get_nuevo = (req, res) => {
    res.render(__dirname + '/../views/new', Product.fetch_all());
};

// Post para poder renderizar al nuevo producto agregado
exports.post_nuevo = (req, res) => {
    const newProduct =  req.body;
    const product = new Product({
        nombre: newProduct.newName,
        imagen: "/../public/vaso-2-select.png",
        handle: "@" + newProduct.newName,
        precio: newProduct.newPrice
    });
    product.save();
    res.render(__dirname + '/../views/index', {products: Product.fetch_all()});
    // res.status(300).redirect('/..views/comprar', {product:product});
};
