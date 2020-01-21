import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historydetail',
  templateUrl: './historydetail.page.html',
  styleUrls: ['./historydetail.page.scss'],
})
export class HistorydetailPage implements OnInit {

  constructor(public https:HttpClient,private page : Router,private datapass :DatapassService) { }
  
  orderDetails:any=[];
  order:any=[];
  date:any;
  time:any;
  ngOnInit() {
    this.selectOrder(this.datapass.orderId);
    this.selectOrderDetail(this.datapass.orderId);
  }

  selectOrderDetail(orderId){
    let url:string = "http://primx.online/selectOrderDetail.php";
    let datapost = new FormData();
    //let username = sessionStorage.getItem("username");
    datapost.append('orderId',orderId);
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      for (let index = 0; index < res.length; index++) {
      console.log(res[index]);
      this.orderDetails[index] = res[index];
      }

    });
  }

  selectOrder(orderId){
    let url:string = "http://primx.online/selectOrder.php";
    let datapost = new FormData();
    //let username = sessionStorage.getItem("username");
    datapost.append('orderId',orderId);
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      console.log(res);
      this.order = res[0];
      this.order.status = this.datapass.orderStatus;
      this.formatDate(res[0].date);
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
