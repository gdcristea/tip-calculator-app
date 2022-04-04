const billField = document.getElementById("bill-amount");
const btnTip = document.querySelectorAll(".btn-tip");
const customTip = document.getElementById("insert-amount");
const peopleField = document.getElementById("people-number");
const error = document.getElementById("error");
const resultTipAmount = document.getElementById("price-tip");
const resultTotalAmount = document.getElementById("price-total");
const resetBtn = document.querySelector(".reset-btn");

billField.addEventListener("input", setBillValue);
btnTip.forEach(btn => {
    btn.addEventListener("click", selectBtn);
});
customTip.addEventListener("input", setCustomTipValue);
peopleField.addEventListener("input", setPeopleValue);
resetBtn.addEventListener("click", reset);

let billValue = 0.0;//default value
let tipValue = 0.15;//default value ->15% button is active
let peopleValue = 1;


function setBillValue() {
    if (billField.value.includes(",")) {
        billField.value = billField.value.replace(",", ".");
    }

    billValue = parseFloat(billField.value);

    calculateTip();
}

function selectBtn(event) {

    btnTip.forEach(btn => {
        btn.classList.remove("btn-selected");

        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add("btn-selected");

            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    customTip.value = "";

    calculateTip();
}

function setCustomTipValue() {
    if (customTip.value.includes(",")) {
        customTip.value = customTip.value.replace(",", ".");
    }

    tipValue = parseFloat(customTip.value)/100;

    btnTip.forEach(btn => {
        btn.classList.remove("btn-selected");
    });

    if (customTip.value !== "") {
        calculateTip();
    }
}

function setPeopleValue() {
    if (peopleField.value.includes(",")) {
        peopleField.value = peopleField.value.replace(",", ".");
    }

    peopleValue = parseFloat(peopleField.value);

    if (peopleValue <= 0) {
        error.style.display = "block";
        setTimeout(function(){
            error.style.display = "none"
        }, 5000);
    }

    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue)/peopleValue;
        let total = (billValue * (tipValue + 1))/peopleValue;
        resultTipAmount.innerHTML = "$" + tipAmount.toFixed(2);
        resultTotalAmount.innerHTML = "$" + total.toFixed(2);
    }
}

function reset() {
    billField.value = "0.0";
    setBillValue();

    peopleField.value = "1";
    setPeopleValue();

    btnTip[2].click();
}
