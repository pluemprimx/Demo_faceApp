import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.loginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.registerPageModule)
  },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'product', loadChildren: './product/product.module#ProductPageModule' },
  { path: 'addproduct', loadChildren: './addproduct/addproduct.module#AddproductPageModule' },
  { path: 'face', loadChildren: './face/face.module#FacePageModule' },
  { path: 'topup', loadChildren: './topup/topup.module#TopupPageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'historydetail', loadChildren: './historydetail/historydetail.module#HistorydetailPageModule' },
  { path: 'history-topup', loadChildren: './history-topup/history-topup.module#HistoryTopupPageModule' },
  { path: 'updateproduct', loadChildren: './updateproduct/updateproduct.module#UpdateproductPageModule' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
