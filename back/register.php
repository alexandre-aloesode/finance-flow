<?php
session_start();

header("Access-Control-Allow-Origin: *");

// echo "hello";

$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);
    $request = $db->prepare('INSERT INTO users (lastname,firstname,mail,password) VALUES (:lastname,:firstname,:mail,:password)');
    $request->execute([
        'lastname' => $_POST['lastname'],
        'firstname' => $_POST['firstname'],
        'mail' => $_POST['mail'],
        'password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
    ]);
    if($request){
        //request to get last insert id
        $request = $db->prepare('SELECT * FROM users WHERE id = :id');
        $request->execute([
            'id' => $db->lastInsertId()
        ]);
        $user = $request->fetch(PDO::FETCH_ASSOC);

    }
    echo json_encode(["success" => true, "data" => $user]);
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
