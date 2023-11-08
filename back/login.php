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
$response = $request->fetchAll(PDO::FETCH_ASSOC);

if(count($response)>0){

   if(password_verify($_POST['password'], $response[0]['password'])){

       echo json_encode(['success'=>true, "userId"=> $response[0]['id']]);
   }else{
    echo json_encode(['success'=>false]);
}
}else{
    echo json_encode(['success'=>false]);
}

?>