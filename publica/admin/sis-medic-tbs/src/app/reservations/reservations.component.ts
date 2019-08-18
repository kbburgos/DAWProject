import { Component, OnInit } from '@angular/core';
import { AllServices } from "./../services/AllServices"; //EN CADA MODULO DONDE VAYAN USAR ALGUN SERVICIO DEBEN IMPORTAR ESTO
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import {DialogService}from './../services/dialogService'
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private popup:DialogService ) { }
  citas: any[];
  isvisible = true;
  errLog = "";
  paramMed =new FormControl("");
  paramPac=new FormControl("");
  dateDesde = new FormControl({value: new Date(), disabled: true});
  dateHasta = new FormControl({value: new Date(), disabled: true});
  userID = this.login.getloginData()
  param = {
    finicio:"",
    ffin:"",
    paramMed:"",
    paramPac:""
    
  }
  ngOnInit() {
    if(this.userID.RolId!=2) {
      this.paramMed.setValue(this.userID.cedula);
      
    } 
    this.top10()
  }

  private top10() { // carga el top 10
    if(this.userID.RolId!=2){
      this._services.getTop10CitasbyMed(this.userID.Cedula,"1").subscribe(rs=>{
        this.isvisible = true;
        this.citas = rs;
      },err=>{
        this.errorHandler(err);
      })
    }
    else{
      this._services.getTop10Citas().subscribe(
        data => {
         
          this.isvisible = true;
          this.citas = data;
        },
        err => {
          this.errorHandler(err);
        }
      );
    }
    
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
  public pasToUpdate(id:string){

    this.data.changeMessage(id); // este metod aun no esta listo es para la actualizacion, en teoria esto permite cominicar o enviar info de un modulo a otro
    
  }

  public deleteCita(id:String){
    this._services.deleteCita(id).subscribe(data=>{
      this.isvisible = true;
      this.top10();
      // cuando se elimine el paciente se recargara ek top10

      
    },err=>{
      this.errorHandler(err);
    });
}


public reloadData() {
  
  this.paramMed.setValue("");
  this.paramPac.setValue("");
  this.dateDesde.setValue(new Date());
  this.dateHasta.setValue(new Date());
  this.top10();

}

public search(){
    this.isvisible = true;
    this.param.paramMed = this.paramMed.value;
    this.param.paramPac = this.paramPac.value;
    this.param.finicio = this.dateDesde.value.toISOString().split("T")[0];
    this.param.ffin = this.dateHasta.value.toISOString().split("T")[0];
    
    
    this._services.getCitasbyParamDate(this.param).subscribe(rs =>{
      this.isvisible = true;
      this.citas = rs;
    },err=>{
      this.errorHandler(err);
    })


   


  

  
  
  
  
}

}
