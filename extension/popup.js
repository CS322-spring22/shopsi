var infoObj = [
    {
        username: "admin",
        password: "admin"
    },
    {
        username: "ntthai",
        password: "abc"
    }
]
// const info = require("./info.json");
// console.log(info.username)
// console.log(info.password)
var getLogForm = document.getElementById("login-form")
var getMesForm = document.getElementById("logedin-form")
var result = document.getElementById("results")
var wrongPass = document.getElementById("wrongPass")
getMesForm.style.display = 'none';
wrongPass.style.display ='none';
document.getElementById("log-in").addEventListener("click", getInfo);
document.getElementById("enter-measurement").addEventListener("click", measurements);
document.getElementById('log-out').addEventListener("click", logout);
function getInfo () {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    //alert(username +" + "+ password)
    for (i = 0; i<infoObj.length; i++) {
        if (username == infoObj[i].username && password == infoObj[i].password) {
            console.log("log in")
            getLogForm.style.display = 'none'
            getMesForm.style.display = 'block';
        }
    }
    wrongPass.style.display ='block';
}

function measurements () {
    var weight = document.getElementById("weight").value
    var height = document.getElementById("height").value
    // alert("Your weight: "+ weight + "\nYour height: " + height);
    // getForm.style.visibility = 'hidden'
    getMesForm.style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = "Your weight: "+ weight + "<br>Your height: " + height + 
                                                    "<br><button type=\"button\" id=\"reEnter\" >Enter your measurement again</button>";
    document.getElementById("reEnter").addEventListener("click", reEnter);
}
function logout () {
    getLogForm.style.display = 'block'
    getMesForm.style.display = 'none';
}
function reEnter () {
    result.style.display = 'none';
    getMesForm.style.display = 'block';
}