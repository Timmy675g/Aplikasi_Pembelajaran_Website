document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // load saved tasks or empty array lol
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    renderTasks(); // first render

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => { if(e.key === "Enter") addTask(); });

    // ------------------------
    // main functions
    // ------------------------
    function addTask() {
        let text = taskInput.value.trim(); // trim spaces
        if(!text) return; 
        tasks.push({ text: text, done: false }); // push new task
        console.log("[addTask] added:", text); // debug something
        saveTasks(); renderTasks(); // re-render, save
        taskInput.value = ""; // clear input
    }

    function toggleTask(idx) {
        tasks[idx].done = !tasks[idx].done;
        console.log("toggled task", idx, "done?", tasks[idx].done); // log
        saveTasks(); renderTasks(); // render after toggle
    }

    function deleteTask(idx) {
        console.log("[deleteTask] removing:", tasks[idx].text);
        tasks.splice(idx, 1); 
        saveTasks(); 
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = ""; // clear old
        for(let i=0; i<tasks.length; i++) {
            let t = tasks[i]; // temp var humans leave
            const li = document.createElement("li");

            // checkbox
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.checked = t.done;
            cb.addEventListener("change", () => toggleTask(i));

            // span for text
            const sp = document.createElement("span");
            sp.textContent = t.text;
            if(t.done) sp.style.textDecoration = "line-through";

            // delete button
            const del = document.createElement("button");
            del.textContent = "🗑️";
            del.style.marginLeft = "auto";
            del.onclick = function(){ deleteTask(i); };

            li.appendChild(cb); li.appendChild(sp); li.appendChild(del);
            taskList.appendChild(li);
            // random comment humans leave: li added
        }
        console.log("[renderTasks] rendered", tasks.length, "tasks"); // debug log
    }

});
