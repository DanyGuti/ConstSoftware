module.exports = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    if(req.session.isLoggedIn != true){
        console.log("Sesion no iniciada");
        return res.redirect('/login');
    }
    next();
}