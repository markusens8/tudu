<?php


$db = new SQLite3("mysqlitedb.db");


// making the tables
$db->exec("
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    name VARCHAR(15),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    project_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
  );

  CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY,
    project_id INTEGER NOT NULL,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    due_date DATETIME,
    modified_date DATETIME,
    priority TEXT NOT NULL,
    status TEXT NOT NULL,

    check(priority in ('low', 'medium', 'high')),
    check(status in ('active', 'done')),

    FOREIGN KEY (project_id) REFERENCES projects(project_id)
  );
");

// check if user is valid
$stmt = $db->prepare("SELECT 1 FROM users WHERE email = :email LIMIT 1");
$stmt->bindValue(':email', $email, SQLITE3_TEXT);

$result = $stmt->execute();

if ($result->fetchArray(SQLITE3_NUM)) {
    echo "Email already registered.";
}


echo "we did it";
$db->close();