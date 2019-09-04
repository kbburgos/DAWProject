import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/loginUtils/auth.service";
import {AllServices} from "../services/AllServices";
import {DataService} from "../services/data.services";
import Encrypt from "../services/serealUtils/encrypt";
import {Router} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  private usuario: any;
  private isvisible = true;
  private userID = this.login.getloginData();
  private permiso = Encrypt.validadUser(this.userID.Rol);
  private  contra;
  private nombre;
  private  apellido;
  private email;
  private phone;
  private cedula;
  private rol;

  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private _router:Router) { }

  errLog ="";

  async ngOnInit() {
    console.log(this.userID);
    console.log(this.permiso);//es administrador
    //this.loadUser(this.userID);
    await this.search(this.userID.Cedula);
    console.log(this.usuario);
    console.log(this.usuario.pasword);
    this.contra = this.usuario.pasword;
    this.nombre =  this.usuario.nombreUser;
    this.apellido = this.usuario.apellidoUser;
    this.email =  this.usuario.email;
    this.phone= this.usuario.phone;
    this.cedula= this.usuario.cedula;
    this.rol= this.usuario.rol;
  }

  async search(parametro: string) {
      await this._services.getUserByParameter(parametro).toPromise().then(
        data => {
          this.isvisible = true;
          console.log(data);
          this.usuario = data[0];
          console.log(data[0].pasword);
        }
      ).catch(err => {
        if (err.status === 401) {
          this.login.logoutUser();
        } else {
          this.isvisible = false;
          this.errLog = err.error.log;
        }
      })
  }


  /*loadUser(message:string){
    this._services.getUserByParameter(String(message)).subscribe(data=>{
        this.usuario = data[0];
      }
    )
  }*/

}
