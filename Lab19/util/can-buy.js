module.exports = (request, response, next) => {
    if (!(request.session.privilegios.indexOf('ver_productos') >= 0)) {
        return response.redirect('/buy');
    }
    next();
}