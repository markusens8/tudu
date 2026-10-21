const app = document.getElementById("app");

// --------------------- HOME ------------------

export function renderHome(urgentTasks, recentlyModifiedTasks) {
		app.replaceChildren(document.getElementById("home").content.cloneNode(true));
    renderHomeUrgentList(urgentTasks); 
//    renderHomeModifiedList(recentlyModifiedTasks);
}

function renderHomeUrgentList(urgentTasks) {
		for (const task of urgentTasks) {
			const li = document.createElement("li");
			const taskTitle = document.createElement("h4");
			const priority = document.createElement("p");
			const dueDate = document.createElement("p");

			taskTitle.textContent = task.title;
			priority.textContent = "priority: " + task.priority;
			dueDate.textContent = "termiņš: " + task.dueDate;

			li.append(taskTitle, priority, dueDate);
			app.querySelector("#urgent-list").appendChild(li);
		}
}

function renderHomeModifiedList(recentlyModifiedTasks) {
    for (const task of recentlyModifiedTasks) {
        const li = document.createElement("li");
        const taskTitle = document.createElement("h4");
        const modifiedDate = document.createElement("p");

        taskTitle.textContent = task.title;
        modifiedDate.textContent = "pedejoreiz modificets: " + task.modifiedDate;

        li.append(taskTitle, modifiedDate);
        app.querySelector("#recently-modified-list").appendChild(li);
    }
}

// ---------------------- PROJECTS ----------------------

export function renderProjects(projects, actions) {
	app.replaceChildren(document.getElementById("projects").content.cloneNode(true));

	app.querySelector("#create-project").addEventListener("click", () => {
		actions.createProject(app.querySelector("#project-title-input").value);
	});

    for (const [id, project] of Object.entries(projects)) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const deleteButton = document.createElement("button");

        button.textContent = project.title;
        deleteButton.textContent = "dzēst";

        button.addEventListener("click", () => actions.changeCurrentProject(id));
        deleteButton.addEventListener("click", () => actions.deleteProject(id));

        li.append(button, deleteButton);
        app.querySelector("#project-list").appendChild(li);
    }
}

// ------------------------ TASKS -----------------------------
export function renderTasks(project, actions) {
	app.replaceChildren(document.getElementById("tasks").content.cloneNode(true));
    app.querySelector("h1").textContent = project.title;

	app.querySelector("#task-form").addEventListener("submit", (e) => {
		e.preventDefault();
		actions.createTask(new FormData(e.target));
		e.target.reset();
	});


	// adding new task
	for (const [taskId, taskFields] of Object.entries(project.tasks)) {
		const fragment = document.getElementById("task").content.cloneNode(true);

		// filling task fields
		for (const [field, value] of Object.entries(taskFields)) {
			if (field === "modifiedDate") continue;

			const el = fragment.querySelector(`.${field}`);
			el.value = value || "";
			el.addEventListener("change", () => actions.editTask(taskId, field, el.value));
		}
		
		fragment.querySelector(".delete-button").addEventListener("click", () =>  actions.deleteTask(taskId));
		app.querySelector("#task-list").appendChild(fragment);
	}
}
