import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AllServices} from './../services/AllServices';
import { AuthService } from "../services/loginUtils/auth.service";
import { DataService } from "./../services/data.services";
import Encrypt from "../services/serealUtils/encrypt";

@Component({
  selector: 'app-newmedic',
  templateUrl: './newmedic.component.html',
  styleUrls: ['./newmedic.component.css']
})
export class NewmedicComponent implements OnInit {

  constructor(private _services:AllServices,private _router: Router,private login: AuthService, private data:DataService) { }
  usuario= { // deben crear una estructura de acuerdo al back para que se puedan registrar los datos, revisen los servicios que van a usar
    cedula:"",
    nombreUser:"",
    pasword: "",
    password: "",
    apellidoUser:"",
    email:"",
    phone:"",
    is_active:"1",
    rol:"2",
    image:""
  }
  isvisible = true;
  errLog ="";
  criptado= "";

  ngOnInit() {
    this.criptado= Encrypt.cifrar( this.usuario.pasword);
    this.usuario.pasword= this.criptado;
  }

  createUser(){
    this.isvisible = true;
    let contra2 = ""+ $("#validationDefault04").val();
    contra2= Encrypt.cifrar(contra2);
    this.usuario.password= contra2;
    this._services.createUser(this.usuario).subscribe(data=>{
      //this._router.navigate(["/medic"])
    },err=>{
      console.log(err);
      this.isvisible = false
      this.errLog = err.error.log
    })
  }

}
