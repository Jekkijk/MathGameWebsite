<?php

session_start();


$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "quiz_app";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    
    $user = trim($_POST['username']);
    $pass = trim($_POST['password']);

    
    if (empty($user) || empty($pass)) {
        echo json_encode(["success" => false, "message" => "Username and password are required."]);
        exit;
    }

    
    $hashed_password = password_hash($pass, PASSWORD_DEFAULT);

    
    $checkQuery = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        
        echo json_encode(["success" => false, "message" => "Username already exists."]);
    } else {
        
        $insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("ss", $user, $hashed_password);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            
            echo json_encode(["success" => true, "message" => "User registered successfully."]);
        } else {
            
            echo json_encode(["success" => false, "message" => "Error registering user. Please try again later."]);
        }
    }

    
    $stmt->close();
    $conn->close();
} else {
    
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
