const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views','views/partials');

app.use(express.static(path.join(__dirname)));

const homeModule = require("./routes/home");
const buyModule = require("./routes/buy");

app.use('/', homeModule);
app.use('/buy', buyModule);


app.listen(3000);