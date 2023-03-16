const express = require('express');

let router = express.Router();

const productsController = require('../controllers/products.controller');

router.get('/product', productsController.get_nuevo);
router.post('/product', productsController.post_nuevo);

module.exports = router;