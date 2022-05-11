var getMesForm = document.getElementById("logedin-form")
var result = document.getElementById("results")
const bustSlider = document.getElementById("bustSlider");
const bustValue = document.getElementById("bust-value");
const neckSlider = document.getElementById("neckSlider");
const neckValue = document.getElementById("neck-value");
const waistSlider = document.getElementById("waistSlider");
const waistValue = document.getElementById("waist-value");
const hipSlider = document.getElementById("hipSlider");
const hipValue = document.getElementById("hip-value");
const armSlider = document.getElementById("armSlider");
const armValue = document.getElementById("arm-value");
const legSlider = document.getElementById("legSlider");
const legValue = document.getElementById("leg-value");
document.getElementById("enter-measurement").addEventListener("click", measurements);
// document.getElementById('log-out').addEventListener("click", logout);
function measurements () {
    getMesForm.style.display = 'none';
    result.style.display = 'block';
    result.innerHTML = bustSlider.value + "<br>" + neckSlider.value + "<br>" + waistSlider.value + "<br>" + hipSlider.value + "<br>" + armSlider.value + "<br>" + legSlider.value + "<br>" +
                                                    "<br><button type=\"button\" id=\"reEnter\" >Enter your measurement again</button>";
    document.getElementById("reEnter").addEventListener("click", reEnter);
}

function reEnter () {
    result.style.display = 'none';
    getMesForm.style.display = 'block';
}
document.querySelector('#log-out').addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'log_out'}, function(response) {
        if (response.message === 'success') {
            window.location.replace("popup.html")
        }
    })
})
function logout () {
    window.location.href = "popup.html";
}

bustSlider.oninput = function () {
    bustValue.innerHTML = bustSlider.value;
}
neckSlider.oninput = function () {
    neckValue.innerHTML = neckSlider.value;
}
waistSlider.oninput = function () {
    waistValue.innerHTML = waistSlider.value;
}
hipSlider.oninput = function () {
    hipValue.innerHTML = hipSlider.value;
}
armSlider.oninput = function () {
    armValue.innerHTML = armSlider.value;
}
legSlider.oninput = function () {
    legValue.innerHTML = legSlider.value;
}
