import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-topup',
  templateUrl: './history-topup.page.html',
  styleUrls: ['./history-topup.page.scss'],
})
export class HistoryTopupPage implements OnInit {

  constructor(public https:HttpClient,private page : Router) { }

  topupData:any=[];
  date:any;
  time:any;
  ngOnInit() {
    this.selectTopupLog();
  }

  selectTopupLog(){
    let url:string = "http://primx.online/selectTopupLog.php";
    let datapost = new FormData();
    let username = sessionStorage.getItem("username");
    datapost.append('username',username);
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      console.log(res);
      for (let index = 0; index < res.length; index++) {
        this.topupData[index] = res[index];
        this.formatDate(this.topupData[index].date);
        this.topupData[index].newDate = this.date;
        this.topupData[index].time = this.time
      }
    
     
    });

  }

  formatDate(oldDate){
    var date = new Date(oldDate); // had to remove the colon (:) after the T in order to make it work
    var day = date.getDate();
    var monthIndex = date.getMonth();    
    let b:any;
    switch(monthIndex+1){
        case 1: b = "January";
            break;
        case 2: b = "February";
            break;
        case 3: b = "March";
            break;
        case 4: b = "April";
            break;
        case 5: b = "May";
            break;
        case 6: b = "June"; 
            break;
        case 7: b = "July";
            break;
        case 8: b = "August";
            break;
        case 9: b = "September";
            break;
        case 10: b = "October";
            break;
        case 11: b = "November";
            break;
        case 12: b = "December";
            break;
        }
    let month:any = b;
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var myFormattedDate = day+" "+month+" "+year;
    var myFormattedtime = hours+":"+minutes+":"+seconds;
    this.date = myFormattedDate;
    this.time = myFormattedtime;
    console.log(this.date+"  "+this.time)
  }
}
