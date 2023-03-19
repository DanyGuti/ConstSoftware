const User = require('../models/users.model');
const bcrypt = require('bcryptjs');

exports.get_signup = (req, res) => {
    res.render(__dirname + '/../views/signup',{
        isLoggedIn: req.session.isLoggedIn || false,
        nombreU: req.session.nombreU || '',
        csrfToken: req.csrfToken(),
    });
};

// Make user, save it and then redirect to login
exports.post_signup = (req, res) => {
    const data = req.body;
    console.log(data.email);
    console.log(data.nombreU);
    console.log(req.session.isLoggedIn);
    const new_user = new User({
        nombre: data.nombreU,
        email: data.email,
        password: data.checkPswd
    });
    new_user.save()
    .then(([rows, fieldData]) => {
        req.session.message = "User registered...";
        res.redirect('login');
    })
    .catch((error) =>{
        console.log(error);
    })
};

exports.get_login = (req, res) => {
    let msg = '';
    if(req.session.message != ''){
        msg = req.session.message = '';
    }
    console.log(req.csrfToken());
    res.render(__dirname + '/../views/login',{
        message: msg,
        isLoggedIn: req.session.isLoggedIn || false,
        nombreU: req.session.nombreU || '',
        csrfToken: req.csrfToken(),
    });
};

exports.post_login = (req, res) => {
    User.fetchOne(req.body.email)
    .then(([rows, fieldData]) =>{
        if(rows.length > 0){
            console.log(req.body.password);
            console.log(rows[0].password);
            bcrypt.compare(req.body.password, rows[0].password)
            .then((doMatch) =>{
                req.session.isLoggedIn = true;
                req.session.email = rows[0].email;
                console.log("Si es match en post/login");
                res.redirect('/home/');
            })
            .catch((error)=> console.log("Didn't occurred what expected" + error));
        }else {
            req.session.message = 'User email or password doesnt match';
            console.log("Si");
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
