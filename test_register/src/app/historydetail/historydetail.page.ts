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
    });

  }
}
