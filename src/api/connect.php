<?php
    
    $servername = "localhost:54321";
    $username = "root";
    $password = "y89858758";
    $dbname = 'h5-1803';

    // 创建连接
    $conn = new mysqli($servername, $username, $password, $dbname);


    // 检测连接
    // 如果失败提示错误信息
    if ($conn->connect_error){
        die("连接失败: " . $conn->connect_error);
    }
    // echo 'success';
    // 设置字符集
    $conn->set_charset('utf8');

?>