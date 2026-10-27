const app = document.getElementById("app");

// --------------------- HOME ------------------

export function renderHome(tasks, actions, filter) {
  app.replaceChildren(document.getElementById("home").content.cloneNode(true));
  renderHomeUrgentList(tasks.urgentTasks);
  renderHomeModifiedList(tasks.recentlyModifiedTasks);

  app.querySelector("#priority-button").addEventListener("click", () => actions.changeHomeFilter("priority"));
  app.querySelector("#dueDate-button").addEventListener("click", () => actions.changeHomeFilter("dueDate"));

  app.querySelector("#priority-button").disabled = filter === "priority";
  app.querySelector("#dueDate-button").disabled = filter === "dueDate";
}

function renderHomeUrgentList(urgentTasks) {
  for (const task of urgentTasks) {
    const li = document.createElement("li");
	  const projectTitle = document.createElement("h4");
    const taskTitle = document.createElement("h5");
    const priority = document.createElement("p");
    const dueDate = document.createElement("p");

	  projectTitle.textContent = task.projectTitle;
    taskTitle.textContent = task.title;
    priority.textContent = "priority: " + task.priority;
    dueDate.textContent = "termiņš: " + (task.dueDate || "-");

    li.append(projectTitle, taskTitle, priority, dueDate);
    app.querySelector("#urgent-list").appendChild(li);
  }
}

function renderHomeModifiedList(recentlyModifiedTasks) {
  for (const task of recentlyModifiedTasks) {
    const li = document.createElement("li");
	  const projectTitle = document.createElement("h4");
    const taskTitle = document.createElement("h5");
    const modifiedDate = document.createElement("p");

	  projectTitle.textContent = task.projectTitle;
    taskTitle.textContent = task.title;
    modifiedDate.textContent = "pedejoreiz modificets: " + task.modifiedDate;

    li.append(projectTitle, taskTitle, modifiedDate);
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
export function renderTasks(project, actions, filter) {
  app.replaceChildren(document.getElementById("tasks").content.cloneNode(true));
  app.querySelector("h1").textContent = project.title;

  app.querySelector("#task-form").addEventListener("submit", (e) => {
    e.preventDefault();
    actions.createTask(new FormData(e.target));
    e.target.reset();
  });

  app.querySelector("#filter-active").addEventListener("click", () => actions.changeFilter("active"));
  app.querySelector("#filter-done").addEventListener("click", () => actions.changeFilter("done"));
  app.querySelector("#filter-all").addEventListener("click", () => actions.changeFilter("all"));

  app.querySelector("#filter-active").disabled = filter === "active";
  app.querySelector("#filter-done").disabled = filter === "done";
  app.querySelector("#filter-all").disabled = filter === "all";


  for (const [taskId, taskFields] of Object.entries(project.tasks)) {
    const fragment = document.getElementById("task").content.cloneNode(true);

    // filling task fields
    for (const [field, value] of Object.entries(taskFields)) {
      const el = fragment.querySelector(`.${field}`);

      if (el.type === "checkbox")
        el.checked = value === "done";
      else
        el.value = value || "";

      el.addEventListener("change", () => {
        if (el.type === "checkbox")
          actions.editTask(taskId, field, el.checked ? "done" : "active");
        else actions.editTask(taskId, field, el.value)
      });
    }

    fragment.querySelector(".delete-button").addEventListener("click", () => actions.deleteTask(taskId));
    app.querySelector("#task-list").appendChild(fragment);
  }
}