<?php

require('connect.php');
header('Access-Control-Allow-Origin:*');
$username= isset($_POST['username'])?$_POST['username']:1;
$password= isset($_POST['password'])?$_POST['password']:1;
$email= isset($_POST['email'])?$_POST['email']:1;
$type= isset($_POST['type'])?$_POST['type']:1;
$sql = "SELECT * FROM `users` WHERE username='$username'";
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);
if(count($row)>0){
    echo "false";
}else if($type ==='reg'){
    $password = md5($password);
    $sql = "INSERT INTO `users`(`username`, `password`, `email`) VALUES ('$username','$password','$email')";
    $result = $conn->query($sql);
    if($result){
        echo "success";
    }else{
        echo "flase";
    }
    $conn->close();
}


?>