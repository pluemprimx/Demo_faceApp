import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  shopId:any = 1;
  products:any= [];
  constructor(public https:HttpClient) { }

  

  ngOnInit() {

  let  url = "http://localhost/test_demoface/selectProduct.php"
        
  let datapost = new FormData();
  datapost.append('shopId',this.shopId);
 // datapost.append('password',this.loginData.password);

  let data:Observable<any> =  this.https.post(url,datapost);
  data.subscribe(productData =>{
    console.log(productData);
        if(productData != null){
          console.log("ok");

          for (let index = 0; index < productData.length; index++) {
            this.products[index] = productData[index];
          }
        

    //   console.log(res[0].username);
    //   console.log(res[0].password);
    //   this.datapass.loginData = res;
    //   this.datapass.username = res[0].username;
    //   this.datapass.firstname = res[0].firstname;
    //   this.datapass.lastname = res[0].lastname;
    //   this.datapass.pic = res[0].pic0;
    //   let nextpage :string = "home";
    //   this.page.navigateByUrl(nextpage);
     }else{
     // this.checkLogin();
     console.log(false);
     }        
    } );
  }

}
