<?php 
    require('connect.php');

    header('Access-Control-Allow-Origin:*');

    $id = isset($_GET['id']) ? $_GET['id'] : null;

    $sql = "SELECT * FROM `goodslist` WHERE `index` = '$id'";

    $result = $conn -> query($sql);

    $row = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($row,JSON_UNESCAPED_UNICODE);


?>