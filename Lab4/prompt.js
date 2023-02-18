document.write("<h1>Primera Pregunta</h1>");
let num = prompt("Escribe un número");
sqNum(num);
function sqNum(number) {
    document.write("Cuadrados del número dado: ");
    // Creating a Table element into HTML
    let x = document.createElement("table");
    x.setAttribute("id", "squareTable");
    document.body.appendChild(x);

    var y = document.createElement("tr");
    y.setAttribute("id", "myTr");
    document.getElementById("squareTable").appendChild(y);    // Creating a TableRow element into HTML
    for(let i = 0; i < number; i++){
        let z = document.createElement("td");
        let t = document.createTextNode(i ** 2);
        z.appendChild(t);
        document.getElementById("myTr").appendChild(z);
    }
    document.write("<br>");
    cubeNum(number);
}
function cubeNum(number) {
    document.write("Cubos del número dado: ");
    // Creating a Table element into HTML
    let x = document.createElement("TABLE");
    x.setAttribute("id", "cubeTable");
    document.body.appendChild(x);
    var y = document.createElement("tr");
    y.setAttribute("id", "TR");
    document.getElementById("cubeTable").appendChild(y);    // Creating a TableRow element into HTML
    for(let i = 0; i < number; i++){
        let z = document.createElement("td");
        let t = document.createTextNode(i ** 3);
        z.appendChild(t);
        document.getElementById("TR").appendChild(z);
    }
    document.write("<br>");
}
document.write("<h1>Segunda Pregunta</h1>");

let x = Math.floor(Math.random()*10);
let y = Math.floor(Math.random()*10);
let now = Date.now();
let ans = prompt("La suma de: "+ x.toString()+ " y: "+ y.toString()+ " es: ");
document.write("La suma de los números es: " + ans + " ");
let time = (Date.now() - now)/1000;

if(ans == x + y) document.write("Lo hiciste en: " + time.toString() + " segundos");
else document.write("Equivocado en: " + time.toString()+ " segundos");

arr = [0, 212, 323, -1, -5, -10, 0, 0];
const answer = counter(arr);
document.write("<h1>Tercera Pregunta</h1>");
document.write("cantidad de números negativos, cantidad de ceros, y cantidad de números > 0");
document.write("<br></br>");
for(let i = 0; i < answer.length; i++) document.write(answer[i] + " ");
function counter(array){
    const answer = [0, 0, 0];
    for(let i = 0; i < array.length; i++) {
        if(array[i] < 0) answer[0]++;
        if(array[i] == 0) answer[1]++;
        if(array[i] > 0) answer[2]++;
    }
    return answer;
}

document.write("<h1>Cuarta Pregunta</h1>");
document.write("Promedios por renglón de matriz ");
document.write("[[0,2,3,6], [10,20,30,60], [8,50,100,200]]");
document.write("<br></br>");
matrix =
[
    [0, 2, 3, 6],
    [10, 20, 30, 60],
    [8, 50, 100, 200],
];

const avg = calcAvg(matrix);
for (let i = 0; i < avg.length; i++) document.write(avg[i] + " ");

function calcAvg(matrix) {
    const average = [];
    for (let i = 0; i < matrix.length; i++){
        let sum = 0;
        for(let j = 0; j < matrix[i].length; j++){
            sum += matrix[i][j];
        }
        average.push(sum/matrix[i].length);
    }
    return average;
}

document.write("<h1>Quinta Pregunta</h1>");
let ctr = invDigits(123187);
document.write("El siguiente número: " + 123187 + " invertido es: "+ ctr)
function invDigits(n){
    let ctr = 0;
    while(n > 0){
        ctr *= 10;
        ctr = ctr + (n % 10);
        n = Math.floor(n/10);
    }
    return ctr;
}

document.write("<h1>Sexta Pregunta</h1>");
document.write("<h2>Lista enlazada</h1>");

class ListNode{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
class LinkedList{
    constructor(head = null){
        this.head = head;
    }
    printList() {
        let ptr = this.head;
        document.write("[");
        while (ptr.next) {
            document.write(ptr.val + "--->");
            ptr = ptr.next;
        }
        document.write(ptr.val + "]");

    }
    // Receive a node and create a List
    createList(node) {
        // [7]
        // [2]->[5]
        let q = new ListNode(node);
        let ptr = this.head;
        if(ptr == null){
            this.head = q;
            return;
        }
        while(ptr.next){
            ptr = ptr.next;
        }
        ptr.next = q;
    }
}
class Solution {
    removeDup(list){
        if(list == null) return;
        let dummy = new ListNode(-200);
        let ptr = dummy;
        while(list){
            if(list.val != ptr.val){
                ptr.next = list;
                ptr = ptr.next;
            }
            list = list.next;
        }
        return dummy.next;
    }
}

// Lista para remover duplicados


let myList = new LinkedList();
myList.createList(1);
myList.createList(2);
myList.createList(3);
myList.createList(4);
myList.createList(4);
myList.createList(5);
myList.printList();

document.write("<h3>Remover duplicados</h3>");

let solution = new Solution();
let sol = solution.removeDup(myList);
sol.printList();


document.write("<h2>Preguntas</h2>");

document.write("<strong>Diferencias y semejanzas de JS y Java</strong>");
document.write("<p>El paradigma cambia, pero JS es para páginas interactivas</p>");
document.write("<p>y java es para uso general de programación</p>");
document.write("<p>Cambia el syntax pues Java es tipado y JS no lo es</p>");
document.write("<p>Ambos tienen paradigma de OOP, pero JS clona los objetos existentes</p>");
document.write("<p>mientras que Java crea sus propios objetos y ambos son crossplatform</p>");

document.write("<strong>¿Qué métodos tiene el objeto Date? (Menciona al menos 5*)</strong>");
document.write("<p>getDate(), getDay(), getHours(), getMinutes(), getMonth()</p>");
document.write("<strong>¿Qué métodos tiene el objeto Date? (Menciona al menos 5*)</strong>");
document.write("<p>splice(), slice(), push(), pop(), shift()</p>");
document.write("<strong>¿Cómo se declara una variable con alcance local dentro de una función?)</strong>");
document.write("<p>Con alcance local es let</p>");
document.write("<strong>¿Qué implicaciones tiene utilizar variables globales dentro de funciones?)</strong>");
document.write("<p>Podrías modificar el valor de esta variable sin darte cuenta</p>");








// Función: contador. Parámetros: Un arreglo de números.Regresa: La cantidad de números negativos en el arreglo,
//  la cantidad de 0's, y la cantidad de valores mayores a 0 en el arreglo.
