<?php
session_start();
header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);

    $request = $db->prepare('SELECT * from users WHERE mail= :mail' );
    $request->execute([
        "mail" => $_POST['mail']
    ]);
    $response = $request->fetchAll(PDO::FETCH_ASSOC);

    if (count($response) > 0) {

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
