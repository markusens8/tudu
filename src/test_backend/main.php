<?php
require_once 'db.php';

// ------------------ USERS ---------------
function registerUser($email, $username, $password) {
  return executeQuery(
    "INSERT INTO users(email, username, password)
     VALUES (@email, @username, @password)",

    [
      '@email' => $email,
      '@username' => $username,
      '@password' => $password
    ]
  );
}


function loginUser($email, $password) {
  return executeQuery(
    "SELECT * FROM users
     WHERE email = @email AND password = @password",

    [
      '@email' => $email,
      '@password' => $password
    ]
  );
}


// --------------------- PROJECTS ----------------------
function createProject($user_id, $title) {
  return executeQuery(
    "INSERT INTO projects(user_id, title)
     VALUES (@user_id, @title)",

    [
      '@user_id' => $user_id,
      '@title' => $title
    ]
  );
}


function editProject($project_id, $title) {
  return executeQuery(
    "UPDATE projects
     SET title = @title
     WHERE project_id = @project_id",

    [
      '@title' => $title,
      '@project_id' => $project_id
    ]
  );
}


function deleteProject($project_id) {
  return executeQuery(
    "DELETE FROM projects
     WHERE project_id = @project_id",

    ['@project_id' => $project_id]
  );
}


// -------------------- TASKS ------------------
function createTask($project_id, $title, $description, $due_date, $priority, $status = 'active') {
  return executeQuery(
    "INSERT INTO tasks(
      project_id, title, description,
      due_date, priority, status
    )
    VALUES (
      @project_id, @title, @description,
      @due_date, @priority, @status
    )",

    [
      '@project_id' => $project_id,
      '@title' => $title,
      '@description' => $description,
      '@due_date' => $due_date,
      '@priority' => $priority,
      '@status' => $status
    ]
  );
}


function editTask($task_id, $field, $value) {
  $allowedFields = [
    'title',
    'description',
    'due_date',
    'priority',
    'status'
  ];

  if (!in_array($field, $allowedFields, true)) {
    throw new InvalidArgumentException('Invalid task field');
  }

  return executeQuery(
    "UPDATE tasks
     SET $field = @value,
         modified_date = CURRENT_TIMESTAMP
     WHERE task_id = @task_id",

    [
      '@value' => $value,
      '@task_id' => $task_id
    ]
  );
}


function deleteTask($task_id) {
  return executeQuery(
    "DELETE FROM tasks WHERE task_id = @task_id",
    ['@task_id' => $task_id]
  );
}