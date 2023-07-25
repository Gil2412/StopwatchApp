//Variables
let hoursDisplay = document.querySelector("#hoursDisplay");
let minutesDisplay = document.querySelector("#minutesDisplay");
let secondsDisplay = document.querySelector("#secondsDisplay");
let millisecondsDisplay = document.querySelector("#millisecondsDisplay");
let [millisecond, seconds, minutes, hours] = [0, 0, 0, 0]
let int = null
let counter = 0
let firstScroll = true
let loopContainer = document.querySelector(".loopContainer");
const timerContainer = document.querySelector(".timerContainer")
const timerBody = document.querySelector(".timerBody")
const switcher = document.querySelector(".switcher");
const moon = document.querySelector(".bi-moon-fill");
const sun = document.querySelector(".bi-sun-fill");
const screen = document.querySelector(".screen");
const buttonsContainer = document.querySelector(".buttonsContainer")
const erase = document.querySelector("#erase");
const btn = document.querySelectorAll(".btn");
const start = document.querySelector("#start");

//"Dark" mode adjustment
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    timerContainer.classList.toggle("dark")
    timerBody.classList.toggle("dark")
    switcher.classList.toggle("dark")
    screen.classList.toggle("dark")
    buttonsContainer.classList.toggle("dark")
    start.classList.toggle("dark")
    loopContainer.classList.toggle("dark")
    moon.classList = "bi-sun-fill"
    moon.classList.toggle("dark")
}

//Button events
btn.forEach((item) => {
    item.onclick = () => {
        if (item.innerHTML == "Start") {
            if (int !== null) {
                clearInterval(int);
            }
            onPauseBtn()
            clearInterval(int);
            int = setInterval(timer, 10);
        } else if (item.innerHTML == "Pause") {
            onStartBtn()
            clearInterval(int);
        } else if (item.id == "loop" && screen.innerHTML != "00:00:00:000") {
            let loopLine = document.createElement('li')
            let screenValue = "." + "  " + screen.innerHTML
            loopLine.innerHTML = screenValue
            loopLine.classList = "loopInt"
            loopLine.style.fontFamily = "Poppins"
            loopContainer.appendChild(loopLine)
            scrollLeft()
        } else if (item.id == "reset") {
            onStartBtn()
            clearInterval(int);
            [millisecond, seconds, minutes, hours] = [0, 0, 0, 0]
            firstScroll = true
            counter = 0
            screen.innerHTML = "00:00:00:000"
            loopContainer.innerHTML = ""
        }
    }
})

function timer() {
    millisecond += 10
    seconds = millisecond == 1000 ? (seconds + 1) % 60 : seconds;
    minutes = seconds == 0 && millisecond == 1000 ? (minutes + 1) % 60 : minutes
    hours = minutes == 0 && seconds == 0 && millisecond == 1000 ? (hours + 1) : hours
    millisecond = millisecond == 1000 ? 0 : millisecond

    millisecondsDisplay = String(millisecond).padStart(3, "0")
    secondsDisplay = String(seconds).padStart(2, "0")
    minutesDisplay = String(minutes).padStart(2, "0")
    hoursDisplay = String(hours).padStart(2, "0")

    screen.innerHTML = hoursDisplay + ":" + minutesDisplay + ":" + secondsDisplay + ":" + millisecondsDisplay
}

//Design functions 
function onPauseBtn() {
    start.innerHTML = "Pause"
    start.style.fontWeight = "bold";
    start.style.scale = "1.3";
}
function onStartBtn() {
    start.innerHTML = "Start"
    start.style.fontWeight = "bold";
    start.style.scale = "1";
}

function scrollLeft() {
    counter += 1
    if (counter == 17 && firstScroll) {
        loopContainer.scrollLeft = loopContainer.scrollWidth;
        counter = 0
        firstScroll = false
    }
    if (counter == 4 && firstScroll == false) {
        loopContainer.scrollLeft = loopContainer.scrollWidth;
        counter = 0
    }
}

//Dark theme
switcher.onclick = () => {
    timerContainer.classList.toggle("dark")
    timerBody.classList.toggle("dark")
    switcher.classList.toggle("dark")
    screen.classList.toggle("dark")
    buttonsContainer.classList.toggle("dark")
    start.classList.toggle("dark")
    loopContainer.classList.toggle("dark")

    if (moon.classList == "bi-sun-fill dark") {
        moon.classList = "bi-moon-fill"
    } else if (moon.classList == "bi-moon-fill") {
        moon.classList = "bi-sun-fill dark"
    }
}
