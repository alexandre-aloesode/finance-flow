<?php
session_start();
header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);

    $reqExpenses = $db->prepare('SELECT SUM(amount) from transactions WHERE id_cat= "1"' );
    $reqExpenses->execute();
    $responseExpenses = $reqExpenses->fetchAll();

    $reqIncomes = $db->prepare('SELECT SUM(amount) from transactions WHERE id_cat= "2"' );
    $reqIncomes->execute();
    $responseIncomes = $reqIncomes->fetchAll();

    if (count($responseExpenses) > 0 || count($responseIncomes) > 0) {
        echo json_encode(['success' => true, "amountExpenses" => $responseExpenses[0][0], "amountIncomes" => $responseIncomes[0][0]]);
    } else {
        echo json_encode(['success' => false]);
    }
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
