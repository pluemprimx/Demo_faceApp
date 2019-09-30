import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule ,HttpHeaders,HttpRequest} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url ='https://faceprojectcskku2019.cognitiveservices.azure.com/face/v1.0'


  constructor() { }


  // faceRec(){
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
  //     console.log('JSON Response\n');
  //     console.log(jsonResponse);
  //     });
  //     }

}