var getMesForm = document.getElementById("signup-form")
var info = document.getElementById("info")


document.getElementById("sign-up").addEventListener("click", signUp);

function signUp () {
    getMesForm.style.display = 'none';
    var getFirstName = document.getElementById("firstName").value
    var getLastName = document.getElementById("lastName").value
    var getRegUsername = document.getElementById("regUsername").value
    var getRegPassword = document.getElementById("regPassword").value
    info.innerHTML = "First name: "+ getFirstName + " Last name: " + getLastName + "<br>"
                    + "Username: " + getRegUsername + "Password: " + getRegPassword ;
}