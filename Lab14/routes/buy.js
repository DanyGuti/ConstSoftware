const express = require('express');
const cookieParser = require('cookie-parser');


let router = express.Router();

const productsController = require('../controllers/products.controller');
router.get('/comprar', productsController.get_lista);
router.post('/comprar', productsController.post_nuevo);

router.get('/carrito', productsController.get_cart);
router.post('/carrito', productsController.post_cart);

router.get('/setcookie', productsController.cookieParser);
router.get('/getcookie', productsController.getCookie);
router.get('/delcookie', productsController.deleteCookie);


module.exports = router;