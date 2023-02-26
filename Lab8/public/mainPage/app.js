console.log("hola desde node");

const filesystem = require("fs");
// Correr de manera síncrona sin bloquearse atendiendo a todos
const data = filesystem.readFileSync("numbers.txt", "utf8").split('\n');
write(data, filesystem);
avg(data);

// Una función que reciba un arreglo de números y devuelva su promedio.
function avg(vector) {
    var sum = 0;
    for (let i = 0; i < vector.length; i++) sum += (parseInt(vector[i]))
    console.log("El promedio del vector es: " + sum / vector.length);
}

// Una función que reciba un string y escriba el string en un archivo de texto. Apóyate del módulo fs.
function write(vector, file) {
    let numbers = "";
    for (let i = 0; i < vector.length; i++) numbers+=vector[i];
    filesystem.writeFileSync("hola.txt", numbers);
}

// Escoge algún problema que hayas implementado en otro lenguaje de programación,
// y dale una solución en js que se ejecute sobre node.
class Graph{
    constructor(numVertices){
        this.numVertices = numVertices;
        this.AdjList = new Map();
    }
    addVertex(value){
        this.AdjList.set(value,[]);
    }
    addEdge(value, w){
        this.AdjList.get(value).push(w);
        this.AdjList.get(w).push(value);
    }
    printGraph(){
        let vertex = this.AdjList.keys();
        // For every key
        for(let i of vertex){
            // Iterate adjacency list
            let connections = this.AdjList.get(i);
            let conc = "";
            for(let j of connections){
                conc += j + " ";
            }
            console.log(i + "->" + conc +  "\n");
        }
    }
    dfs(startVertex){
        let visited = {};
        this.DFSUtil(startVertex, visited);
    }
    DFSUtil(vert, visited){
        visited[vert] = true;
        let neighbors = this.AdjList.get(vert);
        for (let i in neighbors){
            let node = neighbors[i];
            if(!visited[node]){
                this.DFSUtil(node, visited);
                console.log(node + "->");
            }
        }
    }
}
// What does a graph has?
// It is made by edges and vertices for example:
// a[b,d]
// d[a,b]
// b[a,c,e]
// c[b,d,e]
// e[b,c]

// It can be represented as a map, where every vertex is the key
// and every connection is tha value as a bucket

// Módulo que permite crear servidores web y manejar las peticiones y respuestas
let graph = new Graph(6);
let vertices = ["a", "b", "c", "d","e", "f"];
for(let i = 0; i < vertices.length; i++){
    graph.addVertex(vertices[i]);
}
graph.addEdge("a","b");
graph.addEdge("a","c");

graph.addEdge("b","d");

graph.addEdge("c","e");
graph.addEdge("c","f");

graph.printGraph();
graph.dfs("a");
const http = require("http");

// const express = require("express");
// const app = express();
// app.use(express.static("public"));
// app.get('/', (req, res) => {
//     res.sendFile('index.html');
// })
// app.listen(3000, function(){
//     console.log("Running port 3000");
// });
const server = http.createServer((request, response) => {
    const fs = require('fs').promises;
    fs.readFile(__dirname + "/index.html")
    .then(contents => {
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        response.end(contents);
    })
    // } else if (request.url === "/output.css"){
    //     const fs = require('fs').promises;
    //     fs.readFile(__dirname + "/output.css")
    //         .then(contents => {
    //             response.setHeader("Content-Type", "text/css");
    //             response.writeHead(200);
    //             response.end(contents);
    //     });
    // }
    // .catch(err => {
    //     response.writeHead(500);
    //     response.end(err);
    //     return;
    // });
    // response.end();
});
server.listen(3000);

