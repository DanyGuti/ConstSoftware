exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};
