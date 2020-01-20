import { Component, OnInit, Input } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import Omise from 'omise-react-native';
Omise.config('pkey_test_5ilqmzh9rqew4gmwdr3', '2015-11-17');

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

  constructor(public https:HttpClient,public alertController: AlertController,private page : Router) { }

  cardData:any = {};
  token:any = {};
  cost:any;
  username:any = sessionStorage.getItem("username");
  balance:any;
  ngOnInit() {
    if (sessionStorage.getItem("username")!=null) {

    }else{
      let nextpage :string = "login";
      this.page.navigateByUrl(nextpage);
      console.log("next is worked");
    }
  
  }

  topup(){
    console.log(this.cardData.cardNumber);
    this.tokenOmise(this.cardData);
  }


  async tokenOmise(cardData) {
    this.token = await Omise.createToken({
        'card': {
            'name': cardData.name,
            'city': 'Bangkok',
            'postal_code': 10320,
            'number': cardData.cardNumber,
            'expiration_month': cardData.expiryMonth,
            'expiration_year': cardData.expiryYear,
            'security_code': cardData.CVV
        }
    });

    this.cost = cardData.cost;
    //this.token.id = data.id;
    //console.log('token : '+data.id);
    console.log(this.token.id);
    let total = this.cost*100;
    console.log('ราคารวม : '+this.cost*100);

    let url:string = "http://primx.online/checkout.php";
    let datapost = new FormData();
    datapost.append('omiseToken',this.token.id);
    datapost.append('cost',total.toString());
    
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      console.log(res.status);
      if (res.status == 'successful') {
        let omiseCost:any = ((res.amount/100)*0.0365).toFixed(2);
      let vat:any = (omiseCost*0.07).toFixed(2);
      
      let lastMoney:any = this.cost-(parseFloat(omiseCost)+parseFloat(vat));
      console.log(lastMoney);
      this.updateBalance(lastMoney);

      } else {
        this.alertError();
      }
      
      
    });

    }


    updateBalance(balance){
      let url:string = "http://primx.online/selectUserData.php";
      let datapost = new FormData();
      datapost.append('username',sessionStorage.getItem("username"));
      //datapost.append('password',this.userData.password);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        console.log(res);
        this.username = res[0].username;
        this.balance = res[0].balance;

        let newBalance:any = parseFloat(this.balance)+parseFloat(balance);
        console.log(newBalance);
          ////////////////
          let url2:string = "http://primx.online/updateBalance.php";
          let datapost2 = new FormData();
          
          datapost2.append('balance',newBalance.toFixed(2));
          datapost2.append('username',this.username);

          let data2:Observable<any> =  this.https.post(url2,datapost2);
          data2.subscribe(res =>{
            if(res != 'error'){
              console.log(res);
              this.alertSuccess();
             // res[0].password;
              //this.checkPassword(res[0].password);
            }else{
              console.log("error");
              this.alertError();
              //this.alertUserIncorrect();
            }
          });
          ///////////////
      }
      );
     
    }

    async alertSuccess() {
      const alert = await this.alertController.create({
        header: 'Top up Complete!',
        //subHeader: 'Confirm Order Success',
        message: 'Thank for top up',
       buttons: [{
        text: 'Ok',
        handler: () => {
        window.location.reload();
        }
      }]
      });
      await alert.present();
    }

    async alertError() {
      const alert = await this.alertController.create({
        header: 'Top up Error!',
        //subHeader: 'Confirm Order Success',
       // message: 'Please try again',
       buttons: [{
        text: 'Ok',
        handler: () => {
        window.location.reload();
        }
      }]
      });
      await alert.present();
    }
   
}
