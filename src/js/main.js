import * as api from "./api.js";
import * as render from "./render.js"; 

let projects = api.getProjects(); 
let state = {view: "projects", currentProjectId: null, filter: null};

// ---------------------------- STATE STUFF -------------------------------------

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
	api.deleteProject(id);
	refresh();
}

function createTask(task) {
	api.createTask(state.currentProjectId, task);
	refresh();
}

function editTask(taskId, field, value) {
	api.editTask(state.currentProjectId, taskId, field, value);	
	refresh();
}

function deleteTask(id) {
	api.deleteTask(id);
	refresh();
}

// --------------------------------- DRAWING ------------------!

const draw = {
	"login": null,
	"home": () => render.renderHome( getUrgentTasks(), getRecentlyModifiedTasks() ),
	"projects": () => render.renderProjects( projects, createProject, changeCurrentProject, deleteProject ),
	"tasks": () => render.renderTasks( projects[state.currentProjectId], createTask, editTask, deleteTask )
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
