let state = JSON.parse(localStorage.getItem("tudu")) || {projects: [], currentProjectId: null, view: "home"};
const currentProject = () => state.projects.find(p => p.id === state.currentProjectId);
const today = new Date();

function commit() {
    localStorage.setItem("tudu", JSON.stringify(state));
    render();
}

function navigate(view, projectId) {
    state.view = view;
    if (projectId != undefined) state.currentProjectId = projectId;
    else state.currentProjectId = null;
    commit();
}

function createProject() {
    const title = document.querySelector("input").value;
    state.projects.push({id: crypto.randomUUID(), title, tasks: []})
    commit()
}

function createTask(data) {
    currentProject().tasks.push({id: crypto.randomUUID(), done: false, modifiedDate: today,  ...data});
    commit();
}

function deleteProject(id) {
    state.projects = state.projects.filter(p => p.id != id);
    commit();
}

function deleteTask(id) {
    const p = currentProject();
    p.tasks = p.tasks.filter(t => t.id != id);
    commit();
}

function assignDone(task) {
    task.done = !task.done;
    commit();
}

function render() {
    const screens = {
        home: renderHome,
        projects: renderProjects,
        tasks: renderTasks
    };

    const app = document.getElementById("app");
    app.replaceChildren(document.getElementById(state.view).content.cloneNode(true));
    screens[state.view](app);
}

function renderHome(root) {
    // rendering urgent section
    const urgentList = root.querySelector("#urgent-list");
    for (const project of state.projects) 
        for (const task of project.tasks) {
            if (task.priority == "high" && task.done == false) {
                const li = document.createElement("li");

                const taskTitle = document.createElement("h3");
                taskTitle.textContent = task.title;
                taskTitle.addEventListener("click", () => navigate("tasks", project.id));

                const priority = document.createElement("p");
                priority.textContent = "priority: HIGH!!!!";

                li.appendChild(taskTitle); li.appendChild(priority);
                urgentList.appendChild(li);
            }
        }

    /*
    const modifiedList = root.querySelector("#modified-list");
    for (const project of state.projects)
        for (const task of project.tasks) {
            
        }
    */
}

function renderProjects(root) {
    let projectList = root.querySelector("ul");
    for (const project of state.projects) {
        const li = document.createElement("li");

        const button = document.createElement("button");
        button.textContent = project.title;
        button.addEventListener("click", () => navigate("tasks", project.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "dzēst";
        deleteButton.addEventListener("click", () => deleteProject(project.id));

        li.appendChild(button); li.appendChild(deleteButton);
        projectList.appendChild(li);
    }
}

function renderTasks(root) {
    const p = currentProject();
    let taskList = root.querySelector("ul");
    root.querySelector("h1").textContent = p.title;
    for (const task of p.tasks) {
        const li = document.createElement("li");
        
        const title = document.createElement("h2");
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

        const doneButton = document.createElement("button");
        doneButton.textContent = "done";
        doneButton.addEventListener("click", () => assignDone(task));
        
        li.appendChild(title); li.appendChild(desc); li.appendChild(dueDate); li.appendChild(priority); li.appendChild(done); li.appendChild(deleteButton); 
        li.appendChild(doneButton);
        taskList.appendChild(li);
    }
}

render();