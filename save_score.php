<?php
header("Content-Type: application/json");


$host = "localhost";
$dbname = "quiz_game";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $score = $data['score'];

    
    $stmt = $conn->prepare("INSERT INTO leaderboard (name, score) VALUES (:name, :score)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':score', $score);
    $stmt->execute();

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>
