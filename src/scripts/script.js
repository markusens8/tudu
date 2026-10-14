let state = JSON.parse(localStorage.getItem("tudu")) || {projects: [], currentProjectId: null, view: "home", filter: "all"};
const currentProject = () => state.projects.find(p => p.id === state.currentProjectId); 
const today = () => new Date().toLocaleString('lv-LV');

const screens = {
    home: renderHome,
    projects: renderProjects,
    tasks: renderTasks
};

function commit() {
    localStorage.setItem("tudu", JSON.stringify(state));
    render();
}

function setFilter(value) {
    state.filter = value;
    commit();
}

function navigate(view) {
    state.view = view;
    commit();
}

function openProject(projectId) {
    state.currentProjectId = projectId;
    setFilter("all");
    navigate("tasks");
}

function createProject() {
    const title = document.querySelector("input").value;    
    state.projects.push({id: crypto.randomUUID(), title, tasks: []})
    commit()
}


function deleteProject(id) {
    state.projects = state.projects.filter(p => p.id != id);
    commit();
}

function createTask(data) {    
    currentProject().tasks.push({id: crypto.randomUUID(), done: false, modifiedDate: today(),  ...data});
    commit();
}

function editTask() {

}

function deleteTask(id) {
    const p = currentProject();
    p.tasks = p.tasks.filter(t => t.id != id);
    commit();
}

function toggleDone(task) {
    task.done = !task.done;
    task.modifiedDate = today();
    commit();
}

function render() {
    const app = document.getElementById("app");
    app.replaceChildren(document.getElementById(state.view).content.cloneNode(true));
    screens[state.view](app);
}

function renderHomeUrgentList(root) {
    for (const project of state.projects) 
        for (const task of project.tasks) {
            if (task.priority != "high" || task.done) continue;

            const li = document.createElement("li");
            li.addEventListener("click", () => openProject(project.id));

            const taskTitle = document.createElement("h4");
            taskTitle.textContent = task.title;

            const priority = document.createElement("p");
            priority.textContent = "priority: HIGH!!!!";

            li.append(taskTitle, priority)
            root.appendChild(li);
        }
}

function renderHomeModifiedList(root) {
    const tasks = state.projects
        .flatMap(p => p.tasks)
        .sort((a, b) => b.modifiedDate - a.modifiedDate);

    for (const task of tasks) {
        const li = document.createElement("li");

        const taskTitle = document.createElement("h4");
        taskTitle.textContent = task.title;
        
        const modifiedDate = document.createElement("p");
        modifiedDate.textContent = "pedejoreiz modificets: " + task.modifiedDate;

        li.append(taskTitle, modifiedDate);
        root.appendChild(li);
    }
}

function renderHome(root) {
    renderHomeUrgentList(root.querySelector("#urgent-list")); 
    renderHomeModifiedList(root.querySelector("#modified-list"));
}

function renderProjects(root) {
    var projectList = root.querySelector("ul");
    for (const project of state.projects) {
        const li = document.createElement("li");

        const button = document.createElement("button");
        button.textContent = project.title;
        button.addEventListener("click", () => openProject(project.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "dzēst";
        deleteButton.addEventListener("click", () => deleteProject(project.id));

        li.append(button, deleteButton);
        projectList.appendChild(li);
    }
}

function renderTasks(root) {
    const project = currentProject();
    const taskList = root.querySelector("ul");
    root.querySelector("h1").textContent = project.title;

    let visibleTasks = project.tasks.filter(task => {
        if (state.filter == "done") return task.done;
        if (state.filter == "active") return !task.done;
        return true;
    })
    for (const task of visibleTasks) {
        const li = document.createElement("li");
        
        const title = document.createElement("h3");
        title.textContent = task.title;
        
        const desc = document.createElement("p");
        desc.textContent = task.desc;
        
        const dueDate = document.createElement("p");
        dueDate.textContent = "termiņš: " + task.dueDate;
        
        const priority = document.createElement("p");
        priority.textContent = "prioritāte: " + task.priority;

        const done = document.createElement("p");
        done.textContent = "pabeigts: " + task.done;
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "dzest";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        const editButton = document.createElement("button");
        editButton.textContent = "rediģēt";
        editButton.addEventListener("click", editTask);

        const doneButton = document.createElement("button");
        doneButton.textContent = "done";
        doneButton.addEventListener("click", () => toggleDone(task));
        
        li.append(title, desc, dueDate, priority, done, deleteButton, editButton, doneButton); 
        taskList.appendChild(li);
    }
}

render();