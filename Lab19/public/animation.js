function getPassword() {
    let x = document.getElementById("checkPswd").value;
    // "^" start of input
    // "?=.*" lookahead one or more numeric: \d
    // "?=.*" lookahead one or more lowercase: [a-z]
    // "?=.*" lookahead one or more uppercase: [A-Z]
    // "?=.*" lookahead one or more specialChar: [A-Z]
    // "?!.*" negative lookahead assertion of spaces if any: \s
    // "{8,15}" quantifier between 8-15

    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (x.match(regex)) {
        alert("Yes, correct");
    }
    else alert("No, please try again...");
}

function showPswd() {
    const togglePassword = document.querySelector("#chbox1");
    const pswd = document.querySelector("#checkPswd");

    togglePassword.addEventListener("click", function () {
        const type = pswd.getAttribute("type") === "pswd" ? "text" : "pswd";
        pswd.setAttribute("type", type);
    });
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
    });

}

function changeFont() {
    const pswd = document.querySelector("#checkPswd");
    pswd.getAttribute("type") === "password" ? pswd.style.fontFamily = "cursive" : pswd.style.fontFamily = "Helvetica";
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
