<?php
session_start();
if (empty($_SESSION["logged_in"])) {
  header("Location: login.html");
  exit;
}

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

function findProjectId($targetTaskId) {
	$projects = getProjects();
	foreach ($projects as $projectId => $projectValues)
		foreach($projectValues["tasks"] as $taskId => $taskValues)
			if ($taskId == $targetTaskId) return $projectId;
}


//header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
	case 'POST':
		$task = array(
			"title"        => $_POST["title"],
			"description"  => $_POST["description"],
			"dueDate"      => $_POST["dueDate"],
			"modifiedDate" => date("c"),
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
		$projects[$projectId]["tasks"][$taskId]["modifiedDate"] = date("c");
		setProjects($projects);
		break;
	case 'DELETE':
		$projects = getProjects();
		$taskId = trim($_SERVER['PATH_INFO'], '/');
		$projectId = findProjectId($taskId);
		unset($projects[$projectId]["tasks"][$taskId]);
		
		setProjects($projects);
		break;
}