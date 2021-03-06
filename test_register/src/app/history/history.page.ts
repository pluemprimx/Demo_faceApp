import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from '../datapass.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  orders:any=[];
  orderDetails:any=[]
  date:any;
  time:any;

  constructor(public https:HttpClient,private page : Router,private datapass :DatapassService) { }

  ngOnInit() {
    this.showHistory();
  }

  showHistory(){
    let url:string = "http://primx.online/selectOrderHistory.php";

    let datapost = new FormData();
    let username = sessionStorage.getItem("username");
    datapost.append('username',username);
    //datapost.append('password',this.userData.password);
  
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      console.log(res);  
      for (let index = 0; index < res.length; index++) {
        this.orders[index] = res[index];
        if (this.orders[index].shop==username) {
          this.orders[index].status = "receive";
          this.formatDate(this.orders[index].date);
          this.orders[index].newDate = this.date;
          this.orders[index].time = this.time
        } else if(this.orders[index].customer==username){
          this.orders[index].status = "pay";
          this.formatDate(this.orders[index].date);
          this.orders[index].newDate = this.date;
          this.orders[index].time = this.time
        }
        console.log(this.orders[index]);
      }

    }
    );
  }

  historyDetail(orderId,status){
    console.log(orderId);
    this.datapass.orderId = orderId;
    this.datapass.orderStatus = status;
    let nextpage :string = "historydetail";
    this.page.navigateByUrl(nextpage);
    console.log("historydetail is worked");
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
  

  // modalPresent(){
  //   this.presentModal();
  // }

  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ModelPage,
  //     componentProps: {
       
  //     }
  //   });
  //   return await modal.present();
  // }

}
