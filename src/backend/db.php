<?php
$creationStatements = [
  "PRAGMA foreign_keys = ON",

  "CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(320) NOT NULL UNIQUE,
    username VARCHAR(30) NOT NULL UNIQUE,
    password TEXT NOT NULL
  )",

  "CREATE TABLE IF NOT EXISTS projects (
    project_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,

    FOREIGN KEY (user_id) 
      REFERENCES users(user_id) 
      ON DELETE CASCADE
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

    FOREIGN KEY (project_id) REFERENCES projects(project_id)
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

/*
foreach($creationStatements as $statement) 
  $db->exec($statement);

$db->exec($creationStatements[4]);
*/


function executeQuery($sql, $params = []) {
  global $db;

  $query = $db->prepare($sql);

  foreach ($params as $key => $value)
    $query->bindValue($key, $value);

  return $query->execute();
}