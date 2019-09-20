<?php

    header("Access-control-Allow-Origin:*");
    // header("content-type: application/json;charset=UTF-8");
    include('connect.ini.php');

    $shopId =   $_POST['shopId']; 
    $barcode = $_POST['barcode'];
    $productName =   $_POST['productName']; 
    $price = $_POST['price'];
    $qty = $_POST['qty'];


    $sql = "INSERT INTO `product`(`shopId`, `barcode`, `productName`, `price`, `qty`) VALUE ('$shopId','$barcode','$productName','$price','$qty') ";
    $q = mysqli_query($con,$sql);
        if($q){
            $message = "success";
        }
        else{
            $message = "error";
        }
       echo json_encode($message);

?>