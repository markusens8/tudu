<?php
require_once './db.php';
session_start();

//header('Content-Type: application/json');


switch($_SERVER['REQUEST_METHOD']) {
	case 'GET':
    $result = executeQuery(
      'SELECT * FROM projects WHERE user_id = :user_id',

      [
        ':user_id' => $_SESSION['user_id']
      ]
    );


    $data = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
      $project_id = $row['project_id'];
      unset($row['project_id']);

      $data[$project_id] = $row;
    }
  
    echo json_encode($data);
		break;
    

	case 'POST':
		$raw = file_get_contents('php://input');
		$data = json_decode($raw, true);

    executeQuery(
      "INSERT INTO projects(user_id, title) VALUES (:user_id, :title)",

      [':user_id' => $_SESSION['user_id'], ":title" => $data['title']]
    );
		break;


	case 'DELETE':
		$project_id = trim($_SERVER['PATH_INFO'], '/');

    executeQuery(
      "DELETE FROM projects WHERE project_id = :project_id",

      [':project_id' => $project_id]
    );
		break;
}