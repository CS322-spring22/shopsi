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
var missingFields = document.getElementById("missingFields")
// document.getElementById("sign-up").addEventListener("click", signUp)
wrongPass.style.display ='none'
missingFields.style.display = 'none'
document.getElementById("log-in").addEventListener("click", getInfo)
function getInfo () {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    //alert(username +" + "+ password)
    if (username && password) {
        for (i = 0; i<infoObj.length; i++) {
            if (username == infoObj[i].username && password == infoObj[i].password) {
                console.log("log in")
                getLogForm.style.display = 'none'
                window.location.href ="index.html"
            }
        }
        
        wrongPass.style.display ='block'
        missingFields.style.display = 'none'
        var form = document.getElementById('login-form')
        form.reset()
    }
    else {
        missingFields.style.display = 'block'
        wrongPass.style.display ='none'
    }
    
}
function init () {
    chrome.runtime.sendMessage({message: 'is_user_signed_in'}, function(response) {
        if (response.message ==='success' && response.payload) {
            window.location.replace('index.html')
        }
    })
}
init()
function signUp() {
    window.location.href = "signup.html";
}

