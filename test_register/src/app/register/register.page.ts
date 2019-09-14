import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HTTP } from '@ionic-native/http/ngx';
import { loginPage } from '../login/login.page';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class registerPage {

  registerData:any = {};
  username:string ;
  picArray = [];
  index:any;
  constructor(public https:HttpClient,private page : Router,public navCtrl: NavController,public alertController: AlertController,private camera: Camera) {

    
  }

    
  register(){
       if(this.registerData.password === this.registerData.con_password ){
          console.log("uesr:",this.registerData.username);
          console.log("firstName:",this.registerData.firstName);
          console.log("lastName:",this.registerData.lastName);
          console.log("password:",this.registerData.password);
          console.log("confirm password:",this.registerData.con_password);
          console.log("email",this.registerData.email);
          console.log("tel",this.registerData.tel);

          let DIMENSION = 1000;
          const options :CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            targetWidth: DIMENSION,
            targetHeight: DIMENSION     
            
          }

          this.camera.getPicture(options).then(imageData=>{
            let pic = 'data:image/jpeg;base64,' + imageData;
            //console.log(pic);
              this.picArray[0] = pic;
              console.log(this.picArray[0]);


                // this.camera.getPicture(options).then(imageData=>{
                //   let pic = 'data:image/jpeg;base64,' + imageData;
                //  // console.log(pic);
                //   this.picArray[1] = pic;
                //   console.log(this.picArray[1]);

                //   this.camera.getPicture(options).then(imageData=>{
                //     let pic = 'data:image/jpeg;base64,' + imageData;
                //    // console.log(pic);
                //     this.picArray[2] = pic;
                //     console.log(this.picArray[2]);
  
                //     this.camera.getPicture(options).then(imageData=>{
                //       let pic = 'data:image/jpeg;base64,' + imageData;
                //      // console.log(pic);
                //       this.picArray[3] = pic;
                //       console.log(this.picArray[3]);
    
                //       this.camera.getPicture(options).then(imageData=>{
                //         let pic = 'data:image/jpeg;base64,' + imageData;
                //        // console.log(pic);
                //         this.picArray[4] = pic;
                //         console.log(this.picArray[4]);
      
      
                         let url:string = "https://ptphpa.000webhostapp.com/register.php";
                              
                        let datapost = new FormData();
                        datapost.append('username',this.registerData.username);
                        datapost.append('firstname',this.registerData.firstName);
                        datapost.append('lastname',this.registerData.lastName);
                        datapost.append('password',this.registerData.password);
                        datapost.append('con_password',this.registerData.con_password);
                        datapost.append('email',this.registerData.email);
                        datapost.append('tel',this.registerData.tel);

                        for (let index = 0; index<this.picArray.length; index++) {
                          datapost.append('pic'+index,this.picArray[index]);
                        }
                                                          
                        
                        let data:Observable<any> =  this.https.post(url,datapost);
                        
                            data.subscribe(res =>{
                            console.log(res);
                            if(res === 'success'){
                              console.log("ok");
                              let nextpage :string = "login";
                              this.page.navigateByUrl(nextpage);
                            }else{
                              this.varidateUsername();
                            }              
                            });

                        console.log("uesr:",this.registerData.username);
                        console.log("ok");

                        
                //       }).catch(err=>{
                //         console.log("Camera issue: " + err);
                //       });
    
                      
                //     }).catch(err=>{
                //       console.log("Camera issue: " + err);
                //     });
  
                    
                //   }).catch(err=>{
                //     console.log("Camera issue: " + err);
                //   });


                // }).catch(err=>{
                //   console.log("Camera issue: " + err);
                // });


            }).catch(err=>{
              console.log("Camera issue: " + err);
            });


              console.log(this.picArray.length);
                        
            for (let index = 0; index<this.picArray.length; index++) {
                console.log(index);
                console.log(this.picArray[index]);
            }         
          
        }else{
          console.log("false");
          this.passwordComfirm();
        }
    
  }
  
  takePhoto(){
    
   

   // for (let index = 0; index<5; index++) {
        
  //  }
  }

 async passwordComfirm() {
  const alert = await this.alertController.create({
    header: 'please try again!',
    message: 'Password and confirm password is Mismatch!',
    buttons: ['OK']
  });

  await alert.present();
}
  
async varidateUsername() {
  const alert = await this.alertController.create({
    header: 'please try again!',
    message: 'Username is already!',
    buttons: ['OK']
  });

  await alert.present();
}
}
