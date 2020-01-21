import { Component, OnInit } from '@angular/core';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatapassService } from '../datapass.service';
@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.page.html',
  styleUrls: ['./updateproduct.page.scss'],
})
export class UpdateproductPage implements OnInit {

  constructor(public https:HttpClient,public alertController: AlertController,private page : Router,private barcodeScanner: BarcodeScanner,private datapass :DatapassService) { }

  productData:any = {};
  updateProductData:any= {};
  ngOnInit() {
    this.selectProduct(this.datapass.barcode);
  }

  selectProduct(barcode){
     if (barcode!=null) {
      let url:string = "http://primx.online/checkProduct.php";
      let datapost = new FormData();
      datapost.append('shop',sessionStorage.getItem("username"));
      datapost.append('barcode',barcode);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        console.log(res);
        this.productData = res[0];
      }); 
     } else {
       
     }
     
}

updateProduct(){
    console.log(this.productData.barcode);
    console.log(this.productData.productName);

      let url:string = "http://primx.online/updateProduct.php";
      let datapost = new FormData();
      datapost.append('shop',sessionStorage.getItem("username"));
      datapost.append('barcode',this.productData.barcode);
      datapost.append('productName',this.productData.productName);
      datapost.append('price',this.productData.price);
      datapost.append('qty',this.productData.qty);
    
      let data:Observable<any> =  this.https.post(url,datapost);
      data.subscribe(res =>{
        console.log(res);
        if (res!='error') {
          let nextpage :string = "product";
          this.page.navigateByUrl(nextpage);
        } else {
          
        }
      }); 
}

}
