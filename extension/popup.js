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
const info = require("./info.json");
console.log(info.username)
console.log(info.password)

function getInfo () {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    //alert(username +" + "+ password)
    for (i = 0; i<infoObj.length; i++) {
        if (username == infoObj[i].username && password == infoObj[i].password) {
            alert("Logged in")
            $("#login-form").hide()
            return
        }
    }
    alert("Wrong authentication")
}