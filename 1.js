let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.querySelector('.display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lap-times');

function formatTime(time) {
    let date = new Date(time);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    startStopButton.textContent = 'Stop';
    isRunning = true;
}

function stop() {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    isRunning = false;
}

function reset() {
    stop();
    elapsedTime = 0;
    updateDisplay();
    lapTimes.innerHTML = '';
}

function lap() {
    if (isRunning) {
        let li = document.createElement('li');
        li.textContent = formatTime(elapsedTime);
        lapTimes.appendChild(li);
    }
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stop();
    } else {
        start();
    }
});

resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

updateDisplay();
