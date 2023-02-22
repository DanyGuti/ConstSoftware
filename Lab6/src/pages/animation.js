function getPassword() {
    const pswds = new Map();
    let i = 0;
    let x = document.getElementById("pswd").value;
    let y = document.getElementById("checkPswd").value;
    // "^" start of input
    // "?=.*" lookahead one or more numeric: \d
    // "?=.*" lookahead one or more lowercase: [a-z]
    // "?=.*" lookahead one or more uppercase: [A-Z]
    // "?=.*" lookahead one or more specialChar: [A-Z]
    // "?!.*" negative lookahead assertion of spaces if any: \s
    // "{8,15}" quantifier between 8-15

    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(x.match(regex)){
        if(y.match(regex)){
            alert("Yes, correct");
            pswds.set(x,i++);
            pswds.set(y,i++);
            window.location.replace("http://127.0.0.1:5500/src/pages/validation.html")
        }
        else alert("No, you've gotten the second one wrong");
    }
    else alert("No, please try again...");
}

function showPswd(){
    const togglePassword = document.querySelector("#chbox1");
    const pswd = document.querySelector("#pswd");

    togglePassword.addEventListener("click", function () {
        const type = pswd.getAttribute("type") === "password" ? "text" : "password";
        pswd.setAttribute("type", type);
    });
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    const toggleCheck = document.querySelector("#chbox2");
    const check = document.querySelector("#checkPswd");
    toggleCheck.addEventListener("click", function () {
        const type = check.getAttribute("type") === "password" ? "text" : "password";
        check.setAttribute("type", type);
    });
    const formCheck = document.querySelector("form");
    formCheck.addEventListener("submit", function (e) {
        e.preventDefault();
    });
}

function changeFont() {
    const pswd = document.querySelector("#checkPswd");
    pswd.getAttribute("type") === "password" ? pswd.style.fontFamily = "cursive" : pswd.style.fontFamily = "Helvetica";
    const pswd2 = document.querySelector("#pswd");
    pswd2.getAttribute("type") === "password" ? pswd2.style.fontFamily = "cursive" : pswd2.style.fontFamily = "Helvetica";
}

function dispInfo() {
    const element = document.getElementById("change");
    element.className = "div-show";
    element.addEventListener("mouseout", function () {
        element.className = "div-primary"
    });
}

function dispValidate() {
    const element = document.getElementById("validate");
    element.className = "div-show";
    element.addEventListener("mouseout", function () {
        element.className = "div-primary"
    });
}
