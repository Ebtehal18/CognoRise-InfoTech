// selecting elements
const calcBtn = document.querySelector(".btn-calc");
const resetBtn = document.querySelector(".btn-reset");
const stopBtn = document.querySelector(".btn-stop");
const alertBox = document.querySelector(".alert");

const day = document.querySelector(".day");
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

const date = document.querySelector(".date");
const time = document.querySelector(".time");
let interval;


// btn function => calc
function calcInterval() {
    const dateVal = date.value;
    const timeVal = time.value;
    const endDate = new Date(`${dateVal} ${timeVal}`); 

    if (!dateVal || !timeVal) {
      
        showAlert("Please enter both date and time.");
        resetTimeDisplay(); 
        return
    }
    else if (endDate < new Date()) {
       
        showAlert("Please enter a date that is not in the past.");
        resetTimeDisplay();
        return
    }

    hideAlert();

    interval = setInterval(() => {
        calcDate(endDate);
    }, 1000);
}
// setinterval
function calcDate(endDate) {
    const currentDate = new Date();
    const diffTime = (endDate - currentDate) / 1000;

    if (diffTime <= 0) {
        clearInterval(interval);
        resetTimeDisplay();
        showAlert("The countdown has ended.");
       
        return
    }
   
    day.innerHTML = Math.floor(diffTime / (24 * 60 * 60));
    hour.innerHTML = Math.floor((diffTime / (60 * 60)) % 24);
    minute.innerHTML = Math.floor((diffTime / 60) % 60);
    second.innerHTML = Math.floor(diffTime % 60);
}


function showAlert(message) {

    alertBox.classList.remove("d-none");
    alertBox.innerText = message;
}

function hideAlert() {
    alertBox.classList.add("d-none");
}

function resetTimeDisplay() {
    day.innerHTML = 0;
    hour.innerHTML = 0;
    minute.innerHTML = 0;
    second.innerHTML = 0;
}

calcBtn.addEventListener("click", function (e) {
    e.preventDefault();
    calcInterval();
});

resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearInterval(interval); 
    hideAlert();
    resetTimeDisplay(); 
});

stopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearInterval(interval); 
});
