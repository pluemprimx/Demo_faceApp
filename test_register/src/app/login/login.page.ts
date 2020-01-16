import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatapassService } from '../datapass.service';
import { AlertController } from '@ionic/angular';
import { Session } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class loginPage {

  loginData:any = {};


  // private selectedItem: any;
  // private icons = [
  //   'flask',
  //   'wifi',
  //   'beer',
  //   'football',
  //   'basketball',
  //   'paper-plane',
  //   'american-football',
  //   'boat',
  //   'bluetooth',
  //   'build'
  // ];

  // public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(public https:HttpClient,private page : Router,private datapass : DatapassService,public alertController: AlertController) {
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

 

login(){
 
  if(this.loginData.username != "" && this.loginData.password != ""){
 // console.log("uesr:",this.loginData.username);
 // console.log("password:",this.loginData.password);

  let url:string = "http://primx.online/login.php";

  let datapost = new FormData();
  datapost.append('username',this.loginData.username);
  datapost.append('password',this.loginData.password);

  let data:Observable<any> =  this.https.post(url,datapost);
  data.subscribe(res =>{
    console.log(res);
     if(res != null){
      console.log("ok");
      console.log(res[0].username);
      console.log(res[0].password);
      this.datapass.loginData = res;
      this.datapass.username = res[0].username;
      this.datapass.firstname = res[0].firstname;
      this.datapass.lastname = res[0].lastname;
      this.datapass.pic = res[0].pic0;
      this.datapass.balance = res[0].balance;
      let nextpage :string = "home";
      
      sessionStorage.setItem("username",res[0].username);
      sessionStorage.setItem("firstname",res[0].firstname);
      sessionStorage.setItem("lastname",res[0].lastname);
      sessionStorage.setItem("pic",res[0].pic0);
      sessionStorage.setItem("balance",res[0].balance);
      //sessionStorage.setItem("username",res[0].username);
      console.log(sessionStorage.getItem("username"));
      this.page.navigateByUrl(nextpage);
     }else{
      this.checkLogin();
     }
              
    }
    );
    
  }else{
    console.log(false);
    this.datapass.checkLogin = false;
    
  }
}

async checkLogin() {
  const alert = await this.alertController.create({
    header: 'login is incorrect!',
    subHeader: 'please try again',
    message: 'Username or Password is incorrect!',
    buttons: ['OK']
  });

  await alert.present();
}

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
