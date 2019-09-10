<?php

     header("Access-control-Allow-Origin:*");
    // header("content-type: application/json;charset=UTF-8");

    include('connect.ini.php');




    $username =   $_POST['username']; 
    $password = $_POST['password'];

    $sql = "select * from member where username='$username' AND password = '$password' ";

    $q = mysqli_query($con,$sql);
    $num = mysqli_num_rows($q);
        if($num == 1){
            $message = "success";
        }
        else{
            $message = "error";
        }
       echo json_encode($message);
?>