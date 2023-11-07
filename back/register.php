<?php
session_start();

header("Access-Control-Allow-Origin: *");

// echo "hello";

$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);
    // echo "connexion réussie";
    var_dump($db);
} catch(PDOException $e) {
    die('Erreur:' . $e->getMessage());
}

$request = $db->prepare('INSERT INTO users (lastname,firstname,mail,password) VALUES (:lastname,:firstname,:mail,:password)');
$request->execute([
    'lastname' => $_POST['lastname'],
    'firstname' => $_POST['firstname'],
    'mail' => $_POST['mail'],
    'password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
]);

// echo json_encode(["success" => true]);

//echo json_encode($response);
?>