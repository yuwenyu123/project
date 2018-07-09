<?php

include('connect.php');
header('Access-Control-Allow-Origin:*');
session_start();
$username = isset($_POST['username']) ? $_POST['username'] :null;
$password = isset($_POST['password']) ? $_POST['password'] :null;
$type = isset($_POST['type']) ? $_POST['type'] :null;
// 查找数据库判断用户名是否存在

if($type ==='reg'){
    //解密=密码 md5(str)
    $password=md5($password);
}
$sql="SELECT * FROM `users` WHERE username='$username' and password='$password'";
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);
if(count($row) > 0){
    $_SESSION['name'] = $username;
    echo "{status: true}";
} else {
    echo "{status: false, message: 'username or password error'}";
}

$result->free(); //释放内存
$conn->close();



?>