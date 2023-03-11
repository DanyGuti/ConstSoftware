const express = require('express');

let router = express.Router();

const productsController = require('../controllers/products.controller');
router.get('/comprar', productsController.get_lista);
router.post('/comprar', productsController.post_nuevo);

router.get('/carrito', productsController.get_cart);
router.post('/carrito', productsController.post_cart);

// router.get('/nuevo', productsController.get_nuevo);
// router.post('/nuevo', productsController.post_nuevo);

//
// Better to make a model class and then fetching data
//
// const products = [
    //     {
//         nombre: "Cacahuates",
//         imagen: "",
//         handle: "@cacahuates",
//         precio: 20,
//     },
//     {
//         nombre: "Pollo Frito",
//         imagen: "",
//         handle: "@pollo",
//         precio: 200,
//     },
//     {
//         nombre: "Flores",
//         imagen: "",
//         handle: "@flores",
//         precio: 250,
//     },
// ]


module.exports = router;