// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

// Stopwatch variables
let startTime;
let elapsed = 0;
let timer;
let running = false;

// Format time
function formatTime(ms) {
    const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update display
function refreshDisplay() {
    timeDisplay.textContent = formatTime(elapsed);
}

// Start or stop the stopwatch
function toggleStartStop() {
    if (running) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsed;
        timer = setInterval(() => {
            elapsed = Date.now() - startTime;
            refreshDisplay();
        }, 10);
        startStopButton.textContent = 'Stop';
    }
    running = !running;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
    elapsed = 0;
    refreshDisplay();
    running = false;
    lapList.innerHTML = '';
}

// Record a lap
function recordLap() {
    if (running) {
        const lapTime = formatTime(elapsed);
        const lapEntry = document.createElement('li');
        lapEntry.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
        lapList.prepend(lapEntry);
    }
}

// Event listeners
startStopButton.addEventListener('click', toggleStartStop);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
