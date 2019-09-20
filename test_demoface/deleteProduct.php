<?php

    header("Access-control-Allow-Origin:*");
    // header("content-type: application/json;charset=UTF-8");
    include('connect.ini.php');

    $shopId =   $_POST['shopId']; 
    $barcode = $_POST['barcode'];


    $sql = "DELETE  FROM `product` WHERE shopId='$shopId' and barcode='$barcode' ";
    $q = mysqli_query($con,$sql);
        if($q){
            $message = "success";
        }
        else{
            $message = "error";
        }
       echo json_encode($message);

?>