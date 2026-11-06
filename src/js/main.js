import * as api from "./api.js";
import * as render from "./render.js"; 

let projects = api.getProjects();
let tasks = api.getTasks();
let invites = api.getInvites();
let state = {view: "home", currentProjectId: null, homeFilter: "priority", filter: "active"};


// ---------------------------- STATE STUFF ------------------------------------- 
function changeCurrentProject(id) {
	state.currentProjectId = id;
	state.view = "tasks";
	refresh();
}

function changeFilter(filter) {
	state.filter = filter;
	refresh();
}

function changeHomeFilter(filter) {
	state.homeFilter = filter;
	refresh();
}



// ----------------- DATA RETRIEVAL -------------------------
function getUrgentTasks() {
	const msToDays = (ms) => ms / 1000 / 60 / 60 / 24;
	const getDaysUntilDate = (date) => Math.floor( msToDays(new Date(date).getTime()  -  Date.now()) ); 


	let urgentTasks = [];
  for (const task of Object.values(tasks)) {
    if (task.status === "done") continue;


    if (state.homeFilter === "dueDate" && getDaysUntilDate(task.due_date) <= 10)
      urgentTasks.push({projectTitle: projects[task.project_id].title, ...task});


    else if (task.priority === "high")
      urgentTasks.push({projectTitle: projects[task.project_id].title, ...task});
  }

	return urgentTasks;
}

function getRecentlyModifiedTasks() {
	const unixTime = (date) => new Date(date).getTime();

  
	let recentlyModifiedTasks = [];
  for (const task of Object.values(tasks)) {
    recentlyModifiedTasks.push({projectTitle: projects[task.project_id].title, ...task});
  }
	

	recentlyModifiedTasks.sort((a, b) => unixTime(b.modified_date) - unixTime(a.modified_date));


	return recentlyModifiedTasks;
}

// formats the project for tasks section
function getTasks() {
	let projectTasks = {...tasks};


	for (const [taskId, task] of Object.entries(projectTasks)) {

		if (task.project_id != state.currentProjectId)
      delete projectTasks[taskId];
		
		if (task.status !== state.filter && state.filter !== "all") 
			delete projectTasks[taskId];
	}


	return projectTasks;
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
	api.editTask(taskId, field, value);	
	refresh();
}

function deleteTask(id) {
	api.deleteTask(id);
	refresh();
}

function sendInvite(data) {
	data.append("projectId", state.currentProjectId);
	api.sendInvite(data);
	refresh();
}

function acceptInvite(accept, inviteId) {
	if (accept) 
		api.acceptInvite(inviteId);
	else 
		api.declineInvite(inviteId);
	refresh();
}


// --------------------------------- DRAWING ------------------!
const homeActions = {
	"changeHomeFilter": changeHomeFilter,
	"acceptInvite": acceptInvite
};

const taskActions = {
	"createTask": createTask,
	"editTask": editTask,
	"deleteTask": deleteTask,
	"changeFilter": changeFilter,
	"sendInvite": sendInvite
};

const projectActions = {
	"createProject": createProject,
	"editProject": editProject,
	"deleteProject": deleteProject,
	"changeCurrentProject": changeCurrentProject
};


const draw = {
	"login": null,
	"home": () => render.renderHome( {invites, urgentTasks: getUrgentTasks(), recentlyModifiedTasks: getRecentlyModifiedTasks(), filter: state.homeFilter}, homeActions),
	"projects": () => render.renderProjects( {projects}, projectActions),
	"tasks": () => render.renderTasks( {tasks: getTasks(), filter: state.filter, projectTitle: projects[state.currentProjectId].title}, taskActions)
};

async function refresh() {
	projects = await api.getProjects();
  tasks = await api.getTasks();
	invites = await api.getInvites();

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

document.getElementById("logout-button").addEventListener("click", api.logOut)


refresh();
