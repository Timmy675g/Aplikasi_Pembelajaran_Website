// achievements.js 

async function loadAchievements() {
    let res = await fetch("pencapaian_json.json");
    let achievements = await res.json();

    let saveData = JSON.parse(localStorage.getItem("pencapaian_save"));
    if(!saveData) {
        saveData = { unlocked: [], exp: 0 };
        localStorage.setItem("pencapaian_save", JSON.stringify(saveData));
    }

    const container = document.getElementById("achievements");
    container.innerHTML = ""; 

    achievements.forEach((ach) => {

        const div = document.createElement("div");
        div.classList.add("achievement-card");

        if(!saveData.unlocked.includes(ach.id)) div.classList.add("locked"); // still locked

        div.innerHTML = `
            <img src="${ach.icon}" alt="icon">
            <strong>${ach.name}</strong>
            <p>${ach.desc}</p>
        `;

        container.appendChild(div);
    });
    updateExpBar(saveData.exp);
}

function unlockAchievement(id) {

    let saveData = JSON.parse(localStorage.getItem("pencapaian_save"));

    if(!saveData.unlocked.includes(id)) {

        saveData.unlocked.push(id);
        saveData.exp += 20; 
        localStorage.setItem("pencapaian_save", JSON.stringify(saveData));

        showPopup("🏆 Achievement unlocked! Go you!");
        loadAchievements(); 
    }
}

function showPopup(msg) {

    const popup = document.getElementById("popup");
    popup.textContent = msg;
    popup.style.display = "block";

    //reset anim
    popup.classList.remove("animate");
    void popup.offsetWidth;
    popup.classList.add("animate");

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000); //3000ms
}

// update the exp bar
function updateExpBar(exp) {
    const bar = document.getElementById("exp-bar");

    let percent = Math.min(exp % 100, 100); 
    bar.style.width = percent + "%";
    bar.textContent = percent + "%"; 
}

// run when page opens
window.onload = loadAchievements;
