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
// document.getElementById('sign-up').addEventListener("click", signUp)
wrongPass.style.display = 'none'
missingFields.style.display = 'none'
document.getElementById("log-in").addEventListener("click", getInfo)
var isLoggedIn = localStorage.getItem('isShopsiLoggedIn')
console.log(isLoggedIn)
window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
      chrome.tabs.create({url:e.target.href})
    }
  })
if (isLoggedIn == 'true') {
    console.log('chuyen')
}
let measurements = localStorage.getItem('shopsiMeasure')
if (isLoggedIn == undefined) {
    localStorage.setItem('isShopsiLoggedIn', false)
}
if (isLoggedIn == 'true') {
    console.log(localStorage.getItem('currentAcc'))
    window.location.href ="index.html"
}

if (measurements == undefined) {
    localStorage.setItem('shopsiMeasure', {})
} 


function getInfo() {
    var usr = document.getElementById("username").value
    var pwd = document.getElementById("password").value
    //alert(username +" + "+ password)
    // if (username && password) {
    //     for (i = 0; i<infoObj.length; i++) {
    //         if (username == infoObj[i].username && password == infoObj[i].password) {
    //             console.log("log in")
    //             getLogForm.style.display = 'none'
    //             window.location.href ="index.html"
    //         }
    //     }

    //     wrongPass.style.display ='block'
    //     missingFields.style.display = 'none'
    //     var form = document.getElementById('login-form')
    //     form.reset()
    // }
    // else {
    //     missingFields.style.display = 'block'
    //     wrongPass.style.display ='none'
    // }
    if (usr && pwd) {
        //back up endpoint
        fetch("https://api.jsonbin.io/b/6281c7b438be29676106d06f/latest")
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                for (index in jsonResponse) {
                    if (usr == jsonResponse[index]["username"] && pwd == jsonResponse[index]["password"]) {
                        console.log("log in")
                        localStorage.setItem('isShopsiLoggedIn', true)
                        localStorage.setItem('currentAcc', index)
                        console.log('start')
                        console.log(jsonResponse[index]['measurements']);
                        localStorage.setItem('shopsiMeasure', JSON.stringify(jsonResponse[index]['measurements']))
                        console.log(JSON.stringify(jsonResponse[index]['measurements']))
                        console.log('end');
                        getLogForm.style.display = 'none'
                        window.location.href = "index.html"

                    } else {
                        wrongPass.style.display = 'block'
                        missingFields.style.display = 'none'
                        var form = document.getElementById('login-form')
                        form.reset()
                    }
                }
            });
        // fetch data from Anastatia endpoint
        // fetch('https://anastatiad.pythonanywhere.com/loginLP', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({username: usr, password: pwd})
        //     }).then(res => res.json())
        //     .then(res => console.log(res))
        //     .then(window.location.href = "index.html")
    } else {
        missingFields.style.display = 'block'
        wrongPass.style.display = 'none'
    }


}
function signUp() {
    window.location.href = "signup.html";
}

