import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastController , AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatapassService } from '../datapass.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  shopId:any = 1;
  products:any= [];
  deleteProductData:any = {};
  barcode:any;
  constructor(
    public https:HttpClient,
    public alertController: AlertController,
    public toastController: ToastController,private page : Router,private datapass :DatapassService
    ) { }

  getProduct(){
    let  url = "http://primx.online/selectProduct.php"
        
    let datapost = new FormData();
    datapost.append('shop',sessionStorage.getItem("username"));
   // datapost.append('password',this.loginData.password);
  
    let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(productData =>{
      console.log(productData);
          if(productData != null){
            console.log("ok");
  
            for (let index = 0; index < productData.length; index++) {
              this.products[index] = productData[index];
            }

       }else{
       console.log(false);
       }        
      } );
    }
  
    deleteProduct(productData){
      let  url = "http://primx.online/deleteProduct.php"
      let datapost = new FormData();
      console.log(productData.shopId);
      console.log(productData.barcode);

      datapost.append('shopId',productData.shopId);
      datapost.append('barcode',productData.barcode);

      let data:Observable<any> =  this.https.post(url,datapost);
    data.subscribe(deleteProductData =>{
      console.log(deleteProductData);
          if(deleteProductData != "error"){
            console.log("ok")
            setTimeout(() => {
              window.location.reload();
            }, 3000);
            
       }else{
       console.log(false);
       }        
      } );

    }

    updateProduct(product){
    this.datapass.barcode = product.barcode;
    let nextpage :string = "updateproduct";
    this.page.navigateByUrl(nextpage);
    console.log("updateproduct is worked");
    }

  ionViewWillEnter() {
    this.getProduct();
    
}


async confrimDelete(productData) {
  
    const alert = await this.alertController.create({
      header: 'Confrim Delete!',
      subHeader: 'You want to delete a product?',
      message: '" '+productData.productName+' "' ,
      buttons:  [
        {
          text: 'No',
          handler: () => {
            console.log('No');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteProduct(productData);
            this.presentToast(productData);
          }
        }
      ]
    });
    await alert.present();
    
}

async presentToast(productData) {
  const toast = await this.toastController.create({
    message: productData.productName+' is deleted',
    duration: 2000
  });
  toast.present();
}

  ngOnInit() {

    if (sessionStorage.getItem("username")==null) {
      let nextpage :string = "login";
      this.page.navigateByUrl(nextpage);
      console.log("next is worked");
    }
}

}