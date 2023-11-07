<?php
session_start();
 header("Access-Control-Allow-Origin: *");


$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);
    // echo "connexion réussie";
} catch(PDOException $e) {
    die('Erreur:' . $e->getMessage());
}



$request = $db->prepare('SELECT * from users WHERE mail= :mail');
$request->bindParam(':mail', $_POST['mail']);
$request->execute();
$response = $request->fetchAll();


echo json_encode($response);
?>