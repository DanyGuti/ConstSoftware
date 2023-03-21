const Product = require('../models/products.model');

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
}

// Exportar lista de productos hacia el comprar
exports.get_lista = (req, res) => {
    Product.fetch_all()
    .then(([rows, fieldData]) =>{
        res.render(__dirname + '/../views/comprar', {
            products: rows,
            last_added_product:req.session.last_added_product || '',
            isLoggedIn: req.session.isLoggedIn || false,
            email: req.session.email || '',
            privilegios: req.session.privilegios || [],
        }); 
    })
    .catch(error =>{
        console.log(error);
    });
};

exports.get_cart = (req, res) => {
    if (isObjectEmpty(req.body)) res.render(__dirname + '/../views/comprar');
    Product.fetch_all()
        .then(([rows, fieldData]) => {
            console.log(rows);
            res.render(__dirname + '/../views/carrito', {
                products: rows
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.cookieParser = (req, res, next) => {
    res.cookie(`Cookie token name`, `encrypted cookie string Value`,{
        maxAge: 5000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });
    res.send('Cookie have been saved successfully');
};

exports.getCookie = (req, res, next) => {
    console.log(req.cookies);
    res.send(req.cookies);
};

exports.deleteCookie = (req, res, next) => {
    res.clearCookie('connect.sid');
    res.send('Cookie has been deleted succesfully');
};


// Exportar lista de productos hacia el carrito
exports.post_cart = (req, res) => {
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
        Product.fetch_all()
            .then(([rows, fieldData]) => {
                console.log(rows);
                res.render(__dirname + '/../views/carrito', {
                    caca: Cacahuates,
                    pf: PolloFrito,
                    flor: Flores,
                    maruchan: Maruchan,
                    products: rows,
                    isLoggedIn: req.session.isLoggedIn || false,
                    email: req.session.email || ''
                });
            })
            .catch(error => {
                console.log(error);
            });
        // res.render(__dirname + '/../views/carrito', { caca: Cacahuates, pf: PolloFrito, flor: Flores, maruchan: Maruchan, products: rows });
    }
};

// Get para poder renderizar al nuevo producto agregado
exports.get_nuevo = (req, res) => {
    Product.fetch_all()
    .then(([rows, fieldData]) => {
        res.render(__dirname + '/../views/new',{
            products : rows,
            csrfToken: req.csrfToken()});
    })
    .catch(error =>{
        console.log(error);
    });
};

// Post para poder renderizar al nuevo producto agregado
exports.post_nuevo = (req, res, next) => {
    const newProduct =  req.body;
    const product = new Product({
        nombre: newProduct.newName,
        imagen: "/../public/vaso-2-select.png",
        handle: "@" + newProduct.newName,
        precio: newProduct.newPrice,
        estado: "off"
    });
    product.save()
    .then(([rows, fieldData]) => {
        req.session.last_added_product = product.nombre;
    });
    Product.fetch_all()
    .then(([rows, fieldData]) => {
        res.render(__dirname + '/../views/index', {
            products: rows
        });
    })
    .catch(error => {
        console.log(error);
    });
    // res.status(300).redirect('/..views/comprar', {product:product});
};
