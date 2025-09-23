// cursor.js 

document.addEventListener("DOMContentLoaded", () => {

    let cursor = document.querySelector(".cursor");
    let cImg = document.getElementById("cursor");

    if (!cursor || !cImg) return;

    document.body.style.cursor = "none"; // hide default
    document.addEventListener("mousemove", e => {
        cursor.style.top = e.clientY + "px";
        cursor.style.left = e.clientX + "px";
    });

    // change cursor image depending on state
    function setCursor(state) {
        switch(state) {
            case "Idle":
                cImg.src = "../assets/cursor_icon/Idle.png";
                break;
            case "Click":
                cImg.src = "../assets/cursor_icon/Click.gif";
                break;
            case "Loading":
                cImg.src = "../assets/cursor_icon/Loading.gif";
                break;
            case "Typing":
                cImg.src = "../assets/cursor_icon/Typing.png";
                break;
            default:
                cImg.src = "../assets/cursor_icon/Idle.png";
        }
    }

    // idle
    setCursor("Idle");

    // click anim
    document.addEventListener("mousedown", () => setCursor("Click"));
    document.addEventListener("mouseup", () => setCursor("Idle"));

    // typing anim, still in development
    document.querySelectorAll("input, textarea").forEach(el => {
        el.addEventListener("focus", () => setCursor("Typing"));
        el.addEventListener("blur", () => setCursor("Idle"));
    });

    // loading cursor anim, still in development
    window.startLoadingCursor = function(time=2500) {
        setCursor("Loading");
        setTimeout(() => setCursor("Idle"), time);
    };

});
