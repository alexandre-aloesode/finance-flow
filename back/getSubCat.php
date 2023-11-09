<?php
session_start();
header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);

    $request = $db->prepare('SELECT * from sub_categories WHERE id_cat= :id_cat' );
    $request->execute([
        "id_cat" => $_POST['type']
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
