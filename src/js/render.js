const app = document.getElementById("app");

export function renderHome(urgentTasks, recentlyModifiedTasks) {
		app.replaceChildren(document.getElementById("home").content.cloneNode(true));
    renderHomeUrgentList(urgentTasks); 
//    renderHomeModifiedList(recentlyModifiedTasks);
}

function renderHomeUrgentList(urgentTasks) {
		const urgentList = app.querySelector("#urgent-list");	
		for (const task of urgentTasks) {
			const li = document.createElement("li");
			const taskTitle = document.createElement("h4");
			const priority = document.createElement("p");
			const dueDate = document.createElement("p");

			taskTitle.textContent = task.title;
			priority.textContent = "priority: " + task.priority;
			dueDate.textContent = "termiņš: " + task.dueDate;

			li.append(taskTitle, priority, dueDate);
			urgentList.appendChild(li);
		}
}

function renderHomeModifiedList(recentlyModifiedTasks) {
		const recentlyModifiedList = app.getElementById("recently-modified-list");
    for (const task of recentlyModifiedTasks) {
        const li = document.createElement("li");
        const taskTitle = document.createElement("h4");
        const modifiedDate = document.createElement("p");

        taskTitle.textContent = task.title;
        modifiedDate.textContent = "pedejoreiz modificets: " + task.modifiedDate;

        li.append(taskTitle, modifiedDate);
        root.appendChild(li);
    }
}



function renderProjects() {
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

function renderTasks() {
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
