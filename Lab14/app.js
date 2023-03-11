const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const path = require('path');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views','views/partials');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use(express.static(path.join(__dirname)));

const usersModule = require("./routes/users");
const homeModule = require("./routes/home");
const buyModule = require("./routes/buy");
const newProductModule = require("./routes/nuevo");

app.use('/', homeModule);
app.use('/buy', buyModule);
app.use('/nuevo', newProductModule);
app.use('/users', usersModule);

app.listen(3000);