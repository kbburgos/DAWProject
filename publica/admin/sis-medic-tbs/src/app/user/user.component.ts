import { Component, OnInit } from '@angular/core';
import { AllServices } from "./../services/AllServices";
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import {DialogService}from './../services/dialogService'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usuarios: any[];
  isvisible = true;
  errLog = "";
  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private popup:DialogService) { }

  ngOnInit() {
    this.top10();
    this.data.currentMessage.subscribe(message => {

      if(message.indexOf("Usuario se Actualizo")>-1||message.indexOf('Usuario se Creo')>-1){
        this.popup.openConfirmDialog(message);
      }
    })
  }


  public search(parametro: string) {
    if (parametro === "") {
      this.top10(); //si el parametro de busqueda el vacio se carga el top 10 de pacientes
    } else {
      this._services.getUserByParameter(parametro).subscribe(
        data => {
          this.isvisible = true; // se muestra los pacientes que coincidan con la busqueda
          console.log(data);
          this.usuarios = data;
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

    this._services.getTop10User().subscribe(
      data => {
        this.isvisible = true;
        this.usuarios = data;
      },
      err => {
        console.log(err);
        this.errorHandler(err);
      }
    );
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

}
