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

    $reqExpenses = $db->prepare('SELECT SUM(amount) from transactions WHERE id_cat= "1"' );
    $reqExpenses->execute();
    $responseExpenses = $reqExpenses->fetchAll();

    $reqIncomes = $db->prepare('SELECT SUM(amount) from transactions WHERE id_cat= "2"' );
    $reqIncomes->execute();
    $responseIncomes = $reqIncomes->fetchAll();

    if (count($response) > 0) {

        echo json_encode(['success' => true, "data" => $response, "amountExpenses" => $responseExpenses[0][0], "amountIncomes" => $responseIncomes[0][0]]);
    } else {
        echo json_encode(['success' => false]);
    }
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
