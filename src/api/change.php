<?php 
    require('connect.php');
    header('Access-Control-Allow-Origin:*');
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    if($type=='zeng'){
        //商品加1
        $sql = "update shopping set qty= '1'+qty where id='$id'";
        // 执行sql语句
        $conn->query($sql);
    }
    if($type=='jian'){
        $sql = "update shopping set qty= '-1'+qty where id='$id'";
        $conn->query($sql);
    }
    $sql1 = "SELECT * FROM `shopping` WHERE 1";
    // 查询sql语句,得到查询结果集合（对象）
    $res = $conn->query($sql1);

    // 使用查询结果集,得到一个数组
    $row = $res->fetch_all(MYSQLI_ASSOC);

    //释放查询结果集，避免资源浪费
    $res->close();

    // 关闭数据库，避免资源浪费
    $conn->close();
    echo json_encode($row,JSON_UNESCAPED_UNICODE);

?>