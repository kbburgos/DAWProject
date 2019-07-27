import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardLogin implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('logeado login')
      this._router.navigate(['/home'])
      return false
    } else {
      console.log('no logeado login')            
      return true
    }
  }

  
}