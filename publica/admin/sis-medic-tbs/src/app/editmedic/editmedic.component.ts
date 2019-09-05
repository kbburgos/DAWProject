import { Component, OnInit } from '@angular/core';
import { AllServices } from "./../services/AllServices";
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-editmedic',
  templateUrl: './editmedic.component.html',
  styleUrls: ['./editmedic.component.css']
})
export class EditmedicComponent implements OnInit {

  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private _router:Router) { }
  isvisible = true;
  errLog ="";
  usuario= {
    cedula:"",
    pasword:"",
    nombreUser: "",
    apellidoUser:"",
    email:"",
    phone:"",
    is_active:"1",
    rol:"2"
  }


  ngOnInit() {
    this.data.currentMessage.subscribe ( message => {
        let rg = new RegExp("^([0-9]){10,10}$")
        if(rg.test(message))  this.loadUser(message)
        else this._router.navigate(["./medic"])

      }

    );
  }

  loadUser(message:string){
    this._services.getUserByParameter(String(message)).subscribe(data=>{
        this.usuario = data[0]
      },err=>{
        this.errorHandler(err);
      }

    )
  }

  updateUser(){
    this.isvisible = true;
    //console.log(this.usuario)
    this._services.updateUser(this.usuario.cedula,this.usuario).subscribe(data=>{
      this.data.changeMessage("El Medico se Actualizo Correctamente")
      this._router.navigate(["/medic"])

    },err=>{
      this.errorHandler(err);
    })
  }


  private errorHandler(err: any) {
    if (err.status === 401) {
      this.login.logoutUser();
    } else {
      this.isvisible = false;
      this.errLog = err.error.log;
    }
  }

}
