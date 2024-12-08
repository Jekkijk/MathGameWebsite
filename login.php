<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "quiz_app"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}


if (!isset($_POST['username']) || !isset($_POST['password'])) {
    echo json_encode(["success" => false, "message" => "Username and password are required."]);
    exit();
}

$user = $_POST['username'];
$pass = $_POST['password'];


$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Prepare statement failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    
    $row = $result->fetch_assoc();
    
    
    if (password_verify($pass, $row['password'])) {
        echo json_encode(["success" => true, "message" => "Login successful!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid username or password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>