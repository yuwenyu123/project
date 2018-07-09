<?php
//连接数据库
require("connect.php");

header('Access-Control-Allow-Origin:*');

$sql = "SELECT * FROM `goodslist`";

//执行sql语句,查询结果
$result = $conn -> query($sql);
$row = $result -> fetch_all(MYSQLI_ASSOC);
$pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
$qty = isset($_GET['qty']) ? $_GET['qty'] : 10;
$res = array(
        'data' =>array_slice ($row,($pageNo-1)*$qty,$qty),
        'qty' =>$qty,
        'total' =>count($row)
    );
// echo json_encode($res);
echo json_encode($res,JSON_UNESCAPED_UNICODE);
$result->free(); //释放内存
$conn -> close();
// 关闭数据库，避免资源浪费

?>