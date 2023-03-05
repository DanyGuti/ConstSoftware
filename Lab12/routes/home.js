const express = require('express');

let router = express.Router();

router.get('/',(req, res) =>{
    res.render(__dirname + '/../views/index');
});

module.exports = router;