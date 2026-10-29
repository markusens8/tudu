<?php
  $email = $_POST["email"];
  $name = $_POST["name"];
  $password = $_POST["password"];

  $json = file_get_contents("users.json");
	$users = json_decode($json, true);
  
  // we in there
  if (array_key_exists($email, $users) && $users[$email]["password"] == $password) {
    session_start();
    $_SESSION["email"] = $email;
    $_SESSION["logged_in"] = true;

    header("Location: index.html");
  }
  else echo "get out boy";