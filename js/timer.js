let timer;
let waktusisa = 25*60; //PLEASE CHANGE THIS INTO 25*60 ON PROD
let isRunning = false; 
let currentSession = "study"; 

let sessionsCompleted = parseInt(localStorage.getItem("sessionsCompleted")) || 0;
let shortBreaks = parseInt(localStorage.getItem("shortBreaks")) || 0;
let longBreaks = parseInt(localStorage.getItem("longBreaks")) || 0;
let totalStudyTime = parseInt(localStorage.getItem("totalStudyTime")) || 0;
let exp = parseInt(localStorage.getItem("exp")) || 0; 
const expMax = 100; 

const display = document.getElementById("display-waktu");
const mulai = document.getElementById("mulai");
const berhenti = document.getElementById("berhenti");
const ulang = document.getElementById("ulang");
const istirahat_singkat = document.getElementById("istirahat-singkat");
const istirahat_panjang = document.getElementById("istirahat-panjang");
const expBar = document.getElementById("exp-bar");

const notificationSound = new Audio('../assets/sound/notification.mp3'); 
console.log("[init] vars & DOM ready, EXP:", exp); 

function updateDisplay() {
    let menit = Math.floor(waktusisa / 60);
    let detik = waktusisa % 60; 
    if(detik < 10) detik = "0"+detik; 
    if(menit < 10) menit = "0"+menit; 
    display.textContent = menit + ":" + detik; 
    console.log("[updateDisplay] now showing:", menit+":"+detik); 
}

function showNotification(message) {
    const popup = document.createElement("div");
    popup.className = "popup-notification";
    popup.textContent = message;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
}

function saveStats() {
    localStorage.setItem("sessionsCompleted", sessionsCompleted);
    localStorage.setItem("shortBreaks", shortBreaks);
    localStorage.setItem("longBreaks", longBreaks);
    localStorage.setItem("totalStudyTime", totalStudyTime);
    localStorage.setItem("exp", exp);
}

function gainExp(amount) {
    exp += amount;
    if (exp > expMax) exp = expMax;

    expBar.style.width = `${exp}%`;
    expBar.textContent = `${exp}% EXP`;
    saveStats();
}

function updateStats() {
    const stats = {
        "stat-sessions": sessionsCompleted,
        "stat-short-breaks": shortBreaks,
        "stat-long-breaks": longBreaks,
        "stat-time": Math.floor(totalStudyTime / 60),
        "stat-exp": exp
    };

    for (const id in stats) {
        const el = document.getElementById(id);
        if (el) el.textContent = stats[id];
    }
}

function startTimer() {
    if(isRunning){
        console.warn("[startTimer] timer already running bro");
        return;
    }
    isRunning = true;
    console.log("[startTimer] starting session:", currentSession);

    timer = setInterval(function() {
        if(waktusisa > 0){
            waktusisa--;
            if(currentSession === "study") totalStudyTime++;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            timerFinished();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    console.log("[stopTimer] stopped at", waktusisa, "sec left"); // debug
}

function resetTimer() {
    stopTimer();
    currentSession = "study";
    waktusisa = 25*60; 
    console.log("[resetTimer] back to 25 min study mode"); 
    updateDisplay();
}

function istirahatSingkat() {
    stopTimer();
    currentSession = "short_break";
    waktusisa = 5*60;
    console.log("[shortBreak] 5 min chill mode");
    updateDisplay();
}

function istirahatPanjang() {
    stopTimer();
    currentSession = "long_break";
    waktusisa = 15*60;
    console.log("[longBreak] 15 min relax mode");
    updateDisplay();
}

function timerFinished() {
    notificationSound.play();
    console.log("[timerFinished] session ended:", currentSession);

    if(currentSession === "study") {
        sessionsCompleted++;
        gainExp(25);
        console.log("Gained 25 EXP, total now:", exp);

        let nextBreak;
        if(sessionsCompleted % 4 === 0){
            nextBreak = "long_break";
        } else {
            nextBreak = "short_break";
        }

        currentSession = nextBreak;
        waktusisa = (nextBreak === "long_break") ? 15*60 : 5*60;

        if(nextBreak === "long_break") longBreaks++;
        else shortBreaks++;

        showNotification("Belajar selesai! Saatnya " + ((nextBreak==="long_break")?"Istirahat Panjang":"Istirahat Singkat") + "!");
    } else {
        currentSession = "study";
        waktusisa = 25*60;
        showNotification("Istirahat selesai! Kembali belajar!");
    }

    saveStats();
    updateStats();
    updateDisplay();
    startTimer();
}

mulai.addEventListener("click", startTimer);
berhenti.addEventListener("click", stopTimer);
ulang.addEventListener("click", resetTimer);
istirahat_singkat.addEventListener("click", istirahatSingkat);
istirahat_panjang.addEventListener("click", istirahatPanjang);

updateDisplay();
updateStats();
gainExp(0);
