const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/comprar', function (req, res) {
    res.sendFile(__dirname + '/comprar.html');
});

app.post('/carrito', function (req, res){
    res.sendFile(__dirname + '/carrito.html');
    const filesystem = require("fs");
    let data = req.body;
    let dataJSON = JSON.stringify(data);
    let parse = JSON.parse(dataJSON);
    console.log(parse);
    var dict = {
        "cacahuates" : false,
        "polloF" : false,
        "flores" : false
    };
    if(parse.cacahuates == "on"){
        let numC = 0;
        dict["cacahuates"] = true;
        // res.render("/carrito", {name:numC++});
        console.log("Pediste Cacahuates");
    }
    if(parse.PF == "on"){
        let numP = 0;
        dict["polloF"] = true;
        // res.render('/carrito', { name: numP++ });
        console.log("Pediste Pollo Frito");
    }
    if(parse.flores == "on"){
        let numF = 0;
        dict["flores"] = true;
        // res.render('/carrito', { name: numF++ });
        console.log("Pediste Flores");
    }
    if (parse == (Object.length < 1)){
        res.status(404).send("<h1>Page not found</h1>");
    }
    let bufferData = "cacahuates polloFrito Flores";
    let cacahuates = "";
    let polloF = "";
    let flores = "";
    for(let [key, value] of Object.entries(dict)){
        if(key == "cacahuates" && value == true){
            cacahuates = bufferData.substring(0, 10);
        }
        else if(key == "polloF" && value == true){
            polloF = bufferData.substring(11, 21);
        }
        else if(key == "flores" && value == true){
            flores = bufferData.substring(22, 28);
        }
    }
    bufferData = cacahuates + polloF + flores;
    const buffer = Buffer.alloc(bufferData.length, bufferData, 'utf8');
    filesystem.writeFileSync("pedidos.txt", buffer);
    console.log(typeof(parse));
    res.end();
});

app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found</h1>");
});

app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});