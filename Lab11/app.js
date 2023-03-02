// Esto es nuestro index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const homeModule = require("./routes/home");
const buyModule = require("./routes/buy");

// First module
app.use('/', homeModule);

// Second module
app.use('/buy', buyModule);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
});


app.listen(3000);