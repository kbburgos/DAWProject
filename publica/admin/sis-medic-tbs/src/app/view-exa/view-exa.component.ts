import { Component, OnInit } from '@angular/core';
import { Config } from "./interface.json";
import { ConfigService } from "./config.json";
import { AllServices } from "./../services/AllServices"; //EN CADA MODULO DONDE VAYAN USAR ALGUN SERVICIO DEBEN IMPORTAR ESTO
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import { DialogService } from './../services/dialogService'
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-view-exa',
  templateUrl: './view-exa.component.html',
  styleUrls: ['./view-exa.component.css']
})
export class ViewExaComponent implements OnInit {
  public searchform: FormGroup;
  public pacientes: any = [];
  exams: any = [];

  selectPaciente: any;
  constructor(private _services: AllServices, private login: AuthService, private data: DataService, private popup: DialogService) { }
  isvisible = true;
  errLog = "";
  ngOnInit() {
    this.searchform = new FormGroup({
      paciente_select: new FormControl(""),
      paciente_search: new FormControl(""),

    })
    this._services.getallPacientes().subscribe(patients => {
      this.pacientes = patients;
    }, err => {
      this.errorHandler(err);
    });


    this.top10()

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

  public top10() {
    this._services.getTop10Exam().subscribe(ex => {
      this.exams = ex;
      console.log(ex);

    }, err => {
      this.errorHandler(err);
    })
  }

  public search() {
    if (this.selectPaciente === "") {
      this.top10(); //si el parametro de busqueda el vacio se carga el top 10 de pacientes
    } else {
      this._services.filtrarExamen(this.selectPaciente).subscribe(
        data => {
          this.isvisible = true; // se muestra los pacientes que coincidan con la busqueda 
         
          this.exams = data;
        },
        err => {
          this.errorHandler(err); // maanejo de errores en caso de que el status del response sea diferente de 200
        }
      );
    }
  }
  public reloadData() {
    if (this.selectPaciente === "") this.search(); // este metodo se usa en caso de que el usuario borre por completo las busqueda del input
    // lo que recargara el top10 usa el evento de keyup.backspace miren el html
  }
  filtroPacientes(): any[] {


    let search = this.searchform.get("paciente_search").value
    if (search === "") {

      return this.pacientes;

    } else {
      search = String(search).toLowerCase();
    }

    return this.pacientes.filter(paciente => (String(paciente.nombre).toLowerCase().indexOf(search) > -1 || String(paciente.apellido).toLowerCase().indexOf(search) > -1 || String(paciente.cedula).toLowerCase().indexOf(search) > -1))
  }


  deleteExam(id: string) {
    this._services.deleteExam(id).subscribe(rs => {
      this.top10();
    }, err => {
      this.errorHandler(err);
    })
  }

  

}
