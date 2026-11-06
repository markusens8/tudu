<?php
$creationStatements = [
  "PRAGMA foreign_keys = ON",

  "CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(320) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  )",

  "CREATE TABLE IF NOT EXISTS projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL
  )",

	"CREATE TABLE IF NOT EXISTS project_members (
		project_id INTEGER,
		user_id INTEGER,

		PRIMARY KEY (project_id, user_id),

		FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
		FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
	)",

  "CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    title varchar(255) NOT NULL,
    description TEXT,
    due_date TEXT,
    modified_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'done')),

    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
  )",

	"CREATE TABLE IF NOT EXISTS invitations (
		invite_id INTEGER PRIMARY KEY AUTOINCREMENT,
		sender_id INTEGER NOT NULL, 
		reciever_id INTEGER NOT NULL,
		project_id INTEGER NOT NULL,

		FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
		FOREIGN KEY (reciever_id) REFERENCES users(user_id) ON DELETE CASCADE,
		FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
	)",

  "
  CREATE TRIGGER update_edited_at
  AFTER UPDATE ON tasks
  FOR EACH ROW
  BEGIN
    UPDATE tasks 
    SET modified_date = CURRENT_TIMESTAMP
    WHERE task_id = new.task_id;
  END
  "
];

$db = new SQLite3('./database/my.db');

// uncomment ts to create a new database
//foreach($creationStatements as $statement) $db->exec($statement); 

function executeQuery($sql, $params = []) {
  global $db;

  $query = $db->prepare($sql);

  foreach ($params as $key => $value)
    $query->bindValue($key, $value);

  return $query->execute();
}
