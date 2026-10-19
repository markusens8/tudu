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

export function renderProjects(projects, onCreate, onClick, onDelete) {
		app.replaceChildren(document.getElementById("projects").content.cloneNode(true));

		app.querySelector("#create-project").addEventListener("click", () => {
			onCreate(app.querySelector("#project-title-input").value);
		});

    for (const [id, project] of Object.entries(projects)) {
        const li = document.createElement("li");
        const button = document.createElement("button");
        const deleteButton = document.createElement("button");

        button.textContent = project.title;
        deleteButton.textContent = "dzēst";

        button.addEventListener("click", () => onClick(id));
        deleteButton.addEventListener("click", () => onDelete(id));

        li.append(button, deleteButton);
        app.querySelector("#project-list").appendChild(li);
    }

}

// ------------------------ TASKS -----------------------------
const FIELDS = {
	  title:    '.task-title',
	  desc:     '.task-desc',
	  dueDate:  '.task-due-date',
	  priority: '.task-priority',
};

export function renderTasks(project, onCreate, onEdit, onDelete) {
		app.replaceChildren(document.getElementById("tasks").content.cloneNode(true));
    app.querySelector("h1").textContent = project.title;

		app.querySelector("#task-form").addEventListener("submit", (e) => {
			e.preventDefault();
			const task = Object.fromEntries(new FormData(e.target));
			onCreate(task);
			e.target.reset();
		});
/*
    let tasks = project.tasks.filter(task => {
        if (state.filter == "done") return task.status === "done";
        if (state.filter == "active") return task.status === "active";
        return true;
    })
*/

   for (const task of project.tasks) {
		 const fragment = document.getElementById("task").content.cloneNode(true);

	   for (const [prop, selector] of Object.entries(FIELDS)) {
	     const el = fragment.querySelector(selector);
			 el.value = task[prop] || ""; 
			 el.addEventListener('change', () => onEdit(task.id, prop, el.value));
	   }
	   const statusEl = fragment.querySelector(".status");
	   statusEl.textContent = "statuss: " + task.status;
	   statusEl.addEventListener('click', () => onEdit(task.id, "priority", task.status === "active" ? "done" : "active" ));

     app.querySelector("#task-list").appendChild(fragment);
    }
}
