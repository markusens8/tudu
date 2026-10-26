import * as api from "./api.js";
import * as render from "./render.js"; 

let projects = api.getProjects(); 
let state = {view: "home", currentProjectId: null, filter: "active"};


// ---------------------------- STATE STUFF -------------------------------------


// vispirms pa vienkarso prieks siem home taskiem, paradit projektu un uzdevuma nosaukumu, neieviesot funkcionalitati,
// ka nospiezot uz taska var teleporteties lidz tam task sadala
// Rewrite ts !!!!!!!!!!!!!!!!!!!!!
function getUrgentTasks() {
	const msToDays = (ms) => ms / 1000 / 60 / 60 / 24;
	const getDaysUntilDate = (date) => Math.floor( msToDays(new Date(date).getTime()  -  Date.now()) ); 

	let urgentTasks = [];
	for (const [projectId, project] of Object.entries(projects))
		for (const [taskId, task] of Object.entries(project.tasks)) 
			if (task.priority === "high" || getDaysUntilDate(task.dueDate) <= 10)
				urgentTasks.push({taskId, projectTitle: project.title, ...task});
	return urgentTasks;
}

function getRecentlyModifiedTasks() {
	let recentlyModifiedTasks = [];
	for (const [projectId, project] of Object.entries(projects))
		for (const [taskId, task] of Object.entries(project.tasks))
			recentlyModifiedTasks.push({projectTitle: project.title, ...task});
	
	recentlyModifiedTasks.sort((a, b) => a.modifiedDate - b.modifiedDate);
	return recentlyModifiedTasks;
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

function getProject() {
	let project = {...projects[state.currentProjectId]};

	//removing modifiedDate for the renderer and filtering
	for (const taskId of Object.keys(project.tasks)) {
		delete project.tasks[taskId]["modifiedDate"];
		
		const taskStatus = project.tasks[taskId]["status"];
		if (taskStatus !== state.filter && state.filter !== "all") 
			delete project.tasks[taskId];
	}

	return project;
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
	"changeFilter": changeFilter
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
	"tasks": () => render.renderTasks( getProject(), taskActions, state.filter)
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