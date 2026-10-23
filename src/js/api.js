// --------------------------------- PROJECTSSSSSSSSSSSSSSSS ------------------
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

export async function editProject(id, newTitle) {
	await fetch ("backend/projects.php", {
		method: 'PATCH',
		body: JSON.stringify({id, newTitle})
	});
}

export async function deleteProject(id) {
	await fetch(`backend/projects.php/${id}`, {
		method: 'DELETE'
	});
}



// ------------------------ TAAAAAAAAAAAAAAAAASKS -------------------
export async function createTask(task) {
	await fetch('backend/tasks.php', {
		method: "POST",
		body: task
	});	
}

export async function deleteTask(id) {
	await fetch(`backend/tasks.php/${id}`, { 
		method: 'DELETE'
	});
}

export async function editTask(projectId, taskId, field, value) {
	await fetch("backend/tasks.php", {
		method: 'PATCH',
		body: JSON.stringify({projectId, taskId, field, value})
	});
}
