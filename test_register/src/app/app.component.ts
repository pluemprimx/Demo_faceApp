import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    // {
    //   title: 'Register',
    //   url: '/register',
    //   icon: 'create'
    // },
    // {
    //   title: 'Log in',
    //   url: '/login',
    //   icon: 'log-in'
    // },
    {
      title: 'Product',
      url: '/product',
      icon: 'book'
    },
    {
      title: 'Cart',
      url: '/cart',
      icon: 'cart'
    },
    {
      title: 'Top up',
      url: '/topup',
      icon: 'cash'
    }
    
    // {
    //   title: 'Add Product',
    //   url: '/addproduct',
    //   icon: 'add'
    // },
    // {
    //   title: 'face',
    //   url: '/face',
    //   icon: 'qr-scanner'
    // }
  ];

  
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,private page : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

//   ionViewWillEnter() {
//     this.ngOnInit();
// }

//   ngOnInit() {
//     if (sessionStorage.getItem("username")!=null) {
//       this.username = sessionStorage.getItem("username");
//       //window.location.reload();
//     }
   
    
//  }

}
