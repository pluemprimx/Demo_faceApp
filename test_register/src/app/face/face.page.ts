import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HttpClient, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-face',
  templateUrl: './face.page.html',
  styleUrls: ['./face.page.scss'],
})
export class FacePage implements OnInit {

 
   private url ='http://localhost/test_demoface/face.php'
  //  'use strict';
  imageUrl ='https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';
  //apikey = '13935fbd64eb48c1b6db2ad3b1d48570';
   constructor(private http:HttpClient,private camera: Camera) { }
 
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
            let pic = 'data:image/jpeg;base64,' + imageData;
            console.log(pic);
              // this.picArray[0] = pic;
              // console.log(this.picArray[0]);


        let datapost = new FormData(); 
        datapost.append('faceImage',pic);
        // datapost.append('apikey',this.apikey);
        
          let data:Observable<any> =  this.http.post(this.url,datapost);
          data.subscribe(res =>{
            console.log(res);
                         
        });

      }).catch(err=>{
        console.log("Camera issue: " + err);
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
