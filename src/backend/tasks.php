<?php
function getProjects() {
	$json = file_get_contents("projects.json");
	$projects = json_decode($json, true);
	return $projects;
}

function setProjects($projects) {
	file_put_contents("projects.json", json_encode($projects, JSON_PRETTY_PRINT));
}

function getInput() {
	$json  = file_get_contents("php://input");
	$data = json_decode($json, true);
	return $data;
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
		$projects[$_POST["projectId"]]["tasks"][uniqid()] = $task;
		setProjects($projects);
		break;
	case 'PATCH':
		$data = getInput();
		$projectId = $data["projectId"];
		$taskId = $data["taskId"];
		$field = $data["field"];
		$value = $data["value"];
		
		$projects = getProjects();
		$projects[$projectId]["tasks"][$taskId][$field] = $value;
		setProjects($projects);
		break;
	case 'DELETE':
		$projects = getProjects();

		$projectId = array_find_key($projects, function ($value, $key) {
			array_find_key($value, function ($project, $tasks))	
		});
		break;
}