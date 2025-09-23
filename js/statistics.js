// statistics.js

function loadStats() {

    let sessionsCompleted = parseInt(localStorage.getItem("sessionsCompleted")) || 0;
    let shortBreaks = parseInt(localStorage.getItem("shortBreaks")) || 0;
    let longBreaks = parseInt(localStorage.getItem("longBreaks")) || 0;
    let totalStudyTime = parseInt(localStorage.getItem("totalStudyTime")) || 0; // in seconds
    let exp = parseInt(localStorage.getItem("exp")) || 0;

    let minutes = Math.floor(totalStudyTime / 60);
    let displayMins = minutes; //minutes?

    // stats object...
    let stats = {
        "stat-sessions": sessionsCompleted,
        "stat-short-breaks": shortBreaks,
        "stat-long-breaks": longBreaks,
        "stat-time": displayMins,
        "stat-exp": exp
    };

    for (let id in stats) {
        let el = document.getElementById(id); // grab element
        if(el){
            el.textContent = stats[id];
        }
    }

   //will updata exp if exists
    let expBar = document.getElementById("exp-bar");
    if(expBar){
        let widthExp = exp; //var??
        expBar.style.width = widthExp + "%";
        expBar.textContent = widthExp + "% EXP";
        console.log("[loadStats] EXP updated ->", widthExp); //minor debug remove later
    }
}

document.addEventListener("DOMContentLoaded", loadStats);
