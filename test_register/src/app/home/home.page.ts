import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
   userData:any;
   username:any;
   firstname:any ;
   lastname:any;
   pic:any;
   balance:any;
  constructor(public https:HttpClient,private page : Router,private datapass :DatapassService) {}

  ionViewWillEnter() {
    this.ngOnInit();
}
  
ngOnInit():void{
  if (sessionStorage.getItem("username")!=null) {


    let url:string = "http://primx.online/selectUserData.php";

    let datapost = new FormData();
    datapost.append('username',sessionStorage.getItem("username"));
    //datapost.append('password',this.userData.password);
  
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      console.log(res);
      this.username = res[0].username;
      this.firstname = res[0].firstname;
      this.lastname = res[0].lastname;
      this.pic = res[0].pic0;
      this.balance = res[0].balance;
    }
    );
 //   console.log(sessionStorage.getItem("firstname"));
  //   this.userData = this.datapass.loginData;
  // //this.username = this.datapass.username;
  // this.username = sessionStorage.getItem("username");
  // this.firstname = sessionStorage.getItem("firstname");
  // this.lastname = sessionStorage.getItem("lastname");
  // this.pic = sessionStorage.getItem("pic");
  // this.balance = sessionStorage.getItem("balance");
  //console.log(this.userData);

  }else{
    let nextpage :string = "login";
    this.page.navigateByUrl(nextpage);
    console.log("next is worked");
  }


  
}

history(){
  let nextpage :string = "history";
    this.page.navigateByUrl(nextpage);
    console.log("history is worked");
}

logout(){
  sessionStorage.removeItem("username");
  console.log("logout is worked");
  //window.location.reload();
  this.ngOnInit();
}

goProduct(){
  let nextpage :string = "product";
    this.page.navigateByUrl(nextpage);
    console.log("goProduct is worked");
}

goTopup(){
  let nextpage :string = "topup";
    this.page.navigateByUrl(nextpage);
    console.log("goTopup is worked");
}

goCart(){
  let nextpage :string = "cart";
    this.page.navigateByUrl(nextpage);
    console.log("goCart is worked");
}

}
