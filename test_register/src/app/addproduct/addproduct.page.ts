import { Component, OnInit } from '@angular/core';
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { ViewController } from '@ionic/core';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})

export class AddproductPage implements OnInit {
  
  productData:any = {};
  shopId:any = 1;
  barcode:any;
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public https:HttpClient,
    private page : Router,
    public alertController: AlertController,
    private zone: NgZone
    ){ 
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  addproduct(){
    if(this.shopId != "" && this.productData.barcode != ""){
       console.log("shopId:",this.shopId);
       console.log("barcode:",this.productData.barcode);
     
       let url:string = "http://primx.online/addproduct.php";
     
       let datapost = new FormData();
       datapost.append('shopId',this.shopId);
       datapost.append('barcode',this.productData.barcode);
       datapost.append('productName',this.productData.productName);
       datapost.append('price',this.productData.price);
       datapost.append('qty',this.productData.qty);
     
       let data:Observable<any> =  this.https.post(url,datapost);
       data.subscribe(res =>{
         console.log(res);
          if(res != "error"){
           console.log("ok");
           console.log(res[0].barcode);
           this.status(true);
          
           //this.refresh();
           //this.navCtrl.setRoot(this.navCtrl.getActive().component);
          //  let nextpage :string = "product";
          //  this.page.navigateByUrl(nextpage);
          
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

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
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
