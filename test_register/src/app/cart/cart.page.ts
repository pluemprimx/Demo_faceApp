import { Component, OnInit } from '@angular/core';
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
  cost:number = 0;
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
         if(res != "error"){
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


  ngOnInit() {
    
  }

}
