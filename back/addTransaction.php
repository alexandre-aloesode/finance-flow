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
    $request = $db->prepare('INSERT INTO transactions (title,date,location,description,amount, id_user, id_cat, id_sub_cat) VALUES (:title, :date, :location, :description, :amount, :id_user, :id_cat, :id_sub_cat)');
    $request->execute([
        'title' => $_POST['title'],
        'date' => $_POST['date'],
        'location' => $_POST['location'],
        'description' => $_POST['description'],
        'amount' => $_POST['amount'],
        'id_user' => $_POST['id_user'],
        'id_cat' => $_POST['type'],
        'id_sub_cat' => $_POST['subCat'],
    ]);
    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
