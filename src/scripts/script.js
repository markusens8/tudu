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
    currentProject().tasks.push({id: crypto.randomUUID(), status: false, modifiedDate: today(),  ...data});
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
    task.status = (task.status === 'active' ? 'done' : 'active');
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
            if (task.priority != "high" || task.status == 'done') continue;

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
    root.querySelector("h1").textContent = currentProject().title;
    const tasksList = root.querySelector("ul");

    /*
    let visibleTasks = project.tasks.filter(task => {
        if (state.filter == "done") return task.done;
        if (state.filter == "active") return !task.done;
        return true;
    })
    */

   for (const task of currentProject().tasks) {
        const fields = {
            '.task-title':    task.title,
            '.task-desc':     task.desc,
            '.task-due-date': task.dueDate,
            '.task-priority': task.priority,
            '.task-status':   task.status;
        }

       const fieldSelectors = ['.task-title', '.task-desc', '.task-due-date', '.task-priority', '.task-status'];
       const taskValues = [task.title, task.desc, task.dueDate, task.priority, task.status];
       const taskFragment = document.getElementById("task").content.cloneNode(true);

       for (let i=0; i < fieldSelectors.length; ++i) {
         const field = taskFragment.querySelector(fieldSelectors[i]);
         field.value = taskValues[i];
         field.readOnly = true;

         field.addEventListener("click", () => field.readOnly = false);
         field.addEventListener("blur", () => {});
       }
            
        tasksList.appendChild(taskFragment);
    }
}

render();