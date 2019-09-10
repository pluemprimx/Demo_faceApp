import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HTTP } from '@ionic-native/http/ngx';
import { loginPage } from '../login/login.page';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class registerPage {

  registerData:any = {};

  constructor(public https:HttpClient,private page : Router) {

    this.registerData.uesrname = "";
    this.registerData.firstName = "";
    this.registerData.lastName = "";
    this.registerData.password = "";
  }

  // checkpassword(password,con_password){
  //   console.log("password:",password);
  //   console.log("confirm password:",con_password);
    
  // }

  register(){
      if(this.registerData.username != "" 
      &&  this.registerData.firstName != "" 
      && this.registerData.lastName != "" 
      && this.registerData.password != ""
      && this.registerData.con_password != ""
      && this.registerData.email != ""
      && this.registerData.tel != ""){
          console.log("uesr:",this.registerData.username);
          console.log("firstName:",this.registerData.firstName);
          console.log("lastName:",this.registerData.lastName);
          console.log("password:",this.registerData.password);
          console.log("confirm password:",this.registerData.con_password);
          //this.registerData.action = "insert";
          let url:string = "http://localhost/test_demoface/register.php";
          // let dataPost = JSON.stringify({
          //       username:this.registerData.username,
          //       firstName:this.registerData.firstName ,
          //       lastName:this.registerData.lastName ,
          //       password:this.registerData.password
          // });
          let datapost = new FormData();
          datapost.append('username',this.registerData.username);
          datapost.append('firstname',this.registerData.firstName);
          datapost.append('lastname',this.registerData.lastName);
          datapost.append('password',this.registerData.password);
          datapost.append('con_password',this.registerData.con_password);
          datapost.append('email',this.registerData.email);
          datapost.append('tel',this.registerData.tel);
                 
          
          let data:Observable<any> =  this.https.post(url,datapost);
          //  .map(res=>res.json())
         data.subscribe(res =>{
          console.log(res);
           if(res === 'success'){
             console.log("ok")
            let nextpage :string = "login";
            this.page.navigateByUrl(nextpage);
           }              
          });
          
        }else{
          console.log("false");
          // alert("Please fill out all information.");
        }
    
  }

  //  register(){
  //     if(this.registerData.uesrname != "" &&  this.registerData.firstName != "" && this.registerData.lastName != "" && this.registerData.password != ""){
  //         console.log("uesr:",this.registerData.uesrname);
  //         console.log("firstName:",this.registerData.firstName);
  //         console.log("lastName:",this.registerData.lastName);
  //         console.log("password:",this.registerData.password);

  //         this.registerData.action = "insert";
  //         this.http.post("http://localhost/test_demoface/register.php",this.registerData,).subscribe(data=>{console.log(data);
  //         let result = JSON.parse(data["_body"]);
  //         if(result.status == "success"){
  //           console.log("Inserted successfully");
  //         }else{
  //           console.log("Something went wrong");
  //           }
            
  //         })

  //       }else{
  //         console.log("false");
  //       }
    
 // }

  
}
