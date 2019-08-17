import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AllServices} from './../services/AllServices';
import { AuthService } from "../services/loginUtils/auth.service";
import { DataService } from "./../services/data.services";
@Component({
  selector: 'app-newpacient',
  templateUrl: './newpacient.component.html',
  styleUrls: ['./newpacient.component.css']
})
export class NewPacientComponent implements OnInit {
  
  constructor(private _services:AllServices,private _router: Router,private login: AuthService, private data:DataService) { }
  paciente= { // deben crear una estructura de acuerdo al back para que se puedan registrar los datos, revisen los servicios que van a usar
    cedula:"",
    nombre: "",
    apellido:"",
    email:"",
    phone:""
    
  }
  isvisible = true;
  errLog ="";
  ngOnInit() {
    

  }

  //createPacient(nombres:string,apellidos:string,ci:string,phone:string,email:string){ // crea el paciente revicen el html
  createPacient(){

      this.isvisible = true;
      this._services.createPacient(this.paciente).subscribe(data=>{
        console.log(data);
        this.data.changeMessage("El Paciente se Creo Correctamente")
        this._router.navigate(["/patients"])
        
      },err=>{
        this.errorHandler(err);
      })
    }
    


    private errorHandler(err: any) {
      if (err.status === 401) { // si el status del response es 401 quiere decir que el usuario no esta autorizado o que la sesion caduco por lo que se cierra la secion
                                // y se lo reenvia al loguin
        this.login.logoutUser();
      } else {
        this.isvisible = false; // si el error es diferente se mostrara un mensajito en el front para ver el resultado busquen un paciente que no exista
        this.errLog = err.error.log;
      }
    }

  

}
  