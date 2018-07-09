<?php
    header('Access-Control-Allow-Origin:*');
    session_start();
    // if($_SESSION['name']){
    echo $_SESSION['name'];  
    // }else{
        // echo 'false';
    // }
?>