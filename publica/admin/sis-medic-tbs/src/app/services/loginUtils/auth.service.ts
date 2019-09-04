import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {Router} from '@angular/router';


@Injectable()
export class AuthService {
  private _isLog=false;
  private _urlAPI = "http://localhost:3000/api/login/";
  

  constructor(private http: HttpClient, private router: Router ) {
   

  }
  isLog(){
    return this._isLog;
  }
   loginUser(user:any){
    localStorage.removeItem('login');
    this._isLog=true;
    return this.http.post<any>(this._urlAPI+'ingresar',user,{observe: 'response'});
  }

  logoutUser(){
  localStorage.removeItem('login');
  this.router.navigate(['/']);
   
  }

  getloginData(){
    if(this.loggedIn()){
      return JSON.parse(localStorage.getItem('login'));
    }
    return null;
  }

  getToken() {
    let data = this.getloginData();
    if(data!=null)
      return data.Token;
    else return '';
  }



  loggedIn() {
    return !!localStorage.getItem('login');    
  }


}