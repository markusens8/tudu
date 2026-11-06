<?php
require_once './db.php';
session_start();

$raw = file_get_contents('php://input');                                                             
$data = json_decode($raw, true);   

switch($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		$result = executeQuery(
			'SELECT 
				invitations.invite_id AS invite_id,
				users.username AS username,
				projects.title AS projectTitle
			FROM invitations

			INNER JOIN users
				ON users.user_id = invitations.sender_id

			INNER JOIN projects
				ON projects.project_id = invitations.project_id

			WHERE invitations.reciever_id = :user_id',

			[':user_id' => $_SESSION['user_id']]
		);

		$data = [];
		while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
			$data[] = $row;
		}
		echo json_encode($data);
		break;



	case 'PATCH':
		$inviteId = trim($_SERVER['PATH_INFO'], '/');
		$result = executeQuery(
			"SELECT project_id FROM invitations WHERE invite_id = :invite_id",

			[':invite_id' => $inviteId]
		);
		$projectId = $result->fetchArray(SQLITE3_ASSOC)['project_id'];

		executeQuery(
			"INSERT INTO project_members(project_id, user_id) VALUES (:project_id, :user_id)",

			[':project_id' => $projectId, ':user_id' => $_SESSION['user_id']]
		);
		executeQuery(
			'DELETE FROM invitations WHERE invite_id = :invite_id',

			[':invite_id' => $inviteId]
		);
		break;



	case 'POST':
		$result = executeQuery(
			'SELECT user_id FROM users WHERE username = :username',

			[':username' => $_POST['username']]
		);

		$userId = $result->fetchArray(SQLITE3_ASSOC)['user_id'];
		if (!$userId) {
			http_response_code(404);
			exit;
		}

		executeQuery(
			"INSERT INTO invitations(sender_id, reciever_id, project_id) 
			VALUES (:sender_id, :reciever_id, :project_id)",

			[
				':sender_id' => $_SESSION['user_id'],
				':reciever_id' => $userId,
				':project_id' => $_POST['projectId']
			]
		);
		break;



	case 'DELETE':
		$inviteId = trim($_SERVER['PATH_INFO'], '/');

		executeQuery(
			'DELETE FROM invitations WHERE invite_id = :invite_id',

			[':invite_id' => $inviteId]
		);
	break;
}
