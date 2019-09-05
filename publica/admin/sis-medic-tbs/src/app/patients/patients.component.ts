import { Component, OnInit } from "@angular/core";
import { AllServices } from "./../services/AllServices"; //EN CADA MODULO DONDE VAYAN USAR ALGUN SERVICIO DEBEN IMPORTAR ESTO
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import {DialogService}from './../services/dialogService'
import Encrypt from './../services/serealUtils/encrypt'
@Component({
  selector: "app-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.css"]
})
export class PatientsComponent implements OnInit {
  
  // TODOS LOS SERVICIOS QUE VAYAN A USAR PONGANLOS EN EL ARCHIVO QUE SE LLAMA ALLSERVICES ALLI ESTAN TODOS, POR LO MENOS LOS QUE YO ESTOY USANDO 
  pacientes: any[];
  isvisible = true;
  errLog = "";
  public userID:any;
  public permiso:any;
  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private popup:DialogService ) {} // ESTOS PARAMETROS DEBEN IR EN EL CONSTRUCTOR

  ngOnInit() {
    this.userID = this.login.getloginData();
    this.permiso = Encrypt.validadUser(this.userID.Rol);
    this.top10(); // al iniciar la pag se carga el top10
    this.data.currentMessage.subscribe(message => {
     
      if(message.indexOf("Paciente se Actualizo")>-1||message.indexOf('Paciente se Creo')>-1){
        this.popup.openConfirmDialog(message);
      }
    })
  }

  public search(parametro: string) {
    if (parametro === "") {
      this.top10(); //si el parametro de busqueda el vacio se carga el top 10 de pacientes
    } else {
      this._services.getPatientByParameter(parametro).subscribe(
        data => {
          this.isvisible = true; // se muestra los pacientes que coincidan con la busqueda 
          console.log(data);
          this.pacientes = data;
        },
        err => {  
          this.errorHandler(err); // maanejo de errores en caso de que el status del response sea diferente de 200

          
        }
      );
    }
  }
  public reloadData(parametro: string) {
    if (parametro === "") this.search(parametro); // este metodo se usa en caso de que el usuario borre por completo las busqueda del input
                                                  // lo que recargara el top10 usa el evento de keyup.backspace miren el html
  }
  private top10() { // carga el top 10
    this._services.getTop10Patient().subscribe(
      data => {
        this.isvisible = true;
        this.pacientes = data;
      },
      err => {
        this.errorHandler(err);
      }
    );
  }

  private errorHandler(err: any) {
    if (err.status === 401) { // si el status del response es 401 quiere decir que el usuario no esta autorizado o que la sesion caduco por lo que se cierra la secion
                              // y se lo reenvia al loguin
      this.login.logoutUser();
    } else {
      // this.isvisible = false; // si el error es diferente se mostrara un mensajito en el front para ver el resultado busquen un paciente que no exista
      // this.errLog = err.error.log;
      this.popup.openConfirmDialog(err.error.log);
    }
  }

  public deletePatient(id:String){
        this._services.deletePatient(id).subscribe(data=>{
         
          this.top10();
          // cuando se elimine el paciente se recargara ek top10

          
        },err=>{
          this.errorHandler(err);
        });
  }
  public pasToUpdate(id:string){
    this.data.changeMessage(id); // este metod aun no esta listo es para la actualizacion, en teoria esto permite cominicar o enviar info de un modulo a otro
    
  }
}
