// tutorial.js

const DEV_MODE = true; // remember to turn false in prod later

let step = 0;
let chatContainer;
let tutorialWrapper;
let skipBtn;

const tutorialSteps = [
    { message: "Click this button to start your Pomodoro timer!", highlightSelector: "#tombol-mulai", requireClick: true },
    { message: "Here you can change your settings.", highlightSelector: "#settingsBtn", requireClick: false },
    { message: "Check your achievements here.", highlightSelector: "a[href='html/achievements.html']", requireClick: false },
    { message: "View your statistics here.", highlightSelector: "a[href='html/statistics.html']", requireClick: false },
    { message: "This is your profile icon.", highlightSelector: "#profil", requireClick: false },
    { message: "Good luck and happy studying!", highlightSelector: null, requireClick: false }
];

document.addEventListener('DOMContentLoaded', () => {

    // grab the elements once
    chatContainer = document.getElementById('chatContainer');
    tutorialWrapper = document.getElementById('tutorialWrapper');
    skipBtn = document.getElementById('skipTutorialBtn');

    // check if user has seen tutorial
    let firstTime = localStorage.getItem("firstTimeUser");
    let savedStep = localStorage.getItem("tutorialStep");

    // force tutorial for DEV_MODE or first time
    if (DEV_MODE || !firstTime) {
        step = savedStep ? parseInt(savedStep) : 0;

        if (tutorialWrapper) {
            tutorialWrapper.style.display = 'flex'; // show tutorial
        }

        showTutorialStep(step);

        if (!DEV_MODE) {
            localStorage.setItem('firstTimeUser', 'true'); // mark as seen
        }
    } else {
        if (tutorialWrapper) tutorialWrapper.style.display = 'none';
    }

    // attach skip button listener
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            step = tutorialSteps.length; // jump to end
            localStorage.setItem("tutorialStep", step);
            if (tutorialWrapper) tutorialWrapper.style.display = 'none';
            document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
        });
    }

});

function addBubble(sender, text){

    if(!chatContainer) return; 

    chatContainer.innerHTML = ''; // remove previous bubble, too messy 

    let bubble = document.createElement('div');
    bubble.classList.add('chatBubble');
    bubble.innerText = text;

    if(sender === 'Guide'){
        bubble.style.background = '#fff';
    } else {
        bubble.style.background = '#d1e7ff';
    }

    chatContainer.appendChild(bubble);

    setTimeout(()=>{bubble.classList.add('show');},50);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTutorialStep(stepIndex){
    console.log("[Tutorial] showing step:", stepIndex); // debug 

    if(stepIndex >= tutorialSteps.length){
        if(tutorialWrapper) tutorialWrapper.style.display = 'none';
        document.querySelectorAll('.highlight').forEach(el=>el.classList.remove('highlight'));
        localStorage.setItem("tutorialStep", stepIndex);
        return;
    }

    let stepObj = tutorialSteps[stepIndex];
    addBubble('Guide', stepObj.message);

    document.querySelectorAll('.highlight').forEach(el=>el.classList.remove('highlight'));

    let clickableElementExists = false;
    if(stepObj.highlightSelector){
        let el = document.querySelector(stepObj.highlightSelector);
        let tempEl = el; //Vars??
        if(el){
            el.classList.add('highlight');
            clickableElementExists = true;

            if(stepObj.requireClick){
                el.addEventListener('click', nextStepOnce, { once: true });
            }
        }
    }

    if(!clickableElementExists || !stepObj.requireClick){
        chatContainer.addEventListener('click', nextStepOnce, { once: true });
    }
}

function nextStepOnce(){
    step++;
    localStorage.setItem("tutorialStep", step);
    showTutorialStep(step);
}

if(skipBtn){
    skipBtn.addEventListener('click', ()=>{
        step = tutorialSteps.length;
        localStorage.setItem("tutorialStep", step);
        if(tutorialWrapper) tutorialWrapper.style.display = 'none';
        document.querySelectorAll('.highlight').forEach(el=>el.classList.remove('highlight'));
        console.log("[Tutorial] skipped again lol"); 
    });
}
