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
	file_put_contents("projects.json", json_encode((object)$projects, JSON_PRETTY_PRINT));
}

//header('Content-Type: application/json');
$projects = getProjects();
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
	case 'GET':
		readfile("projects.json");
		break;
	case 'POST':
		$raw = file_get_contents('php://input');
		$data = json_decode($raw, true);

		$projects[uniqid()] = [
			'title' => $data['title'],
			'tasks' => []
		];
		setProjects($projects);
		break;
	case 'DELETE':
		$id = trim($_SERVER['PATH_INFO'], '/');
		unset($projects[$id]);
		setProjects($projects);
		break;
}

