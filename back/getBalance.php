<?php
session_start();
header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);

    if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
        $reqExpenses = $db->prepare('SELECT SUM(amount) from transactions WHERE id_user = :id_user AND id_cat= "1" AND date BETWEEN :start_date AND :end_date');
        $reqExpenses->execute([
            'id_user' => $_POST['id_user'],
            'start_date' => $_POST['start_date'],
            'end_date' => $_POST['end_date']
        ]);
        $reqIncomes = $db->prepare('SELECT SUM(amount) from transactions WHERE id_user = :id_user AND id_cat= "2" AND date BETWEEN :start_date AND :end_date');
        $reqIncomes->execute([
            'id_user' => $_POST['id_user'],
            'start_date' => $_POST['start_date'],
            'end_date' => $_POST['end_date']
        ]);
    } else {
        $reqExpenses = $db->prepare('SELECT SUM(amount) from transactions WHERE id_user = :id_user AND id_cat= "1"');
        $reqExpenses->execute([
            'id_user' => $_POST['id_user']
        ]);
        $reqIncomes = $db->prepare('SELECT SUM(amount) from transactions WHERE id_user = :id_user AND id_cat= "2"');
        $reqIncomes->execute([
            'id_user' => $_POST['id_user']
        ]);
    }

    $responseExpenses = $reqExpenses->fetchAll();
    $responseIncomes = $reqIncomes->fetchAll();

    if (count($responseExpenses) > 0 || count($responseIncomes) > 0) {
        if($responseExpenses[0][0] == null) {
            $responseExpenses[0][0] = 0;
        }
        if($responseIncomes[0][0] == null) {
            $responseIncomes[0][0] = 0;
        }
        echo json_encode(['success' => true, "amountExpenses" => (int)$responseExpenses[0][0], "amountIncomes" => (int)$responseIncomes[0][0]]);
    } else {
        echo json_encode(['success' => false]);
    }
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
