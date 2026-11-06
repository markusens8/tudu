<?php
require_once './db.php';


$result = executeQuery(
  "SELECT user_id FROM users WHERE email = :email OR username = :username",

	[
		':email' => $_POST['email'],
		':username' => $_POST['username']
	]
);



// basically the user entered an email that already exists
if ($result->fetchArray(SQLITE3_ASSOC)) {
  http_response_code(409);

  echo json_encode([
    "message" => "Ir radījusies neapšaubāma kļūda, jo lietotājs ar šādu e-pastu vai lietotājvārdu jau eksistē. Palūgšu izmantot citu e-pastu."
  ]);
  exit(1);
}

//checking password safety
$uppercase   = preg_match('@[A-Z]@', $_POST['password']);
$lowercase   = preg_match('@[a-z]@', $_POST['password']);
$number      = preg_match('@[0-9]@', $_POST['password']);
$specialChars = preg_match('@[^\w]@', $_POST['password']);

if (strlen($_POST['password']) < 12 || !$uppercase || !$lowercase || !$number || !$specialChars) {
	http_response_code(422);

	echo json_encode([
		"message" => "Tā parole ir pārāk vāja draudziņ. Parolei jāsastāv no vismaz 12 simboliem, viena lielā un mazā burta, viena cipara un viena īpašā simbola"
	]);
	exit(1);
}




http_response_code(201);
executeQuery(
  "INSERT INTO users(email, username, password_hash) VALUES (:email, :username, :password_hash)",

  [
    ':email' => $_POST['email'],
    ':username' => $_POST['username'],
    ':password_hash' => password_hash($_POST['password'], PASSWORD_DEFAULT)
  ]
);

echo json_encode([
  "message" => "apsveicu, tu esi veiksmīgi izveidojis jaunu kontu, tagad tu vari iejiet savā kontā"
]);
