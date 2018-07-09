<?php 
    require('connect.php');
    header('Access-Control-Allow-Origin:*');

    //获取前端数据
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $node = isset($_GET['node']) ? $_GET['node'] : null;
    $type = isset($_GET['dataType']) ? $_GET['dataType'] : null;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : null;
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $imgurl = isset($_GET['imgurl']) ? $_GET['imgurl'] : null;
  
    $sql = "SELECT * FROM `shopping` WHERE `id` = '$id'";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        //判断如果数据库存在这个商品，则加1
        $sql = "update shopping set qty='$qty'+qty where id='$id'";
        // 执行sql语句
        $res = $conn->query($sql);
        echo "success";
    }else{
        // 加入购物车（保存到数据库）
        $sql = "INSERT INTO `shopping`(`id`, `name`,`price`, `qty`,`node`,`imgurl`) VALUES ('$id','$name','$price','$qty','$node','$imgurl')";
        // 执行sql语句
        $res = $conn->query($sql);
        // if($res){
        //     echo "wu_error";
        // }else{
        //     echo "wu_ok";
        // }
        echo "fail";
    }


?>