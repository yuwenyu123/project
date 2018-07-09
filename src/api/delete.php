<?php 
    //购物车删除接口
    require('connect.php');
    header('Access-Control-Allow-Origin:*');
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    if($type == 'yu'){
        $sql = "DELETE FROM shopping where id='$id'";
        $res = $conn->query($sql);
        // echo($res);
    }else if($type == 'quan'){
        $sql = "DELETE FROM shopping";
        $res = $conn->query($sql);
    }
    

?>