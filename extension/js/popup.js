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
window.addEventListener('click', function (e) {
    if (e.target.href !== undefined) {
        chrome.tabs.create({ url: e.target.href })
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
    window.location.href = "index.html"
}

// localStorage.setItem('shopsiMeasure', JSON.stringify({}))



function getInfo() {
    var usr = document.getElementById("username").value
    var pwd = document.getElementById("password").value
    if (usr && pwd) {
        // fetch data from Anastatia endpoint
        // axios.post('https://anastatiad.pythonanywhere.com/loginLP', {
        //     username: usr,
        //     password: pwd,
        //     get: 'true'
        // })
        //     .then((response) => {
        //         var res = response.data;
        //         console.log(res);
        //         if (res.Status == 'Successful Login') {
        //             localStorage.setItem('isShopsiLoggedIn', true)
        //             axios.post('https://anastatiad.pythonanywhere.com/measureLP', {
        //                 username: usr,
        //                 password: pwd,
        //                 get: 'true'
        //             })
        //                 .then((response) => {
        //                     var res = response.data;
        //                     console.log(res);
        //                     localStorage.setItem('shopsiMeasure', JSON.stringify(res))
        //                 }, (error) => {
        //                     console.log(error);
        //                 })
        //             getLogForm.style.display = 'none'
        //             window.location.href = "index.html"
        //         }
        //     }, (error) => {
        //         console.log(error);
        //     })
        
        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                username: usr,
                password: pwd,
                get: 'true'
            }),
        };
        console.log(options)
        fetch("https://anastatiad.pythonanywhere.com/loginLP", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.Status == 'Successful Login') {
                    console.log('success')
                    localStorage.setItem('isShopsiLoggedIn', true)
                    fetch("https://anastatiad.pythonanywhere.com/measureLP", options)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            localStorage.setItem('shopsiMeasure', JSON.stringify(data))
                            getLogForm.style.display = 'none'
                            window.location.href = "index.html"
                        });
                } else {
                    wrongPass.style.display = 'block'
                    missingFields.style.display = 'none'
                    var form = document.getElementById('login-form')
                    form.reset()
                }
            });
    } else {
        missingFields.style.display = 'block'
        wrongPass.style.display = 'none'
    }


}
function signUp() {
    window.location.href = "signup.html";
}

