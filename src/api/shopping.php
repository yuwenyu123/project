<?php
  
  // 引入其他文件
  require('connect.php');
  //include 'connect.php'
  header('Access-Control-Allow-Origin:*');
  $sql = "SELECT * FROM `shopping` WHERE 1";

  // 查询sql语句,得到查询结果集合（对象）
  $res = $conn->query($sql);

  // 使用查询结果集,得到一个数组
  $row = $res->fetch_all(MYSQLI_ASSOC);

  //释放查询结果集，避免资源浪费
  $res->close();

  // 关闭数据库，避免资源浪费
  $conn->close();
  echo json_encode($row,JSON_UNESCAPED_UNICODE);


?>