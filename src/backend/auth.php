<?php
require_once './db.php';
header("Content-Type: application/json");


$result = executeQuery(
  "SELECT user_id FROM users WHERE email = :email",

  [':email' => $_POST['email']]
);

// basically the user entered an email that already exists
if ($result->fetchArray(SQLITE3_ASSOC)) {
  http_response_code(409);

  echo json_encode([
    "message" => "Ir radījusies neapšaubāma kļūda, jo lietotājs ar šādu e-pastu jau eksistē. Palūgšu izmantot citu e-pastu."
  ]);

  exit(1);
}



http_response_code(201);

executeQuery(
  "INSERT INTO users(email, username, password) VALUES (:email, :username, :password)",

  [
    ':email' => $_POST["email"],
    ':username' => $_POST["username"],
    ':password' => $_POST["password"]
  ]
);

echo json_encode([
  "message" => "apsveicu, tu esi veiksmīgi izveidojis jaunu kontu"
]);