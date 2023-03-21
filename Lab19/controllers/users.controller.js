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
                // if(doMatch){
                    console.log("Si entraste");
                    req.session.isLoggedIn = true;
                    req.session.email = rows[0].email;
                    User.getPrivilegios(rows[0].nombre)
                    .then(([consulta_privilegios, fieldData]) =>{
                        console.log(consulta_privilegios);
                        
                        const privilegios = [];

                        for(let privilegio of consulta_privilegios){
                            privilegios.push(privilegio.nombre);
                        }
                        
                        console.log(privilegios);
                        console.log("hola");
                        req.session.privilegios = privilegios;

                        return req.session.save(err =>{
                            res.redirect('/home');
                        });
                    })
                    .catch ((error) => console.log("Didn't occurred what expected" + error));
                // }
                // else {
                //     req.session.message = 'User email or password doesnt match';
                //     res.redirect('/buy');
                // }
            })
            .catch((error) => {console.log(error)});
        } else {
            req.session.message = 'User email or password doesnt match';
            res.redirect('/login');
        }
    })
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
