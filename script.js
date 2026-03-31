const RANDOM_QUOTES = [
    "Pendidikan adalah senjata paling mematikan di dunia, karena dengan itu Anda bisa mengubah dunia.",
    "Kegagalan hanya terjadi bila kita menyerah.",
    "Bangsa yang besar adalah bangsa yang menghormati jasa pahlawannya.",
    "Jangan bertanya apa yang negara berikan kepadamu, tapi tanyalah apa yang kamu berikan kepada negaramu."
];

const displayElement = document.getElementById('quote-display');
const inputElement = document.getElementById('quote-input');
const wpmElement = document.getElementById('wpm');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');

let startTime;
let interval;

function startRace() {
    const randomIdx = Math.floor(Math.random() * RANDOM_QUOTES.length);
    const quote = RANDOM_QUOTES[randomIdx];
    
    // Pecah teks menjadi span untuk styling warna per karakter
    displayElement.innerHTML = '';
    quote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        displayElement.appendChild(span);
    });

    inputElement.value = null;
    inputElement.disabled = false;
    inputElement.focus();
    
    startTimer();
    startBtn.disabled = true;
}

inputElement.addEventListener('input', () => {
    const arrayQuote = displayElement.querySelectorAll('span');
    const arrayValue = inputElement.value.split('');
    let done = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            done = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.remove('correct');
            characterSpan.classList.add('incorrect');
            done = false;
        }
    });

    if (done) finishRace();
});

function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    interval = setInterval(() => {
        timerElement.innerText = Math.floor((new Date() - startTime) / 1000);
        calculateWPM();
    }, 1000);
}

function calculateWPM() {
    const timeInMinutes = (new Date() - startTime) / 60000;
    const wordsTyped = inputElement.value.trim().split(/\s+/).length;
    if (timeInMinutes > 0) {
        wpmElement.innerText = Math.round(wordsTyped / timeInMinutes);
    }
}

function finishRace() {
    clearInterval(interval);
    inputElement.disabled = true;
    startBtn.disabled = false;
    alert("Balapan Selesai! Skor WPM Anda: " + wpmElement.innerText);
}

startBtn.addEventListener('click', startRace);