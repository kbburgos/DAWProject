import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AllServices} from './../services/AllServices';

@Component({
  selector: 'app-newpacient',
  templateUrl: './newpacient.component.html',
  styleUrls: ['./newpacient.component.css']
})
export class NewPacientComponent implements OnInit {
  
  constructor(private _services:AllServices,private _router: Router) { }
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

  createPacient(nombres:string,apellidos:string,ci:string,phone:string,email:string){ // crea el paciente revicen el html
    if(nombres===""||apellidos===""||ci===""){
      this.isvisible=false;
      this.errLog = "Ingrese Datos Validos";
    }else{
      
      this.isvisible = true;
      this.paciente.nombre=nombres;
      this.paciente.apellido=apellidos;
      this.paciente.cedula=ci;
      this.paciente.phone=phone;
      this.paciente.email=email;
      this._services.createPacient(this.paciente).subscribe(data=>{
        console.log(data);
        this._router.navigate(["/patients"])
        
      },err=>{
        this.isvisible = false
        this.errLog = err.error.log
      })
    }
     

  }

}
  