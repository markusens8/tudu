import * as api from "./api.js";
import * as render from "./render.js"; 

let projects = api.getProjects(); 
let state = {view: "projects", currentProjectId: null, filter: null};


// ---------------------------- STATE STUFF -------------------------------------

// Rewrite ts !!!!!!!!!!!!!!!!!!!!!
function getUrgentTasks() {
	const msToDays = (ms) => ms / 1000 / 60 / 24;
	const getDaysUntilDate = (date) => Math.floor( new Date(date).getTime())  - msToDays(Date.now()); 

	let urgentTasks = [];
	for (const project of Object.values(projects)) 
		for (const task of project.tasks) 
			if (task.priority === "high" || getDaysUntilDate(task.dueDate) <= 10) 
				urgentTasks.push(task);
	return urgentTasks;
}

function getRecentlyModifiedTasks() {
	return
}

function changeCurrentProject(id) {
	state.currentProjectId = id;
	state.view = "tasks";
	refresh();
}

function changeFilter(filter) {
	state.filter = filter;
	refresh();
}



// ----------------- CRUD OPERATIONS ------------------------
function createProject(title) {
	if (title.trim() === "") alert("Ievadi projekta nosaukumu");
	else api.createProject(title);
	refresh();
}

function deleteProject(id) {
	console.log("id in main.js");
	console.log(id);
	api.deleteProject(id);
	refresh();
}

function editProject(newTitle) {
	api.editProject(newTitle);
	refresh();
}

function createTask(data) {
	data.append("projectId", state.currentProjectId);
	api.createTask(data);
	refresh();
}

function editTask(taskId, field, value) {
	//console.log(state.currentProjectId + " " + taskId + " " + field + " " + value);
	api.editTask(state.currentProjectId, taskId, field, value);	
	refresh();
}

function deleteTask(id) {
	api.deleteTask(id);
	refresh();
}


// --------------------------------- DRAWING ------------------!
const taskActions = {
	"createTask": createTask,
	"editTask": editTask,
	"deleteTask": deleteTask,
};

const projectActions = {
	"createProject": createProject,
	"editProject": editProject,
	"deleteProject": deleteProject,
	"changeCurrentProject": changeCurrentProject
};


const draw = {
	"login": null,
	"home": () => render.renderHome( getUrgentTasks(), getRecentlyModifiedTasks() ),
	"projects": () => render.renderProjects( projects, projectActions),
	"tasks": () => render.renderTasks( projects[state.currentProjectId], taskActions)
};

async function refresh() {
	projects = await api.getProjects();
	draw[state.view]();	
}


// -------------------------------- NAVIGATOR MENU SETUP --------------------!

document.getElementById("home-navigator").addEventListener("click", () => {
	state.view = "home";	
	refresh();
});

document.getElementById("projects-navigator").addEventListener("click", () => {
	state.view = "projects";
	refresh();
});


refresh();