export async function getProjects() {	
	const response = await fetch("/backend/projects.php", {
		method: 'GET' 
	});
	return response.json();
}

export async function createProject(title) {
	await fetch("backend/projects.php", {
		method: 'POST',
		body: JSON.stringify({title}) 
	});
}

export async function deleteProject(id) {
	await fetch(`backend/projects.php/${id}`, {
		method: 'DELETE'
	});
}

export async function createTask(projectId, task) {
	await fetch('backend/tasks.php', {
		method: "POST",
		body: task
	});	
}

async function deleteTask(id) {
	await fetch(`backend/tasks.php/${id}`, { 
		method: 'DELETE',
	});
}

async function editTask() {

}
