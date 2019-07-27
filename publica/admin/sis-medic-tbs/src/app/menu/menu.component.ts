import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../services/loginUtils/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  options: FormGroup;
  user=''
  dropExamen = false;
  dropOdonto = false;
  dropPerfil = false;
  constructor(fb: FormBuilder, private _auth: AuthService) {
    if(this._auth.loggedIn()){
      let data = this._auth.getloginData();
      this.user= data.Nombre+" "+data.Apellido;
    }
    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });
    $(document).ready(() =>{
      $("body").removeClass("modal-open");
      $(".modal-backdrop.show").removeClass("modal-backdrop show");
      $("body").removeAttr("style");
    });

  }
  ngOnInit() {
  }
  DropExamen() {
    this.dropExamen = !this.dropExamen;
  }
  DropOdonto() {
    this.dropOdonto = !this.dropOdonto;
  }
  DropPerfil() {
    this.dropPerfil = !this.dropPerfil;
  }
  logout(){
    this._auth.logoutUser();
  }

}
