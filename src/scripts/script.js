let state = JSON.parse(localStorage.getItem("tudu")) || {projects: [], currentProjectId: null, view: "home", filter: "all"};
const currentProject = () => state.projects.find(p => p.id === state.currentProjectId); 
const today = () => new Date().toLocaleString('lv-LV');

// strukturesana, ideja generesan, attel generesan, atkludosanai, koda risinajuma idejas generesana (bet tev pasam jaimplemente)

// project = {id, title, tasks: [{id, title, desc, ...}, {}]}

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
	state.filter = "all";
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

function toggleDone(task) {
    task.status = (task.status === 'active' ? 'done' : 'active');
    task.modifiedDate = today();
    commit();
}

function createTask(data) {    
    currentProject().tasks.push({id: crypto.randomUUID(), status: "active", modifiedDate: today(),  ...data});
    commit();
}

function editTask(task, field, value) {
	task[field] = value;
	task.modifiedDate = today();
	commit();
}

function deleteTask(id) {
    const p = currentProject();
    p.tasks = p.tasks.filter(t => t.id != id);
    commit();
}


function render() {
    const app = document.getElementById("app");
    app.replaceChildren(document.getElementById(state.view).content.cloneNode(true));
    screens[state.view](app);
}

function renderHomeUrgentList(root) {
    root.replaceChildren();
    for (const project of state.projects) 
        for (const task of project.tasks) {
            if (task.priority != "high" || task.status == 'done' ) continue;

            const li = document.createElement("li");
            li.addEventListener("click", () => openProject(project.id));

            const taskTitle = document.createElement("h4");
            taskTitle.textContent = task.title;

            const priority = document.createElement("p");
            priority.textContent = "priority: " + task.priority;

            const dueDate = document.createElement("p");
            dueDate.textContent = "termiņš: " + task.dueDate.toLocaleString('lv-LV');

            li.append(taskTitle, priority, dueDate)
            root.appendChild(li);
        }
}

function renderHomeModifiedList(root) {
    root.replaceChildren();
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
    root.querySelector("h1").textContent = project.title;
    const tasksList = root.querySelector("ul");

    let tasks = project.tasks.filter(task => {
        if (state.filter == "done") return task.status === "done";
        if (state.filter == "active") return task.status === "active";
        return true;
    })

	const FIELDS = {
	  title:    '.task-title',
	  desc:     '.task-desc',
	  dueDate:  '.task-due-date',
	  priority: '.task-priority',
    };

   for (const task of tasks) {
       const fragment = document.getElementById("task").content.cloneNode(true);
	   for (const [prop, selector] of Object.entries(FIELDS)) {
	     const el = fragment.querySelector(selector);
		 el.value = task[prop] || ""; 
		 
		 el.addEventListener('change', () => editTask(task, prop, el.value));
	   }

	   const statusEl = fragment.querySelector("#status");
	   statusEl.textContent = "statuss: " + task.status;
	   statusEl.addEventListener('click', () => toggleDone(task));
       tasksList.appendChild(fragment);
    }
}

render();