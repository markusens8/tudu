<?php
require_once './db.php';


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

// the users password is weak
if ($_POST['password'] ) {

}


http_response_code(201);

executeQuery(
  "INSERT INTO users(email, username, password_hash) VALUES (:email, :username, :password_hash)",

  [
    ':email' => $_POST['email'],
    ':username' => $_POST['username'],
    ':password_hash' => $_POST['password']
  ]
);

echo json_encode([
  "message" => "apsveicu, tu esi veiksmīgi izveidojis jaunu kontu, tagad tu vari iejiet savā kontā"
]);