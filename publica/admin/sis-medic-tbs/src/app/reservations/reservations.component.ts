import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AllServices } from "./../services/AllServices"; //EN CADA MODULO DONDE VAYAN USAR ALGUN SERVICIO DEBEN IMPORTAR ESTO
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import {DialogService}from './../services/dialogService'
import {FormControl} from '@angular/forms';
import Encrypt from './../services/serealUtils/encrypt'
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  
  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private popup:DialogService ) { 
    
  }
  citas: any[];
  selected :  { startDate :  moment.Moment , endDate :  moment.Moment }  ;

  arrdate(op:number){
    moment.locale('es');
    
    if(op===1){
      return moment.weekdaysMin()
    }
    return  moment.monthsShort()
  }

  local:any={
    format: 'YYYY-MM-DD',
    direction: 'ltr', // could be rtl
    weekLabel: 'W',
    separator: ' a ', // default is ' - '
    //cancelLabel: 'Cancelar', // detault is 'Cancel'
    applyLabel: 'Okay', // detault is 'Apply'
    clearLabel: 'Cerrar', // detault is 'Clear'
    daysOfWeek: this.arrdate(1),
    monthNames:this.arrdate(0),
    firstDay: 1, // first day is monday
    Position:"Center",
    showRangeLabelOnInput:true

}
  isvisible = true;
  errLog = "";
  paramMed =new FormControl("");
  paramPac=new FormControl("");
  userID = this.login.getloginData()
  permiso = Encrypt.validadUser(this.userID.Rol)
  param = {
    finicio:"",
    ffin:"",
    paramMed:"",
    paramPac:"",
    active:1
  }
  ngOnInit() {
    if(!this.permiso) {
      this.paramMed.setValue(this.userID.cedula);
      
    } 
    this.top10()
    this.data.currentMessage.subscribe(message => {
     
      if(message.indexOf("Cita se Actualizo")>-1){
        this.popup.openConfirmDialog(message);
      }
    })
    console.log(this.permiso,"hola");
    
  }

  private top10() { // carga el top 10
    if(!this.permiso){
      this._services.getTop10CitasbyMed(this.userID.Cedula,"1").subscribe(rs=>{
        this.isvisible = true;
        this.citas = rs;
      },err=>{
        this.errorHandler(err);
      })
    }
    else{
      this._services.getTop10Citas("1").subscribe(
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
  public pasToUpdate(id:any){
    this.data.changeMessage(JSON.stringify(id)); // este metod aun no esta listo es para la actualizacion, en teoria esto permite cominicar o enviar info de un modulo a otro
    
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


public reloadData(obj:any) {
  obj.value="";
  this.paramMed.setValue("");
  this.paramPac.setValue("");
  this.selected.endDate=null;
  this.selected.startDate=null;
  this.top10();

}

public search(obj:any){
    if(obj.value!=""){
      
      if(Date.parse(obj.value.split(" a ")[0])===NaN||Date.parse(obj.value.split(" a ")[1])===NaN){
        
        this.isvisible = false; // si el error es diferente se mostrara un mensajito en el front para ver el resultado busquen un paciente que no exista
        this.errLog = "Los campos de fecha tienen caracteres incorrectos";
        return;
       }
    }
    this.isvisible = true;
    this.param.paramMed = this.paramMed.value;
    this.param.paramPac = this.paramPac.value;

    this.param.finicio = (this.selected.startDate!=null&&obj.value!="")?this.selected.startDate.toISOString().split("T")[0]:"";
    this.param.ffin =(this.selected.endDate!=null&&obj.value!="")?this.selected.endDate.toISOString().split("T")[0]:"";
    
    let val =this.param.paramPac ==="" &&this.param.finicio===""&&this.param.ffin===""
    if(!this.permiso&&val){
      this.isvisible = false; // si el error es diferente se mostrara un mensajito en el front para ver el resultado busquen un paciente que no exista
      this.errLog = "Campos de busqueda vacios";
      return;
    }
    if(this.param.paramMed===""&&val){
      this.isvisible = false; // si el error es diferente se mostrara un mensajito en el front para ver el resultado busquen un paciente que no exista
      this.errLog = "Campos de busqueda vacios";
      return;
    }
   
    
    this._services.getCitasbyParamDate(this.param).subscribe(rs =>{
      this.isvisible = true;
      this.citas = rs;
    },err=>{
      this.errorHandler(err);
    })


   


  

  
  
  
  
}

}
