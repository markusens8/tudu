<?php
require_once './db.php';
session_start();

$result = executeQuery(
  "SELECT user_id, password_hash FROM users WHERE email = :email",

  [':email' => $_POST['email']]
);



$user = $result->fetchArray(SQLITE3_ASSOC);

// da login failed
if (!$user || !password_verify($_POST['password'], $user['password_hash']) ) {
  http_response_code(401);

  echo json_encode([
    "message" => "Tavs ievadītais e-pasts vai parole ir aplama, mēģini vēlreiz"
  ]);

  exit(1);
}



http_response_code(200);

session_regenerate_id(true);
$_SESSION["logged_in"] = true;
$_SESSION["user_id"] = $user["user_id"];
exit(0);
