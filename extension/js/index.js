var getMesForm = document.getElementById("logedin-form")
var getSizeForm = document.getElementById("sizeRecommend")
var resultTop = document.getElementById("resultsTop")
var resultBottom = document.getElementById("resultsBottom")
var getMeasure = JSON.parse(localStorage.getItem('shopsiMeasure'))
var getCurr = localStorage.getItem('curr')
var gender = localStorage.getItem('gender')
let welcomeMes = document.getElementById("welcome");
let bustSlider = document.getElementById("bustSlider");
let bustValue = document.getElementById("bust-value");
let neckSlider = document.getElementById("neckSlider");
let neckValue = document.getElementById("neck-value");
let waistSlider = document.getElementById("waistSlider");
let waistValue = document.getElementById("waist-value");
let hipSlider = document.getElementById("hipSlider");
let hipValue = document.getElementById("hip-value");
let armSlider = document.getElementById("armSlider");
let armValue = document.getElementById("arm-value");
let legSlider = document.getElementById("legSlider");
let legValue = document.getElementById("leg-value");
let bustSliderIn = document.getElementById("bustSliderIn");
let bustValueIn = document.getElementById("bust-valueIn");
let neckSliderIn = document.getElementById("neckSliderIn");
let neckValueIn = document.getElementById("neck-valueIn");
let waistSliderIn = document.getElementById("waistSliderIn");
let waistValueIn = document.getElementById("waist-valueIn");
let hipSliderIn = document.getElementById("hipSliderIn");
let hipValueIn = document.getElementById("hip-valueIn");
let armSliderIn = document.getElementById("armSliderIn");
let armValueIn = document.getElementById("arm-valueIn");
let legSliderIn = document.getElementById("legSliderIn");
let legValueIn = document.getElementById("leg-valueIn");
let toggle = document.querySelector(".toggle")
let toggleButton = document.querySelector(".toggle-button")
let unitText = document.querySelector(".unitText")
let unitCm = document.querySelector(".isCm")
let unitIn = document.querySelector(".isIn")

toggleButton.addEventListener("click", unitSwitch)
getMesForm.style.display = 'none';
toggle.style.display = 'none';
unitIn.style.display = 'none';

localStorage.setItem('unit', 'cm')
welcomeMes.innerHTML = 'Hello ' + localStorage.getItem('firstname') +"!"
document.getElementById("enter-measurement").addEventListener("click", measurements);
document.getElementById('log-out').addEventListener("click", logout);
document.getElementById('edit').addEventListener("click", edit);
getResults()
function getResults() {
    if (getMeasure['Bust/Chest'] == 0 && getMeasure['Neckline'] == 0 && getMeasure['Waist'] == 0 && getMeasure['Low Hip'] == 0 && getMeasure['Arm Length'] == 0 && getMeasure['Inseam'] == 0) {
        resultTop.innerHTML = 'Please provide your measurements<br> Click the \"Edit"\ button'
    } else if (gender == 'male'){
        getManTopSizeRecommend()
        getManBottomSizeRecommend()
    } else if (gender == 'female') {
        getWomanTopSizeRecommend()
        getWomanBottomSizeRecommend()
    }
}

function measurements() {
    getMesForm.style.display = 'none';
    toggle.style.display = 'none';
    getSizeForm.style.display = 'block';
    let getUnit = localStorage.getItem('unit')
    if (getUnit =='cm') {
        console.log('ok cm')
        let options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                curr: getCurr,
                "Waist": waistSlider.value,
                "Bust/Chest": bustSlider.value,
                "Inside Leg": legSlider.value,
                "Arm Length": armSlider.value,
                "Neckline": neckSlider.value,
                "Low Hip": hipSlider.value,
                "unit": "cm"
            }),
        };
        console.log("start")
        console.log(options["body"])
        let unitMeasure = {
            "Waist": waistSlider.value,
            "Bust/Chest": bustSlider.value,
            "Inseam": legSlider.value,
            "Arm Length": armSlider.value,
            "Neckline": neckSlider.value,
            "Low Hip": hipSlider.value
        }
        localStorage.setItem('shopsiMeasure',JSON.stringify(unitMeasure))
        fetch("https://anastatiad.pythonanywhere.com/measureLP", options)
            .then((response) => response.json())
            .then(console.log('success post'))
            setTimeout(function(){
                window.location.reload();
             }, 1000);
    }
    if (getUnit =='in') {
        console.log('ok in')
        let options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                curr: getCurr,
                "Waist": waistSliderIn.value,
                "Bust/Chest": bustSliderIn.value,
                "Inside Leg": legSliderIn.value,
                "Arm Length": armSliderIn.value,
                "Neckline": neckSliderIn.value,
                "Low Hip": hipSliderIn.value,
                "unit": "in"
            }),
        };
        console.log("start")
        console.log(options["body"])
        let unitMeasure = {
            "Waist": waistSliderIn.value*2.54,
            "Bust/Chest": bustSliderIn.value*2.54,
            "Inseam": legSliderIn.value*2.54,
            "Arm Length": armSliderIn.value*2.54,
            "Neckline": neckSliderIn.value*2.54,
            "Low Hip": hipSliderIn.value*2.54,
        }
        localStorage.setItem('shopsiMeasure',JSON.stringify(unitMeasure))
        fetch("https://anastatiad.pythonanywhere.com/measureLP", options)
            .then((response) => response.json())
            .then(console.log('success post'))
            setTimeout(function(){
                window.location.reload();
             }, 2000);
    }
    
}

//Set cm measurements value
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

bustSliderIn.value = Math.round(getMeasure['Bust/Chest']/2.54)
bustValueIn.innerHTML = bustSliderIn.value
neckSliderIn.value = Math.round(getMeasure['Neckline']/2.54)
neckValueIn.innerHTML = neckSliderIn.value
waistSliderIn.value = Math.round(getMeasure['Waist']/2.54)
waistValueIn.innerHTML = waistSliderIn.value
hipSliderIn.value = Math.round(getMeasure['Low Hip']/2.54)
hipValueIn.innerHTML = hipSliderIn.value
armSliderIn.value = Math.round(getMeasure['Arm Length']/2.54)
armValueIn.innerHTML = armSliderIn.value
legSliderIn.value = Math.round(getMeasure['Inseam']/2.54)
legValueIn.innerHTML = legSliderIn.value


function unitSwitch() {
    toggle.classList.toggle("active")
    if (toggle.classList.contains("active")) {
        localStorage.setItem('unit', 'in')
        unitText.innerHTML = "in"
        unitIn.style.display = 'block';
        unitCm.style.display = 'none';
        bustSliderIn.value = Math.round(bustSlider.value/2.54)
        bustValueIn.innerHTML = bustSliderIn.value
        neckSliderIn.value = Math.round(neckSlider.value/2.54)
        neckValueIn.innerHTML = neckSliderIn.value
        waistSliderIn.value = Math.round(waistSlider.value/2.54)
        waistValueIn.innerHTML = waistSliderIn.value
        hipSliderIn.value = Math.round(hipSlider.value/2.54)
        hipValueIn.innerHTML = hipSliderIn.value
        armSliderIn.value = Math.round(armSlider.value/2.54)
        armValueIn.innerHTML = armSliderIn.value
        legSliderIn.value = Math.round(legSlider.value/2.54)
        legValueIn.innerHTML = legSliderIn.value
    } else {
        localStorage.setItem('unit', 'cm')
        unitText.innerHTML = "cm"
        unitCm.style.display = 'block';
        unitIn.style.display = 'none';
        bustSlider.value = Math.round(bustSliderIn.value*2.54)
        bustValue.innerHTML = bustSlider.value
        neckSlider.value = Math.round(neckSliderIn.value*2.54)
        neckValue.innerHTML = neckSlider.value
        waistSlider.value = Math.round(waistSliderIn.value*2.54)
        waistValue.innerHTML = waistSlider.value
        hipSlider.value = Math.round(hipSliderIn.value*2.54)
        hipValue.innerHTML = hipSlider.value
        armSlider.value = Math.round(armSliderIn.value*2.54)
        armValue.innerHTML = armSlider.value
        legSlider.value = Math.round(legSliderIn.value*2.54)
        legValue.innerHTML = legSlider.value
    }
}
function logout() {
    localStorage.clear()
    localStorage.setItem('isShopsiLoggedIn', false)
    window.location.href = "popup.html";
}
function edit() {
    getSizeForm.style.display = 'none';
    getMesForm.style.display = 'block';
    toggle.style.display = 'block';
}

// assign cm slider value to number
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

// assign in slider value to number
bustSliderIn.oninput = function () {
    bustValueIn.innerHTML = bustSliderIn.value;
}
neckSliderIn.oninput = function () {
    neckValueIn.innerHTML = neckSliderIn.value;
}
waistSliderIn.oninput = function () {
    waistValueIn.innerHTML = waistSliderIn.value;
}
hipSliderIn.oninput = function () {
    hipValueIn.innerHTML = hipSliderIn.value;
}
armSliderIn.oninput = function () {
    armValueIn.innerHTML = armSliderIn.value;
}
legSliderIn.oninput = function () {
    legValueIn.innerHTML = legSliderIn.value;
}


//Size Recommend Algo
function between(x, min, max) {
    return x >= min && x <= max;
}
function getManTopSizeRecommend() {
    if (
        between(getMeasure['Bust/Chest'], 78, 86) &&
        between(getMeasure['Waist'], 66, 74) &&
        between(getMeasure['Neckline'], 34, 35)
    ) {
        console.log("XS");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Extra Small (XS)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 86, 94) &&
        between(getMeasure['Waist'], 74, 82) &&
        between(getMeasure['Neckline'], 36, 37)
    ) {
        console.log("S");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Small (S)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 94, 102) &&
        between(getMeasure['Waist'], 82, 90) &&
        between(getMeasure['Neckline'], 38, 39)
    ) {
        console.log("M");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Medium (M)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 102, 110) &&
        between(getMeasure['Waist'], 90, 98) &&
        between(getMeasure['Neckline'], 40, 41)
    ) {
        console.log("L")
        resultTop.innerHTML = 'Your top size recommend: <div id="size"> Large (L)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 110, 118) &&
        between(getMeasure['Waist'], 98, 107) &&
        between(getMeasure['Neckline'], 42, 43)
    ) {
        console.log("XL");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Extra Large (XL)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 118, 126) &&
        between(getMeasure['Waist'], 107, 116) &&
        between(getMeasure['Neckline'], 44, 45)
    ) {
        console.log("XXL");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">2 Extra Large (XXL)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 126, 134) &&
        between(getMeasure['Waist'], 116, 125) &&
        between(getMeasure['Neckline'], 46, 47)
    ) {
        console.log("XXXL");
        resultTop.innerHTML = 'Your top size recommend is <div id="size">3 Extra Large (XXXL)</div>'
    } else {
        console.log('Input the correct size');
        resultTop.innerHTML = 'Unable to provide your size, please edit your measurements'
    }
}

function getWomanTopSizeRecommend() {
    if (
        between(getMeasure['Bust/Chest'], 74, 78) &&
        between(getMeasure['Waist'], 58, 62) &&
        between(getMeasure['Low Hip'], 82, 86) &&
        between(getMeasure['Arm Length'], 58, 59)
    ) {
        console.log("XXS")
        resultTop.innerHTML = 'Your top size recommend: <div id="size">2 Extra Small (XXS)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 78, 82) &&
        between(getMeasure['Waist'], 62, 66) &&
        between(getMeasure['Low Hip'], 86, 90) &&
        between(getMeasure['Arm Length'], 59, 60)
    ) {
        console.log("XS");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Extra Small (XS)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 82, 90) &&
        between(getMeasure['Waist'], 66, 74) &&
        between(getMeasure['Low Hip'], 90, 97) &&
        between(getMeasure['Arm Length'], 59, 60)
    ) {
        console.log("S");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Small (S)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 90, 98) &&
        between(getMeasure['Waist'], 74, 82) &&
        between(getMeasure['Low Hip'], 97, 103) &&
        between(getMeasure['Arm Length'], 60, 60)
    ) {
        console.log("M");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Medium (M)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 98, 107) &&
        between(getMeasure['Waist'], 82, 93) &&
        between(getMeasure['Low Hip'], 103, 110) &&
        between(getMeasure['Arm Length'], 60, 61)
    ) {
        console.log("L")
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Large (L)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 107, 113) &&
        between(getMeasure['Waist'], 93, 105) &&
        between(getMeasure['Low Hip'], 110, 120) &&
        between(getMeasure['Arm Length'], 61, 61)
    ) {
        console.log("XL");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">Extra Large (XL)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 119, 131) &&
        between(getMeasure['Waist'], 105, 117) &&
        between(getMeasure['Low Hip'], 120, 131) &&
        between(getMeasure['Arm Length'], 61, 62)
    ) {
        console.log("XXL");
        resultTop.innerHTML = 'Your top size recommend: <div id="size">2 Extra Large (XXL)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 131, 143) &&
        between(getMeasure['Waist'], 117, 131) &&
        between(getMeasure['Low Hip'], 131, 143) &&
        between(getMeasure['Arm Length'], 62, 62)
    ) {
        console.log("XXXL");
        resultTop.innerHTML = 'Your top size recommend is <div id="size">3 Extra Large (XXXL)</div>'
    } else if (
        between(getMeasure['Bust/Chest'], 143, 155) &&
        between(getMeasure['Waist'], 131, 145) &&
        between(getMeasure['Low Hip'], 143, 155) &&
        between(getMeasure['Arm Length'], 61, 62)
    ) {
        console.log("4XL");
        resultTop.innerHTML = 'Your top size recommend is <div id="size">4 Extra Large (4XL)</div>'
    } else {
        console.log('Input the correct size');
        resultTop.innerHTML = 'Unable to provide your size, please edit your measurements'
    }
}

function getManBottomSizeRecommend() {
    if (
        between(getMeasure['Waist'], 66, 74) &&
        between(getMeasure['Low Hip'], 85, 91) &&
        between(getMeasure['Inseam'], 80, 81)
    ) {
        console.log("XS")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Extra Small (XS)</div>'
    } else if (
        between(getMeasure['Waist'], 74, 82) &&
        between(getMeasure['Low Hip'], 91, 97) &&
        between(getMeasure['Inseam'], 81, 82)
    ) {
        console.log("S")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Small (S)</div>'
    } else if (
        between(getMeasure['Waist'], 82, 90) &&
        between(getMeasure['Low Hip'], 97, 103) &&
        between(getMeasure['Inseam'], 82, 83)
    ) {
        console.log("M")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Medium (M)</div>'
    } else if (
        between(getMeasure['Waist'], 90, 98) &&
        between(getMeasure['Low Hip'], 103, 109) &&
        between(getMeasure['Inseam'], 83, 84)
    ) {
        console.log("L")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Large (L)</div>'
    } else if (
        between(getMeasure['Waist'], 98, 107) &&
        between(getMeasure['Low Hip'], 109, 115) &&
        between(getMeasure['Inseam'], 84, 85)
    ) {
        console.log("XL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Extra Large (XL)</div>'
    } else if (
        between(getMeasure['Waist'], 107, 116) &&
        between(getMeasure['Low Hip'], 115, 121) &&
        between(getMeasure['Inseam'], 85, 86)
    ) {
        console.log("XXL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">2 Extra Large (XXL)</div>'
    } else if (
        between(getMeasure['Waist'], 116, 125) &&
        between(getMeasure['Low Hip'], 121, 127) &&
        between(getMeasure['Inseam'], 86, 87)
    ) {
        console.log("3XL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">3 Extra Large (XXXL)</div>'
    } else {
        console.log('Input the correct size');
        resultBottom.innerHTML = 'Unable to provide your size, please edit your measurements'
    }
}

function getWomanBottomSizeRecommend() {
    if (
        between(getMeasure['Waist'], 58, 62) &&
        between(getMeasure['Low Hip'], 82, 86) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("XXS")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">2 Extra Small (XXS)</div>'
    } else if (
        between(getMeasure['Waist'], 62, 66) &&
        between(getMeasure['Low Hip'], 86, 90) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("XS")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Extra Small (XS)</div>'
    } else if (
        between(getMeasure['Waist'], 66, 74) &&
        between(getMeasure['Low Hip'], 90, 97) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("S")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Small (S)</div>'
    } else if (
        between(getMeasure['Waist'], 74, 82) &&
        between(getMeasure['Low Hip'], 97, 103) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("M")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Medium (M)</div>'
    } else if (
        between(getMeasure['Waist'], 82, 93) &&
        between(getMeasure['Low Hip'], 103, 110) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("L")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Large (L)</div>'
    } else if (
        between(getMeasure['Waist'], 93, 105) &&
        between(getMeasure['Low Hip'], 110, 120) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("XL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">Extra Large (XL)</div>'
    } else if (
        between(getMeasure['Waist'], 105, 117) &&
        between(getMeasure['Low Hip'], 120, 131) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("XXL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">2 Extra Large (XXL)</div>'
    } else if (
        between(getMeasure['Waist'], 117, 131) &&
        between(getMeasure['Low Hip'], 131, 143) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("3XL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">3 Extra Large (XXXL)</div>'
    } else if (
        between(getMeasure['Waist'], 131, 145) &&
        between(getMeasure['Low Hip'], 143, 155) &&
        between(getMeasure['Inseam'], 78, 78)
    ) {
        console.log("4XL")
        resultBottom.innerHTML = 'Your bottom size recommend: <div id="size">4 Extra Large (4XL)</div>'
    } else {
        console.log('Input the correct size');
        resultBottom.innerHTML = 'Unable to provide your size, please edit your measurements'
    }
}