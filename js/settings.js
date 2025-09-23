document.addEventListener("DOMContentLoaded", () => {

    const darkBtn = document.getElementById("dark-theme");
    const lightBtn = document.getElementById("light-theme");
    const darkVid = document.getElementById("bg-video-dark");
    const lightVid = document.getElementById("bg-video-light");

    function applyTheme(theme) {
        document.body.classList.remove("theme-dark", "theme-light");
        document.body.classList.add(theme);

        if(theme === "theme-dark") {
            darkVid.style.display = "block";
            darkVid.play();
            lightVid.pause();
            lightVid.style.display = "none";
        } else {
            lightVid.style.display = "block";
            lightVid.play();
            darkVid.pause();
            darkVid.style.display = "none";
        }
    }

    // set theme 
    if(darkBtn) {
        darkBtn.addEventListener("click", () => {
            localStorage.setItem("theme", "theme-dark");
            alert("🌑 Dark theme selected! Go back to Home lol");
        });
    }

    if(lightBtn) {
        lightBtn.addEventListener("click", () => {
            localStorage.setItem("theme", "theme-light");
            alert("🌕 Light theme selected! Back to Home now");
        });
    }

    // load saved theme or default dark
    const savedTheme = localStorage.getItem("theme") || "theme-dark";
    applyTheme(savedTheme);

    // experimenting on this code, still trying tho
    document.querySelectorAll(".bg-video").forEach(video => {
        video.addEventListener("timeupdate", () => {
            if(video.currentTime >= video.duration - 0.05) {
                video.currentTime = 0.01; 
                video.play();
            }
        });
    });

});
