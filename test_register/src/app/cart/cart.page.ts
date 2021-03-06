import { Component, OnInit, Input } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import Omise from 'omise-react-native';
import { Router } from '@angular/router';
Omise.config('pkey_test_5ilqmzh9rqew4gmwdr3', '2015-11-17');

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
  token:any = {};
  finalProductData:any = [];
 
  constructor(public https:HttpClient,public alertController: AlertController,private page : Router,private barcodeScanner: BarcodeScanner) { 
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
    
      let url:string = "http://primx.online/checkProduct.php";
    
      let datapost = new FormData();
      datapost.append('shop',sessionStorage.getItem("username"));
      datapost.append('barcode',this.cartData.barcode);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        console.log(res);
         if(res != "error"&&res != null){
          console.log("ok");
         console.log(res[0].barcode);
         console.log(res[0].qty);
         let countQty = res[0].qty;
         if (countQty!=0) { //if check qty
                             
          if(this.thisProductData[this.index-1] == null){
           
            this.thisProductData[this.index] = res[0];
            this.thisProductData[this.index].productQty = this.productQty;
            this.thisProductData[this.index].cost = this.thisProductData[this.index].price*this.thisProductData[this.index].productQty;
            
            console.log(this.thisProductData[this.index].productQty);
            console.log(this.thisProductData[this.index].cost);
            this.index = this.index + 1 ;

         
          }else{
          
            for (let index = 0; index<this.thisProductData.length; index++) {
              if(res[0].barcode == this.thisProductData[index].barcode){
               if (countQty-this.thisProductData[index].productQty!=0) {
                  this.thisProductData[index].productQty = this.thisProductData[index].productQty + 1;
                  this.thisProductData[index].cost = this.thisProductData[index].price*this.thisProductData[index].productQty;
               
                  console.log(this.thisProductData[index].productQty);
                  console.log(this.thisProductData[index].cost);
                  this.isExsit = true;
                  break;

                } else {
                  this.alertCheckQty();
                  this.isExsit = true;
                  break;
                }              
              }else {
                this.isExsit = false;
              }

            
            }

            if(this.isExsit==false){
              
            this.thisProductData[this.index] = res[0];
            this.thisProductData[this.index].productQty = this.productQty;
            this.thisProductData[this.index].cost = this.thisProductData[this.index].price*this.thisProductData[this.index].productQty;

            console.log(this.thisProductData[this.index].productQty);
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
        for (let index = 0; index < this.thisProductData.length; index++) {
          this.finalProductData[index] = this.thisProductData[index];
          this.finalProductData[index].updateQty = parseInt(this.thisProductData[index].qty) - parseInt(this.thisProductData[index].productQty);
          console.log(this.thisProductData[index]);
        }

      } else {//else check qty
        this.alertCheckQty();
        
      }
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
  //this.testOmise();
  // console.log(this.token.id);
  // console.log('ราคารวม : '+this.cost);
 }

 confirmOrder2(custumer){
    console.log(custumer);

     let url:string = "http://primx.online/checkFace.php";
      let datapost = new FormData();
      //datapost.append('shopId',this.shopId);
      datapost.append('username',custumer);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        if(res != null){
          console.log(res);
          this.checkPassword(res[0].password,res[0].username,res[0].balance,this.cost);
        }else{
          this.alertUserIncorrect();
        }
      });

 }


 confirmOrder3(custumer,balance){
  console.log(custumer);

    this.addOrder(custumer);
    this.updateCustumerBalance(custumer,balance);
    this.updateShopBalance();
    this.updateProduct();
    
}


addOrder(custumer){
  let url:string = "http://primx.online/confirmOrder.php";
  let datapost = new FormData();
 //datapost.append('shopId',this.shop);
  datapost.append('shop',sessionStorage.getItem("username"));
  datapost.append('customer',custumer);
  datapost.append('amount',this.cost);
  
  
  let data:Observable<any> =  this.https.post(url,datapost);
  data.subscribe(res =>{
    if(res != null){
      console.log(res[0].orderId);
      let orderId = res[0].orderId;
     this.addOrderDetail(orderId);
     }else{
      console.log("error");
    //   //this.alertUserIncorrect();
     }
  });
}

addOrderDetail(orderId){
  for (let index = 0; index < this.thisProductData.length; index++) {
    if (this.thisProductData[index].shop.toString() == sessionStorage.getItem("username")) {
      let url:string = "http://primx.online/addOrderDetail.php";
      let datapost = new FormData();
      datapost.append('orderId',orderId);
      datapost.append('barcode',this.thisProductData[index].barcode);
      datapost.append('qty',this.thisProductData[index].productQty);
      datapost.append('amount',this.thisProductData[index].cost);
      console.log("addOrderDetail : "+this.thisProductData[index].productName);
      
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        if(res != null){
          console.log(res);
          
         }else{
          console.log("error");
        //   //this.alertUserIncorrect();
         }
      });
    } else {
      console.log("error");
    }
 
}
}


updateCustumerBalance(custumer,balance){
    let Userbalance = parseFloat(balance)-parseFloat(this.cost);
    
    let url2:string = "http://primx.online/updateBalance.php";
    let datapost2 = new FormData();
    datapost2.append('balance',Userbalance.toFixed(2));
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

updateShopBalance(){

  let url:string = "http://primx.online/selectUserData.php";

  let datapost = new FormData();
  let username = sessionStorage.getItem("username");
  datapost.append('username',username);
  //datapost.append('password',this.userData.password);
  let data:Observable<any> =  this.https.post(url,datapost);
  data.subscribe(res =>{

    console.log(res);
    let shopbalance = res[0].balance;

    let url2:string = "http://primx.online/updateBalance.php";
    let datapost2 = new FormData();
    let newBalance = parseFloat(shopbalance)+parseFloat(this.cost);

    datapost2.append('balance',newBalance.toFixed(2));
    datapost2.append('username',username);

    let data2:Observable<any> =  this.https.post(url2,datapost2);
    data2.subscribe(res =>{
      if(res != 'error'){
        console.log(res);
        console.log("updateShopBalance ok");
        //this.alertSuccess();
       // res[0].password;
        //this.checkPassword(res[0].password);
      }else{
        console.log("updateShopBalance error");
        //this.alertUserIncorrect();
      }
    });     

  }
  );
  for (let index = 0; index < this.thisProductData.length; index++) {
    console.log(this.thisProductData[index]);
  }
 
}

updateProduct(){

  for (let index = 0; index < this.finalProductData.length; index++) {
    console.log(this.finalProductData[index]);

    let url2:string = "http://primx.online/updateProductAfterConfrim.php";
    let datapost2 = new FormData();
    let username = sessionStorage.getItem("username");
    datapost2.append('shop',username);
    datapost2.append('barcode',this.finalProductData[index].barcode);
    datapost2.append('qty',this.finalProductData[index].updateQty);
    
    let data2:Observable<any> =  this.https.post(url2,datapost2);
    data2.subscribe(res =>{
      if(res != 'error'){
        console.log(res);
        console.log("updateProduct ok");
       // this.alertSuccess();
       // res[0].password;
        //this.checkPassword(res[0].password);
      }else{
        console.log("updateProduct error");
        //this.alertUserIncorrect();
      }
    });     
  }

  
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
            console.log(this.custumer);
            if(this.custumer !=null){
              if (this.custumer!=sessionStorage.getItem("username")) {
                this.confirmOrder2(data.user);
              } else {
                this.alertUserAsShop();
              }
             
            }else{
              this.alertUserIncorrect();
            }
           
          }
        }
      ]
    });
    await alert.present();    
  }

  async checkPassword(password,user,balance,cost) {
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
              let checkbalance = parseFloat(balance) - parseFloat(cost);
              console.log(checkbalance);
              if (checkbalance>=0) {
                this.confirmOrder3(user,balance);
              } else {
                this.alertTopup();
              }
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

  async alertUserAsShop() {
    const alert = await this.alertController.create({
      header: 'Username as shop!',
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

  async alertCheckQty() {
    const alert = await this.alertController.create({
      header: 'Product not enough',
      //subHeader: 'Subtitle',
      message: 'Please try again',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertTopup() {
    const alert = await this.alertController.create({
      header: 'balance not enough',
      //subHeader: 'Subtitle',
      message: 'Please top up',
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
    if (sessionStorage.getItem("username")==null) {
      let nextpage :string = "login";
      this.page.navigateByUrl(nextpage);
      console.log("next is worked");
    }
    
  }

  
  async testOmise() {
    this.token = await Omise.createToken({
        'card': {
            'name': 'JOHN DOE',
            'city': 'Bangkok',
            'postal_code': 10320,
            'number': '4242424242424242',
            'expiration_month': 10,
            'expiration_year': 2020,
            'security_code': 123
        }
    });
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
      console.log(res);

    });

    }




}
