<?php

// set up connection variables
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "robot";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connection successful<br>";
}


$data = json_decode(file_get_contents("php://input"), true);

$direction = $data["direction"];
$distance = $data["distance"];
        
$query = "INSERT INTO moves (direction, distance_m) VALUES 
    ('$direction', '$distance')";

if ($conn->query($query)) {
    echo "value inserted into database";
} 
else {
    echo "error: " . $conn->error;
}



$conn->close();

?>
