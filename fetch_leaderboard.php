<?php
header("Content-Type: application/json");


$host = "localhost";
$dbname = "quiz_game";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $stmt = $conn->query("SELECT name, score, created_at FROM leaderboard ORDER BY score DESC, created_at ASC LIMIT 10");
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
