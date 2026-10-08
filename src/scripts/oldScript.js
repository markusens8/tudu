let state = JSON.parse(localStorage.getItem("tudu")) || {projects: [], currentProjectId: null};















let tasks = JSON.parse(localStorage.getItem("mansProjekts")) || [];
const taskList = document.getElementById("task-list");

function changeTemplate(template) {
    const temp = document.getElementById(template);
    const clone = temp.content.cloneNode(true);
    document.body.appendChild(clone);
}

const checkTaskValidity = (title, desc) => title != "" || desc != "";

function createTask(task) {
    if (checkTaskValidity(task.title, task.desc)) {
        tasks.push({"title": task.title, "desc": task.desc, "date": task.date, "priority": task.priority});
        loadTasks();
    }
    else
        alert("Ievadi uzdevuma nosaukumu vai aprakstu!");
    
}

function deleteTask(li, task) {
    li.remove();
    tasks.splice(tasks.indexOf(task), 1);
}

function loadTasks() {
    taskList.replaceChildren();
    for (const task of tasks) {
        const li = document.createElement("li");
    
        const title = document.createElement("h2");
        title.textContent = task.title;

        const desc = document.createElement("p");
        desc.textContent = task.desc;

        const date = document.createElement("p");
        date.textContent = "termiņš: " + task.date;

        const priority = document.createElement("p");
        priority.textContent = "prioritāte: " + task.priority;

        const button = document.createElement("button");
        button.textContent = "dzest";
        button.addEventListener("click", () => deleteTask(li, task));

        taskList.appendChild(li);
        li.appendChild(title); li.appendChild(desc); li.appendChild(date); li.appendChild(priority); li.appendChild(button);
    }
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        localStorage.clear();
        localStorage.setItem("mansProjekts", JSON.stringify(tasks));
    }
});

loadTasks();