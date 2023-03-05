const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let router = express.Router();

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
}
router.get('/comprar', (req, res) => {
    res.render(__dirname + '/../views/comprar');
});

const products = [
    {
        nombre: "Cacahuates",
        imagen: "",
        handle: "@cacahuates",
        precio: 20,
    },
    {
        nombre: "Pollo Frito",
        imagen: "",
        handle: "@pollo",
        precio: 200,
    },
    {
        nombre: "Flores",
        imagen: "",
        handle: "@flores",
        precio: 250,
    },
]

router.get('/carrito', (req, res) => {
    let data = req.body;
    const { cacahuates, PF, flores } = req.body;
    if (isObjectEmpty(data)) res.render(__dirname + '/../views/comprar');
    else {
        let dataJSON = JSON.parse(JSON.stringify(data));
        var bufferData = "";
        if (dataJSON.cacahuates == "on") bufferData += "Cacahuates";
        if (dataJSON.PF == "on") bufferData += " Pollo Frito ";
        if (dataJSON.flores == "on") bufferData += " Flores";
        res.render(__dirname + '/../views/carrito', { caca: cacahuates, pf: PF, flor: flores, products: products });
    }
});

router.post('/carrito', (req, res) => {
    let data = req.body;
    const {cacahuates, PF, flores} = req.body;
    if (isObjectEmpty(data)) res.render(__dirname + '/../views/comprar');
    else {
        let dataJSON = JSON.parse(JSON.stringify(data));
        var bufferData = "";
        if (dataJSON.cacahuates == "on") bufferData += "Cacahuates";
        if (dataJSON.PF == "on") bufferData += " Pollo Frito ";
        if (dataJSON.flores == "on") bufferData += " Flores";
        res.render(__dirname + '/../views/carrito', {caca:cacahuates, pf:PF, flor:flores, products:products});
    }
});


module.exports = router;