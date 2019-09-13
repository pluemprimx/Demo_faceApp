import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';

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
  constructor(public https:HttpClient,private datapass :DatapassService) {}

  
ngOnInit():void{
  this.userData = this.datapass.loginData;
  this.username = this.datapass.username;
  this.firstname = this.datapass.firstname;
  this.lastname = this.datapass.lastname;
  this.pic = this.datapass.pic;
  console.log(this.userData);
}
  
}
