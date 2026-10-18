import * as api from "./api.js";
import * as render from "./render.js"; 

const state = await api.getState();

const msToDays = (ms) => ms / 1000 / 60 / 24;
const getDaysUntilDate = (date) => Math.floor( msToDays(Date.now() -  new Date(date).getTime()) ); 

function getUrgentTasks() {
	let urgentTasks = [];
	for (const project of state.projects) 
		for (const task of project.tasks) 
			if (task.priority === "high" || getDaysUntilDate(task.dueDate) <= 10) 
				urgentTasks.push(task);

		return urgentTasks;
}

function getRecentlyModifiedTasks() {

}

render.renderHome(getUrgentTasks()) 
