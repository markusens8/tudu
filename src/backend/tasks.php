<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$json = file_get_contents("projects.json");
$projects = json_decode($json, true);
switch($method) {
	case 'POST':
					
		break;
	case 'PUT':

		break;
	case 'DELETE':
		
		break;
}

