<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "quiz_app"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully to the database.";
}

$conn->close();
?>