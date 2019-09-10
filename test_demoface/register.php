<?php

     header("Access-control-Allow-Origin:*");
    // header("content-type: application/json;charset=UTF-8");

    include('connect.ini.php');


//    $contentdata  = file_get_contents("php://input");
//    $getdata = json_decode($contentdata);

//    $user =   $getdata->user; 
//    $pass = $getdata->pass;

    $username =   $_POST['username']; 
    $firstname = $_POST['firstname'];
    $lastname =   $_POST['lastname']; 
    $password = $_POST['password'];
    $con_password = $_POST['con_password'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];

//    $username =   ppp; 
//     $firstname = puwa;
//     $lastname =   pha; 
//     $password = 123456;

    $sql = "INSERT INTO `member`(`faceId`, `username`, `firstname`, `lastname`, `password`, `con_password`, `email`, `tel`) 
    VALUE ('','$username','$firstname','$lastname','$password','$con_password','$email','$tel') ";
    $q = mysqli_query($con,$sql);
        if($q){
            $message = "success";
        }
        else{
            $message = "error";
        }
       echo json_encode($message);
  
 //echo mysqli_error($con);
//------------------------------
//   $input = file_get_contents('php://input');
//   $data = json_decode($input,true);
//   $message = array();
//   if($data['action'] == "insert"){
//     $username =   $data['username']; 
//      $firstname = $data['firstname'];
//     $lastname =   $data['lastname']; 
//      $password = $data['password'];

// //    $username =   "ppp2"; 
// //    $firstname = "puwa";
// //    $lastname =   "pha"; 
// //    $password = "123456789";
   
//     $sql = "INSERT INTO `member`(`username`, `firstname`, `lastname`, `password`) VALUE ('$username','$firstname','$lastname',' $password') ";
//     $q = mysqli_query($con,$sql);
//         if($q){
//             $message['status'] = "success";
//         }
//         else{
//             $message['status'] = "error";
//         }
//        echo json_encode($message);
//   }
//  echo mysqli_error($con);

  

?>