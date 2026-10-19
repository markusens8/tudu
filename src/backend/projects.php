<?php
header('Content-Type: application/json');
// 1. localStorage vietā glabā to JSON failā uz servera un katram pieslēgumam atgriez vienu un to pašu state
// 2. Login sistēma katram lietotājam atgriez personisko state
// 3. 

$method = $_SERVER['REQUEST_METHOD'];
$json = file_get_contents("projects.json");
$projects = json_decode($json, true);
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
		file_put_contents("projects.json", json_encode($projects));
		break;
	case 'DELETE':
		$id = trim($_SERVER['PATH_INFO'], '/');
		unset($projects[$id]);
		file_put_contents("projects.json", json_encode((object)$projects));
		break;
}

