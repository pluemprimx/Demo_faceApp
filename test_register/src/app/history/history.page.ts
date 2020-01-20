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
          
        } else if(this.orders[index].customer==username){
          this.orders[index].status = "pay";
          
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
