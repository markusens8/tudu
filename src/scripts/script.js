let state = JSON.parse(localStorage.getItem("tudu")) || {projects: [], currentProjectId: null};
const currentProject = () => state.projects.find(p => p.id === state.currentProjectId);

function commit() {
    localStorage.setItem("tudu", JSON.stringify(state));
    render();
}


function createProject() {
    const title = document.querySelector("input").value;
    console.log("Project title ");
    state.projects.push({id: crypto.randomUUID(), title, tasks: []})
    commit()
}

function createTask(data) {
    currentProject.tasks.push({id: crypto.randomUUID, ...data});
    commit();
}

function deleteProject() {

}

function deleteTask(id) {
    const p = currentProject();
    p.tasks = p.tasks.filter(t => t.id != id);
    commit();
}

function openProject(id) {
    state.currentProjectId = id;
    commit();
}

function render() {
    const view = state.currentProjectId ? "tasks" : "projects";
    const app = document.getElementById("app");
    app.replaceChildren(document.getElementById(view).content.cloneNode(true));
    (view === "projects" ? renderProjects : renderTasks)(app);
}

function renderProjects(root) {
    let projectList = root.querySelector("ul");
    for (const project of state.projects) {
        const li = document.createElement("li");

        const button = document.createElement("button");
        button.textContent = project.title;
        button.addEventListener("click", () => openProject(project.id));

        li.appendChild(button);
        projectList.appendChild(li);
    }
}

function renderTasks(root) {
    let taskList = root.querySelector("ul");
    const currentProject = currentProject();
    for (const task of currentProject.tasks) {
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
        button.addEventListener("click", () => deleteTask(task.id));
        
        li.appendChild(title); li.appendChild(desc); li.appendChild(date); li.appendChild(priority); li.appendChild(button);
        taskList.appendChild(li);
    }
}

render();