import { Component, OnInit } from '@angular/core';
import { AllServices } from "./../services/AllServices";
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-edit-pacient',
  templateUrl: './edit-pacient.component.html',
  styleUrls: ['./edit-pacient.component.css']
})
export class EditPacientComponent implements OnInit {
  
  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private _router:Router) { }
  isvisible = true;
  errLog ="";
  paciente= { 
    cedula:"",
    nombre: "",
    apellido:"",
    email:"",
    phone:""
    
  }
  ngOnInit() {
    this.data.currentMessage.subscribe ( message => {
      if(message==="vacio") this._router.navigate(["./patients"])
      
      else this.loadPatient(message)

    }
      
      );
     
  }

  loadPatient(message:string){
    this._services.getPatientByParameter(String(message)).subscribe(data=>{
      this.paciente = data[0]
      console.log(this.paciente);
      
    },err=>{
      this.errorHandler(err);
    }
    
    )
  }

  updatePatient(){
    this.isvisible = true;
    console.log(this.paciente)
      this._services.updatePatient(this.paciente.cedula,this.paciente).subscribe(data=>{
        console.log(data);
        this._router.navigate(["/patients"])
        
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

  



