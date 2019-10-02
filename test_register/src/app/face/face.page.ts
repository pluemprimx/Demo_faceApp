import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-face',
  templateUrl: './face.page.html',
  styleUrls: ['./face.page.scss'],
})
export class FacePage implements OnInit {

 
   private url ='https://ptphpa.000webhostapp.com/face.php'
  //  'use strict';
  //imageUrl ='https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';
  myphoto:any;
  facedatas:any;
  faceAttributes:any;
  faceImg:string;
  //apikey = '13935fbd64eb48c1b6db2ad3b1d48570';
   constructor(public navCtrl: NavController, private loadingCtrl:LoadingController,private http:HttpClient,private camera: Camera,private transfer: FileTransfer) { }
 
    
   takephoto(){
// let headers = new HttpHeaders();
    // //headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
    // headers.append('Ocp-Apim-Subscription-Key',this.apikey);
    let DIMENSION = 1000;
          const options :CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: false,
            targetWidth: DIMENSION,
            targetHeight: DIMENSION     
            
          }

          this.camera.getPicture(options).then(imageData=>{
            //let pic = imageData;
            this.myphoto = 'data:image/jpeg;base64,' + imageData;
            console.log(this.myphoto);
              // this.picArray[0] = pic;
              // console.log(this.picArray[0]);
              this.uploadImage(this.myphoto);

        // let datapost = new FormData(); 
        // datapost.append('faceImage',pic);
        // // datapost.append('apikey',this.apikey);
        
        //   let data:Observable<any> =  this.http.post(this.url,datapost);
        //   data.subscribe(res =>{
        //     console.log(res);
                         
        // });

      }).catch(err=>{
        console.log("Camera issue: " + err);
      });

     }


     uploadImage(myphoto){
      //Show loading
      
      //create file transfer object
      const fileTransfer: FileTransferObject = this.transfer.create();
  
      //random int
      var random = Math.floor(Math.random() * 100);
  
      //option transfer
      let options: FileUploadOptions = {
        fileKey: 'photo',
        fileName: "myImage_" + random + ".jpg",
        chunkedMode: false,
        httpMethod: 'post',
        mimeType: "image/jpeg",
        headers: {}
      }
  
      //file transfer action
      fileTransfer.upload(myphoto, 'https://ptphpa.000webhostapp.com/uploadphoto.php', options)
        .then((imgdata) => {
           console.log(imgdata.response);
          let pic = 'https://ptphpa.000webhostapp.com/'+imgdata.response;
          this.faceImg = pic;
           let datapost = new FormData(); 
        datapost.append('faceImage',pic);
        // datapost.append('apikey',this.apikey);
        
          let data:Observable<any> =  this.http.post(this.url,datapost);
          data.subscribe(res =>{
            console.log(res);
            this.facedatas = res;
            this.faceAttributes = this.facedatas[0].faceAttributes;
            console.log( this.facedatas[0].faceId);  
            console.log( this.faceAttributes);            
        });


          alert("Success");
        }, (err) => {
          console.log(err);
          alert("Error");
        });
    }

  ngOnInit() {

    
      // this.http.post(this.url, datapost, HttpRequest)
      // .subscribe(data => {
      //   console.log(data['_body']);
      //  }, error => {
      //   console.log(error);
      // });

  //   const request = require('request');
  //   const subscriptionKey = '13935fbd64eb48c1b6db2ad3b1d48570';
  //   const uriBase = this.url;
  //   const imageUrl ='https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';

  // // Request parameters.
  //     const params = {
  //       'returnFaceId': 'true',
  //       'returnFaceLandmarks': 'false',
  //       'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
  //           'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
  //     };

  //     const options = {
  //       uri: uriBase,
  //       qs: params,
  //       body: '{"url": ' + '"' + imageUrl + '"}',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Ocp-Apim-Subscription-Key' : subscriptionKey
  //       }
  //     };

  //     request.post(options, (error, response, body) => {
  //     if (error) {
  //       console.log('Error: ', error);
  //       return;
  //     }
  //     let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  //       console.log('JSON Response\n');
  //       console.log(jsonResponse);
  //     });

  }

}
