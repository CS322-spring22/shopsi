var getMesForm = document.getElementById("signup-form")
var info = document.getElementById("info")


document.getElementById("sign-up").addEventListener("click", signUp);
document.getElementById("log-in").addEventListener("click", logIn);

function signUp () {
    getMesForm.style.display = 'none';
    var getFirstName = document.getElementById("firstName").value
    var getLastName = document.getElementById("lastName").value
    var getRegUsername = document.getElementById("regUsername").value
    var getRegPassword = document.getElementById("regPassword").value
    //send data to backend here
    info.innerHTML = "First name: "+ getFirstName + " Last name: " + getLastName + "<br>"
                    + "Username: " + getRegUsername + "Password: " + getRegPassword ;
}

function logIn () {
    window.location.href = "popup.html"
}