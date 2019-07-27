import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req:any, next:any) {
    let authService = this.injector.get(AuthService)
    let tokenizedReq = req.clone(
      {
       
        headers: req.headers.set('Authorization', authService.getToken() )
       
      }
    )
    console.log( authService.getToken())
    console.log("header")
    return next.handle(tokenizedReq)
  }

}