<?php
require_once './db.php';
session_start();

$result = executeQuery(
  "SELECT user_id FROM users WHERE email = :email AND password_hash = :password_hash",

  [
    ':email' => $_POST['email'],
    ':password_hash' => $_POST['password']
  ]
);

$data = $result->fetchArray(SQLITE3_ASSOC);

// da login failed
if (!$data) {
  http_response_code(401);

  echo json_encode([
    "message" => "Tavs ievadītais e-pasts vai parole ir aplama, mēģini vēlreiz"
  ]);

  exit(1);
}



http_response_code(200);

session_regenerate_id(true);
$_SESSION["logged_in"] = true;
$_SESSION["user_id"] = $data["user_id"];
header("Location: ../app.html");
exit(0);