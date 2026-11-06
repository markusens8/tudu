<?php
require_once './db.php';
session_start();

//header('Content-Type: application/json');


switch($_SERVER['REQUEST_METHOD']) {
	case 'GET':
    $result = executeQuery(
			'SELECT projects.* FROM projects
			INNER JOIN project_members
			ON project_members.project_id = projects.project_id
			WHERE project_members.user_id = :user_id',

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
    $result = executeQuery(
      "INSERT INTO projects(title) VALUES (:title) RETURNING project_id",

      [":title" => $data['title']]
    );
		$projectId = $result->fetchArray(SQLITE3_ASSOC)['project_id']; 


		executeQuery( 
			"INSERT INTO project_members(project_id, user_id) VALUES (:project_id, :user_id)",

			[':project_id' => $projectId, ':user_id' => $_SESSION['user_id']]
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
