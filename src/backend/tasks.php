<?php
require_once './db.php';
session_start();


function getInput() {
	$json  = file_get_contents("php://input");
	$data = json_decode($json, true);
	return $data;
}


//header('Content-Type: application/json');
switch($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $result = executeQuery(
      "SELECT tasks.* FROM tasks
      INNER JOIN projects ON tasks.project_id = projects.project_id
      WHERE projects.user_id = :user_id",

      [
        ':user_id' => $_SESSION['user_id']
      ]
    );

    $data = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
      $task_id = $row['task_id'];
      unset($row['task_id']);

      $data[$task_id] = $row;
    }

    echo json_encode($data);
    break;


	case 'POST':
    executeQuery(
      "INSERT INTO tasks (project_id, title, description, due_date, priority)
      VALUES (:project_id, :title, :description, :due_date, :priority)",

      [
        ':project_id' => $_POST['projectId'],
        ':title' => $_POST['title'],
        ':description' => $_POST['description'],
        ':due_date' => $_POST['due_date'],
        ':priority' => $_POST['priority']
      ]
    );
		break;


	case 'PATCH':
		$data = getInput();
		$taskId = $data["taskId"];
		$field = $data["field"];
		$value = $data["value"];

    executeQuery(
      "UPDATE tasks SET $field = :value WHERE task_id = :task_id",

      [
        ':value' => $value,
        ':task_id' => $taskId
      ]
    );
		break;


	case 'DELETE':
		$taskId = trim($_SERVER['PATH_INFO'], '/');
		
    executeQuery(
      "DELETE FROM tasks WHERE task_id = :task_id",
      
      ['task_id' => $taskId]
    );

		break;
}