import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AllServices} from './../services/AllServices';
import { AuthService } from "../services/loginUtils/auth.service";
import { DataService } from "./../services/data.services";
import Encrypt from "../services/serealUtils/encrypt";
//var CryptoJS = require("crypto-js");


@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private _services:AllServices,private _router: Router,private login: AuthService, private data:DataService) { }
  usuario= { // deben crear una estructura de acuerdo al back para que se puedan registrar los datos, revisen los servicios que van a usar
    cedula:"",
    nombreUser:"",
    pasword: "",
    password: "",
    apellidoUser:"",
    email:"",
    phone:"",
    is_active:"",
    rol:"",
    image:""
  }
  isvisible = true;
  errLog ="";
  ngOnInit() {
  }

  //createPacient(nombres:string,apellidos:string,ci:string,phone:string,email:string){ // crea el paciente revicen el html
  createUser(){
    this.isvisible = true;
    let contra2 = ""+ $("#validationDefault04").val();
    contra2= Encrypt.cifrar(contra2);
    this.usuario.password= contra2;
    this._services.createUser(this.usuario).subscribe(data=>{
      this._router.navigate(["/user"])
    },err=>{
      console.log(err);
      this.isvisible = false
      this.errLog = err.error.log
    })
  }


  /*
  public static cifrarSha256(pass:String):String{
    return CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex)
  }
  >*/

}
