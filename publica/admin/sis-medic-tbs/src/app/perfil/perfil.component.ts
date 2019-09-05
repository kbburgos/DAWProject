import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/loginUtils/auth.service";
import { AllServices } from "../services/AllServices";
import { DataService } from "../services/data.services";
import Encrypt from "../services/serealUtils/encrypt";
import { Router } from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public usuario: any;
  public isvisible = true;
  public userID = this.login.getloginData();
  public permiso = Encrypt.validadUser(this.userID.Rol);
  public contra;
  public nombre;
  public apellido;
  public email;
  public phone;
  public cedula;
  public rol;

  constructor(private _services: AllServices, private login: AuthService, private data: DataService, private _router: Router) { }

  errLog = "";

  async ngOnInit() {

    //this.loadUser(this.userID);
    this.search(this.userID.Cedula);

  }

  search(parametro: string) {
    this._services.getUserByParameter(parametro).subscribe(
      data => {
        console.log(data[0]);

        this.isvisible = true;
        this.usuario = data[0];
        this.contra = this.usuario.pasword;
        this.nombre = this.usuario.nombreUser;
        this.apellido = this.usuario.apellidoUser;
        this.email = this.usuario.email;
        this.phone = this.usuario.phone;
        this.cedula = this.usuario.cedula;
        this.rol = this.usuario.rol;
      }
      , err => {
        if (err.status === 401) {
          this.login.logoutUser();
        } else {
          this.isvisible = false;
          this.errLog = err.error.log;
        }
      })
  }

}
