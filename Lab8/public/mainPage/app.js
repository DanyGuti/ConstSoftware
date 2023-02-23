console.log("hola desde node");

const filesystem = require("fs");
// Correr de manera síncrona sin bloquearse atendiendo a todos
filesystem.writeFileSync("hola.txt", "Hola desde node");

// BackEnd

// Módulo que permite crear servidores web y manejar las peticiones y respuestas
const http = require("http");

const server = http.createServer( (request, response) => {
    console.log(request.url);
    // response.setHeader("Content-Type", "text/html");
    response.write("Request de Node");
    response.end();
});
server.listen(3000);
