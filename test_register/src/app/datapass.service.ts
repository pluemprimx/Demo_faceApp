import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {
  public loginData;
  public username;
  public firstname;
  public lastname;
  public checkLogin;
  public pic;
  public balance;

  public orderId;
  public orderStatus;
  public barcode;
  constructor() { }
}
