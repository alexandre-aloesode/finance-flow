<?php
 header("Access-Control-Allow-Origin: *");

echo "hello";

$db = "mysql:host=localhost;dbname=finance-flow";

$host = "root";

$password = "";

try {
    $db = new PDO($db, $host, $password);
    // echo "connexion réussie";
    var_dump($db);
} catch(PDOException $e) {
    die('Erreur:' . $e->getMessage());
}

$request = $db->prepare('SELECT * from users');
$request->execute();
$response = $request->fetchAll();


echo json_encode($response);
?>