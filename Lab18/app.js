const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path');
const csrf = require('csurf');
const isAuth = require('./util/is-auth');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views','views/partials');

app.use(express.static(path.join(__dirname)));

const usersModule = require("./routes/users.routes");
const homeModule = require("./routes/home.routes");
const buyModule = require("./routes/buy.routes");
const newProductModule = require("./routes/nuevo.routes");

// Change this to a sign in and then to home module
app.use('/', usersModule);
app.use('/home', isAuth, homeModule);
app.use('/buy', isAuth, buyModule);
app.use('/nuevo', newProductModule);

app.listen(3000);