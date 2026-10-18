export async function getState() {	
	const response = await fetch("/backend/projects.php");
	const data = response.json();
	return data;
}

function addProject() {

}

function addTask() {

}

function deleteTask() {

}

function deleteProject() {

}

function editTask() {

}
