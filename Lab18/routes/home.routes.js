const express = require('express');

let router = express.Router();

router.get('/',(req, res) =>{
    const isLoggedIn = req.session.isLoggedIn
    const email = req.session.email
    res.render(__dirname + '/../views/index',{isLoggedIn: isLoggedIn, email: email});
});

router.post('/',(req, res) =>{
    res.render(__dirname + '/../views/index');
});

module.exports = router;