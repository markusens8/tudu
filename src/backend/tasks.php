<?php
function getProjects() {
	$json = file_get_contents("projects.json");
	$projects = json_decode($json, true);
	return $projects;
}

function setProjects($projects) {
	file_put_contents("projects.json", json_encode($projects, JSON_PRETTY_PRINT));
}


//header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
	case 'POST':
		$task = array(
			"title"        => $_POST["title"],
			"description"  => $_POST["description"],
			"dueDate"      => $_POST["dueDate"],
			"modifiedDate" => date("d.m.Y H:i"),
			"priority"     => $_POST["priority"],
			"status"       => "active",
		);
		
		$projects = getProjects();
		$projects["1234"]["tasks"][uniqid()] = $task;
		setProjects($projects);

		//var_dump($task);
		var_dump($projects);

		break;
	case 'PUT':

		break;
	case 'DELETE':
		
		break;
}