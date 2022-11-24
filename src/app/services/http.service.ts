import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}
  get headers(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') as string);
    console.log(token.token);
    
    const config = new HttpHeaders({
      Accept: 'application/json ',
      'Content-Type': 'application/json',
      'x-auth-token': token.token,
    });
    return config;
  }
  
 
}