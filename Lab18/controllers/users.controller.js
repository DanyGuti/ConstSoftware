const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.get_signup = (req, res) => {
    res.render(__dirname + '/../views/signup',{
        isLoggedin: req.session.isLoggedin || false,
        nombreU: req.session.nombreU || '',
        csrfToken: req.csrfToken()
    });
};

// Make user, save it and then redirect to login
exports.post_signup = (req, res) => {
    let data = req.body;
    console.log(data.nombreU);
    const new_user = new User({
        nombre: data.nombreU,
        email: data.email,
        password: data.checkPswd
    });
    new_user.save()
    .then(([rows, fieldData]) => {
        req.session.message = "User registered...";
        res.render(__dirname+'/../views/login');
    })
    .catch((error) =>{
        console.log(error);
    })
};

exports.get_login = (req, res) => {
    let message = '';
    if(req.session.message != ''){
        message = req.session.message = '';
    }
    res.render(__dirname + '/../views/login',{
        message: message,
        isLoggedin: req.session.isLoggedin || false,
        nombreU: req.session.nombreU || '',
        csrfToken: req.csrfToken(),
    });
};

exports.post_login = (req, res) => {
    User.fetchOne(req.body.email)
    .then(([rows, fieldData]) =>{
        if(rows.length > 0){
            bcrypt.compare(req.body.password, rows[0].password)
            .then((doMatch) =>{
                req.session.isLoggedin = true;
                req.session.nombreU = rows[0].nombreU;
                res.redirect('/index');
            })
        }else {
            req.session.message = 'User email or password doesnt match';
            res.redirect('/login');
        }
    })
    .catch((error) => {console.log(error)});
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
