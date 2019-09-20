<?php
    header("Access-control-Allow-Origin:*");
    // header("content-type: application/json;charset=UTF-8");
    include('connect.ini.php');
    
    $shopId =   $_POST['shopId']; 
    //$barcode = $_POST['barcode'];

    $sql = "select * from product where shopId='$shopId'  ";
    
    $q = mysqli_query($con,$sql);

    $num = mysqli_num_rows($q);
        if($num >= 1){
            $message = "success";
             while ($row=mysqli_fetch_object($q)){
                $data[]=$row;
               }
               echo json_encode($data);
        }
        else{
            $message = "don't have product";
        }




?>