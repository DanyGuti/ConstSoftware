const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let router = express.Router();

const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
}
router.get('/comprar', (req, res) => {
    res.sendFile(__dirname + '/comprar.html');
});

router.post('/carrito', (req, res) => {
    let data = req.body;
    if(isObjectEmpty(data)) res.sendFile(__dirname + '/comprar.html');
    else{
        const fs = require("fs");
        let dataJSON = JSON.parse(JSON.stringify(data));
        var bufferData = "";
        res.sendFile(__dirname + '/carrito.html');

        if(dataJSON.cacahuates == "on") bufferData += "Cacahuates";
        if(dataJSON.PF == "on") bufferData += " Pollo Frito ";
        if(dataJSON.flores == "on") bufferData += " Flores";
        fs.writeFileSync("pedidos.txt", bufferData);
        console.log(bufferData);
    }
});


module.exports = router;