<?php
require_once './db.php';

/*
session_start();
if (empty($_SESSION["logged_in"])) {
  header("Location: login.html");
  exit;
}
*/

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
  case 'GET':
    $result = executeQuery("SELECT * FROM tasks");

    $data = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
      $task_id = row['task_id'];
      unset($row['task_id']);

      $data[$task_id] = $row;
    }

    echo json_encode($data);
    break;


	case 'POST':
		$task = array(
			"title"        => $_POST["title"],
			"description"  => $_POST["description"],
			"dueDate"      => $_POST["dueDate"],
			"modifiedDate" => date("c"),
			"priority"     => $_POST["priority"],
			"status"       => "active",
		);
		
    executeQuery(
      "INSERT INTO tasks (project_id, title, description, due_date, priority)
      VALUES (:project_id, :title, :description, :due_date, :priority)",

      [
        ':project_id' => $_POST['projectId'],
        ':title' => $_POST['title'],
        ':description' => $_POST['description'],
        ':due_date' => $_POST['dueDate'],
        ':priority' => $_POST['priority']
      ]
    );
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
		$taskId = trim($_SERVER['PATH_INFO'], '/');
		
    executeQuery(
      "DELETE FROM tasks WHERE task_id = :task_id",
      
      ['task_id' => taskId]
    );

		break;
}