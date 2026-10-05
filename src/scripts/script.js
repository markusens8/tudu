import tasks from "./data.json" with { type:"json" };

let data = [];
const taskList = document.getElementById("task-list");

function changeTemplate(template) {
    const temp = document.getElementById(template);
    const clone = temp.content.cloneNode(true);
    document.body.appendChild(clone);
}

function loadTasks() {
    for (const task of tasks) {
        createTask(task);
    }
}

// this formats the form data into an object for the task creator
function processTask(form) {
    createTask(Object.fromEntries(new FormData(form)));
}

function createTask(task) {
    if (task.title == "" || task.desc == "") {
        alert("ievadi uzdevumu");
        return;
    }

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
    button.addEventListener("click", () => deleteTask(li, task.title));

    taskList.appendChild(li);
    li.appendChild(title); li.appendChild(desc); li.appendChild(date); li.appendChild(priority); li.appendChild(button); 
    data.push({"title": task.title, "desc": task.desc, "date": task.date, "priority": task.priority});
}

function deleteTask(li, title) {
    li.remove();
    for ()
}

loadTasks();