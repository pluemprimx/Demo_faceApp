import { Component, OnInit, Input } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  barcode:any;
  index:number = 0;
  cartData:any = {};
  shopId:any = 1;
  thisProductData:any = [];
  productQty:number = 1;
  ProductDataUpdate:any = [];
  index1:number = 0;
  isExsit:Boolean;
  cost:any = 0;
  custumer:any;
  balance:any;
  constructor(public https:HttpClient,public alertController: AlertController,private barcodeScanner: BarcodeScanner) { 
    this.encodeData = "https://www.FreakyJolly.com";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }
  
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.barcode = barcodeData.text;
        // this.barcodeArray[this.index] = this.scannedData
        // this.index = this.index+1;
        // for (let index = 0; index<this.barcodeArray.length; index++) {
        //   console.log(index);
        // console.log(this.barcodeArray[index]);
        // }
        // return this.index;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
 
 
  addToCart(){
    if(this.cartData.barcode != ""){
      console.log("barcode:",this.cartData.barcode);
    
      let url:string = "https://ptphpa.000webhostapp.com/checkProduct.php";
    
      let datapost = new FormData();
      datapost.append('shopId',this.shopId);
      datapost.append('barcode',this.cartData.barcode);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        console.log(res);
         if(res != null){
          console.log("ok");
         console.log(res[0].barcode);

         
          if(this.thisProductData[this.index-1] == null){
            this.thisProductData[this.index] = res[0];
            this.thisProductData[this.index].productQty = this.productQty;
            this.thisProductData[this.index].cost = this.thisProductData[this.index].price*this.thisProductData[this.index].productQty;
            
            console.log(this.thisProductData[this.index].price);
            console.log(this.thisProductData[this.index].cost);
            this.index = this.index + 1 ;
          }else{
          
            for (let index = 0; index<this.thisProductData.length; index++) {
              if(res[0].barcode == this.thisProductData[index].barcode){
                this.thisProductData[index].productQty = this.thisProductData[index].productQty + 1;
                this.thisProductData[index].cost = this.thisProductData[index].price*this.thisProductData[index].productQty;
               
                console.log(this.thisProductData[index].price);
                console.log(this.thisProductData[index].cost);
                this.isExsit = true;
                break;
              }else {
                this.isExsit = false;
              }
            }

            if(this.isExsit==false){
            this.thisProductData[this.index] = res[0];
            this.thisProductData[this.index].productQty = this.productQty;
            this.thisProductData[this.index].cost = this.thisProductData[this.index].price*this.thisProductData[this.index].productQty;
            console.log(this.thisProductData[this.index].price);
            console.log(this.thisProductData[this.index].cost);
            this.index = this.index + 1 ;
            this.isExsit = true;
            }

          }
          let cost = 0;
          for (let index = 0; index<this.thisProductData.length; index++) { 
            cost = cost + this.thisProductData[index].cost;
             }
          this.cost = cost;
          console.log(this.cost);
        //  this.thisProductData[this.index] = res[0];
        //  this.thisProductData[this.index].productQty = this.productQty;
         
        //  for (let index = 0; index<this.thisProductData.length; index++) {
        //         console.log(index);
        //         console.log("this : "+this.thisProductData[this.index].barcode);

        //       if(this.thisProductData[this.index].barcode == this.thisProductData[index].barcode){
        //         this.thisProductData[index].productQty = this.thisProductData[index].productQty + 1;
        //         this.index = this.index + 1 ;
        //           if(this.thisProductData[index].productQty!=0){
        //           this.ProductDataUpdate[this.index1] = this.thisProductData[this.index];
        //           this.index1 = this.index1+1;
        //           }
        //       }
        //   }
          
         
         }else{
           console.log(false);
           this.status(false);
         }
                  
        });
        
      }else{
        console.log(false);
        this.status(false);
      }
 }

 confirmOrder(){
  this.enterAccount();     
 }

 confirmOrder2(custumer){
    console.log(custumer);

     let url:string = "https://ptphpa.000webhostapp.com/checkFace.php";
      let datapost = new FormData();
      //datapost.append('shopId',this.shopId);
      datapost.append('username',custumer);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        if(res != null){
          console.log(res);
          res[0].password;
          this.checkPassword(res[0].password,res[0].username,res[0].balance);
        }else{
          this.alertUserIncorrect();
        }
      });

 }


 confirmOrder3(custumer,balance){
  console.log(custumer);

   let url:string = "https://ptphpa.000webhostapp.com/confirmOrder.php";
    let datapost = new FormData();
    datapost.append('shopId',this.shopId);
    datapost.append('customer',custumer);
    datapost.append('amount',this.cost);
    
    
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(res =>{
      if(res != 'error'){
        console.log(res);
       // res[0].password;
        //this.checkPassword(res[0].password);
      }else{
        console.log("error");
        //this.alertUserIncorrect();
      }
    });

    let url2:string = "https://ptphpa.000webhostapp.com/updateBalance.php";
    let datapost2 = new FormData();
    this.balance = balance-this.cost;
    datapost2.append('balance',this.balance);
    datapost2.append('username',custumer);
    
    
    let data2:Observable<any> =  this.https.post(url2,datapost2);
    data2.subscribe(res =>{
      if(res != 'error'){
        console.log(res);
        this.alertSuccess();
       // res[0].password;
        //this.checkPassword(res[0].password);
      }else{
        console.log("error");
        //this.alertUserIncorrect();
      }
    });


}

 ionViewWillEnter(){
 }


  encodedText() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData)
      .then(
        encodedData => {
          console.log(encodedData);
          this.encodeData = encodedData;
        },
        err => {
          console.log("Error occured : " + err);
        }
      );
  }

  async status(status) {
    if(status==true){
      const alert = await this.alertController.create({
        header: 'complete!',
        subHeader: 'added product ',
        message: 'The product has been added.',
        buttons:  [
          {
            text: 'OK',
            handler: () => {
              console.log('Confirm Okay');
              window.location.reload();
            }
          }
        ]
      });
      await alert.present();
      
    }else{
      const alert = await this.alertController.create({
        header: 'error!',
        subHeader: 'please try again',
        message: 'this product is already have',
        buttons: ['OK']
      });
      await alert.present();
    }
    
  }

  async enterAccount() {
    const alert = await this.alertController.create({
      header: 'Cofirm Order',
      inputs: [
        {
          name: 'user',
          type: 'text',
          id: 'username',
          placeholder: 'Enter your Account'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');
            this.custumer = data.user;
            //console.log(this.custumer);
            if(this.custumer !=null){
              this.confirmOrder2(data.user);
            }else{
              this.alertUserIncorrect();
            }
           
          }
        }
      ]
    });
    await alert.present();    
  }

  async checkPassword(password,user,balance) {
    const alert = await this.alertController.create({
      header: 'Cofirm Password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          id: 'password',
          placeholder: 'Enter your password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
            window.location.reload();
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Ok');
            if(password == data.password){
              console.log("success");
              this.confirmOrder3(user,balance);
            }else{
              console.log("password not compare");
              this.alertPasswordIncorrect();
            }
            //console.log(this.custumer);
            //this.alertPasswordIncorrect(data.user);
          }
        }
      ]
    });
    await alert.present();    
  }

  async alertPasswordIncorrect() {
    const alert = await this.alertController.create({
      header: 'Password Incorrect',
      //subHeader: 'Subtitle',
      message: 'Please try again',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertUserIncorrect() {
    const alert = await this.alertController.create({
      header: 'Username Incorrect',
      //subHeader: 'Subtitle',
      message: 'Please try again',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'Order Complete!',
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
  ngOnInit() {
    
  }

}
