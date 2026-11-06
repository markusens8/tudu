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
export async function getTasks() {
  const response = await fetch("/backend/tasks.php", {
    method: 'GET'
  });
  return response.json();
}

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

export async function editTask(taskId, field, value) {
	await fetch("backend/tasks.php", {
		method: 'PATCH',
		body: JSON.stringify({taskId, field, value})
	});
}



//------------------------- USER STATE -------------
export async function logOut() {
  const response = await fetch("backend/logout.php", {
    method: 'POST'
  });

  window.location.href = "../login.html";
}



// --------------------------- INVITESSSSSSS ----------
export async function getInvites() {
	const response = await fetch("backend/invites.php", {
		method: 'GET',
	});
	return response.json();
}

export async function sendInvite(data) {
	const response = await fetch("backend/invites.php", {
		method: 'POST',
		body: data
	});
}

export async function acceptInvite(inviteId) {
	const response = await fetch(`backend/invites.php/${inviteId}`, {
		method: 'PATCH',
	});
}

export async function declineInvite(inviteId) {
	await fetch (`backend/invites.php/${inviteId}`, {
		method: 'DELETE'
	});
}
