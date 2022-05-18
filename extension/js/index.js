var getMesForm = document.getElementById("logedin-form")
var getSizeForm = document.getElementById("sizeRecommend")
var resultTop = document.getElementById("resultsTop")
var resultBottom = document.getElementById("resultsBottom")
var getMeasure = JSON.parse(localStorage.getItem('shopsiMeasure'))
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
getMesForm.style.display = 'none';

//get current Account data
let getCurrentAcc = localStorage.getItem('currentAcc')
console.log(getCurrentAcc)

document.getElementById("enter-measurement").addEventListener("click", measurements);
document.getElementById('log-out').addEventListener("click", logout);
document.getElementById('edit').addEventListener("click", edit);
getResults()
function getResults() {
    if (getMeasure['Bust/Chest'] == 0 && getMeasure['Neckline'] == 0 && getMeasure['Waist'] == 0 && getMeasure['Low Hip'] == 0 && getMeasure['Arm Length'] == 0 && getMeasure['Inseam'] == 0) {
        resultTop.innerHTML = 'Please provide your measurements'
    } else {
        // resultTop.innerHTML = getMeasure['Bust/Chest'] + "<br>" +
        // getMeasure['Neckline'] + "<br>" +
        // getMeasure['Waist'] + "<br>" +
        // getMeasure['Low Hip'] + "<br>" +
        // getMeasure['Arm Length'] + "<br>" +
        // getMeasure['Inseam']
        getTopSizeRecommend()
        getBottomSizeRecommend()
    }
}
// var getBustValue = slide => if (getBustValue is in range from x to y && )
function between(x, min, max) {
    return x >= min && x <= max;
}
function getTopSizeRecommend() {
    if (between(getMeasure['Bust/Chest'],78,86) && between(getMeasure['Waist'],66,74) && between(getMeasure['Neckline'],34,35)) {
        console.log('XS');
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Extra Small (XS)</div>'
    } else if (between(getMeasure['Bust/Chest'],86,94) && between(getMeasure['Waist'],74,82) && between(getMeasure['Neckline'],36,37)) {
        console.log('S')
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Small (S)</div>'
    } else if (between(getMeasure['Bust/Chest'],94,102) && between(getMeasure['Waist'],82,90) && between(getMeasure['Neckline'],38,39)) {
        console.log('M')
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Medium (M)</div>'
    } else if (between(getMeasure['Bust/Chest'],102,110) && between(getMeasure['Waist'],90,98) && between(getMeasure['Neckline'],40,41)) {
        console.log('L')
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Large (L)</div>'
    }  else if (between(getMeasure['Bust/Chest'],110,118) && between(getMeasure['Waist'],98,107) && between(getMeasure['Neckline'],42,43)) {
        console.log('XL')
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Extra Large (XL)</div>'
    } else if (between(getMeasure['Bust/Chest'],118,126) && between(getMeasure['Waist'],107,116) && between(getMeasure['Neckline'],44,45)) {
        console.log('XXL')
        resultTop.innerHTML = 'Your top size recommend: <div id="size">2 Extra Large (XXL)</div>'
    } else if (between(getMeasure['Bust/Chest'],126,134) && between(getMeasure['Waist'],116,125) && between(getMeasure['Neckline'],46,47)) {
        console.log('XXXL')
        resultTop.innerHTML = 'Your top size recommend is <div id="size">3 Extra Large (XXXL)</div>'
    } else {
        console.log('Input the correct size');
        resultTop.innerHTML = 'Unable to provide your size, please edit your measurements'
    }
}
function getBottomSizeRecommend() {
    if (between(getMeasure['Waist'],66,74) && between(getMeasure['Low Hip'],85,91) && between(getMeasure['Inseam'],80,81)) {
        console.log('XS');
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Extra Small (XS)</div>'
    } else if (between(getMeasure['Waist'],74,82) && between(getMeasure['Low Hip'],91,97) && between(getMeasure['Inseam'],81,82)) {
        console.log('S')
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Small (S)</div>'
    } else if (between(getMeasure['Waist'],82,90) && between(getMeasure['Low Hip'],97,103) && between(getMeasure['Inseam'],82,83)) {
        console.log('M')
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Medium (M)</div>'
    } else if (between(getMeasure['Waist'],90,98) && between(getMeasure['Low Hip'],103,109) && between(getMeasure['Inseam'],83,84)) {
        console.log('L')
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Large (L)</div>'
    }  else if (between(getMeasure['Waist'],98,107) && between(getMeasure['Low Hip'],109,115) && between(getMeasure['Inseam'],84,85)) {
        console.log('XL')
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Extra Large (XL)</div>'
    } else if (between(getMeasure['Waist'],107,116) && between(getMeasure['Low Hip'],115,121) && between(getMeasure['Inseam'],85,86)) {
        console.log('XXL')
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">2 Extra Large (XXL)</div>'
    } else if (between(getMeasure['Waist'],116,125) && between(getMeasure['Low Hip'],121,127) && between(getMeasure['Inseam'],86,87)) {
        console.log('XXXL')
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">3 Extra Large (XXXL)</div>'
    } else {
        console.log('Input the correct size');
        resultBottom.innerHTML = 'Unable to provide your size, please edit your measurements'
    }
}

function measurements() {
    getMesForm.style.display = 'none';
    getSizeForm.style.display = 'block';
    // resultTop.innerHTML = bustSlider.value + "<br>" + neckSlider.value + "<br>" + waistSlider.value + "<br>" + hipSlider.value + "<br>" + armSlider.value + "<br>" + legSlider.value
    fetch("https://api.jsonbin.io/b/6281c7b438be29676106d06f/latest")
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            jsonResponse[getCurrentAcc]['measurements'] = {
                "Waist": waistSlider.value,
                "Bust/Chest": bustSlider.value,
                "Inseam": legSlider.value,
                "Arm Length": armSlider.value,
                "Neckline": neckSlider.value,
                "Low Hip": hipSlider.value
            }
            // console.log(JSON.stringify(jsonResponse));
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonResponse)
            };
            fetch('https://api.jsonbin.io/b/6281c7b438be29676106d06f', requestOptions)
                .then(response => {return response.json()})
                .then(data => {
                    localStorage.setItem('shopsiMeasure', JSON.stringify({
                        "Waist": waistSlider.value,
                        "Bust/Chest": bustSlider.value,
                        "Inseam": legSlider.value,
                        "Arm Length": armSlider.value,
                        "Neckline": neckSlider.value,
                        "Low Hip": hipSlider.value
                    }))
                    console.log(data)
                    location.reload();
                })
        });
}
//get values object
console.log(getMeasure.bust);

//Set measurements value
bustSlider.value = getMeasure['Bust/Chest']
bustValue.innerHTML = bustSlider.value
neckSlider.value = getMeasure['Neckline']
neckValue.innerHTML = neckSlider.value
waistSlider.value = getMeasure['Waist']
waistValue.innerHTML = waistSlider.value
hipSlider.value = getMeasure['Low Hip']
hipValue.innerHTML = hipSlider.value
armSlider.value = getMeasure['Arm Length']
armValue.innerHTML = armSlider.value
legSlider.value = getMeasure['Inseam']
legValue.innerHTML = legSlider.value

//POST request to change measurements value


function reEnter() {
    result.style.display = 'none';
    getMesForm.style.display = 'block';
}
function logout() {
    localStorage.setItem('isShopsiLoggedIn', false)
    window.location.href = "popup.html";
}
function edit() {
    getSizeForm.style.display = 'none';
    getMesForm.style.display = 'block';
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
