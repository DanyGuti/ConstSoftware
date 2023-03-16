const express = require('express');

let router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/logout', usersController.logout);

module.exports = router;