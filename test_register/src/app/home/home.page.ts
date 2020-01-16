import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userData;
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

    console.log(sessionStorage.getItem("firstname"));
    this.userData = this.datapass.loginData;
  //this.username = this.datapass.username;
  this.username = sessionStorage.getItem("username");
  this.firstname = sessionStorage.getItem("firstname");
  this.lastname = sessionStorage.getItem("lastname");
  this.pic = sessionStorage.getItem("pic");
  this.balance = sessionStorage.getItem("balance");
  console.log(this.userData);

  }else{
    let nextpage :string = "login";
    this.page.navigateByUrl(nextpage);
    console.log("next is worked");
  }


  
}

logout(){
  sessionStorage.removeItem("username");
  console.log("logout is worked");
  //window.location.reload();
  this.ngOnInit();
}

}
