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
var getLogForm = document.getElementById("login-form")
var wrongPass = document.getElementById("wrongPass")
document.getElementById('sign-up').addEventListener("click", signUp);
wrongPass.style.display ='none';
document.getElementById("log-in").addEventListener("click", getInfo);
function getInfo () {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    //alert(username +" + "+ password)
    for (i = 0; i<infoObj.length; i++) {
        if (username == infoObj[i].username && password == infoObj[i].password) {
            console.log("log in")
            getLogForm.style.display = 'none'
            // getMesForm.style.display = 'block';
            window.location.href ="index.html";
        }
    }
    wrongPass.style.display ='block';
    
}
function signUp() {
    window.location.href = "signup.html";
}

