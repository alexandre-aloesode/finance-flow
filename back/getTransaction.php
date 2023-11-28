<?php
session_start();
header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);

    $request = $db->prepare('SELECT * from transactions WHERE id_user= :id_user ORDER BY id DESC' );
    $request->execute([
        "id_user" => $_POST['id_user']
    ]);
    $response = $request->fetchAll(PDO::FETCH_ASSOC);

    if (count($response) > 0) {
        echo json_encode(['success' => true, "data" => $response]);
    } else {
        echo json_encode(['success' => false]);
    }
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
