<?php
session_start();
header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);

    if (isset($_POST['limit'])) {
        $limit = (int)$_POST['limit'];
        $request = $db->prepare('SELECT * from transactions WHERE id_user= :id_user ORDER BY id DESC LIMIT 4');
        $request->execute([
            'id_user' => $_POST['id_user'],
            // 'limit' => 2
        ]);
    }
    else if (isset($_POST['start_date']) && isset($_POST['end_date'])) {
        $request = $db->prepare('SELECT * from transactions WHERE id_user= :id_user AND date BETWEEN :start_date AND :end_date ORDER BY id DESC');
        $request->execute([
            'id_user' => $_POST['id_user'],
            'start_date' => $_POST['start_date'],
            'end_date' => $_POST['end_date']
        ]);
    }
    else {
        $request = $db->prepare('SELECT * from transactions WHERE id_user= :id_user ORDER BY id DESC');
        $request->execute([
            'id_user' => $_POST['id_user']
        ]);
    }

    $response = $request->fetchAll(PDO::FETCH_ASSOC);

    if (count($response) > 0) {
        echo json_encode(['success' => true, "data" => $response]);
    } else {
        echo json_encode(['success' => false]);
    }
} catch (PDOException $e) {
    die('Erreur:' . $e->getMessage());
}
