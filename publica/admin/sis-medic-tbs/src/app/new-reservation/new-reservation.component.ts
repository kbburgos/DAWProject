import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AllServices } from "./../services/AllServices";
import * as moment from 'moment';
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _services: AllServices, private login: AuthService, private data: DataService, private _router: Router) { }
  public editform: FormGroup;
  public medicos: any = [];
  public currentCita: any;
  selected :  { startDate :  moment.Moment , endDate :  moment.Moment }  ;
  //any{ startDate :  moment.Moment , endDate :  moment.Moment }  ;
  public pacientes: any = [];
  public selectMedico: any;
  public selectPaciente: any;
  isvisible = true;
  errLog = "";

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {


  /*
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl()
    });



    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl()
    });
*/

    this.editform = new FormGroup({
      asunto: new FormControl("", [Validators.required]),
      medico_select: new FormControl("", [Validators.required]),
      medico_search: new FormControl(""),
      paciente_select: new FormControl("", [Validators.required]),
      paciente_search: new FormControl(""),
      prescripcion: new FormControl("", [Validators.required]),
      //firstCtrl: new FormControl("", [Validators.required]),
      //secondCtrl: new FormControl("", [Validators.required])

    });


    this._services.getallMedics().subscribe(medics => {
      this.medicos = medics;
    }, err => {
      this.errorHandler(err);
    });
    this._services.getallPacientes().subscribe(patients => {
      this.pacientes = patients;
    }, err => {
      this.errorHandler(err);
    });

    this.data.currentMessage.subscribe(message => {


      try {
        let data = JSON.parse(message)
        //this.editform.get("paciente_select").setValue(data.paciente.nombre+" "+data.paciente.apellido);
        this.selectPaciente = data.paciente.cedula;
        this.selectMedico = data.usersistem.cedula;
        this.currentCita = data.codigo;


        this.selected = {
          startDate: moment(data.fecha + " " + data.hora, "YYYY-MM-DD HH:mm:ss"),
          endDate: moment(data.fecha + " " + data.hora, "YYYY-MM-DD HH:mm:ss")
        }
        this.editform.get("asunto").setValue(data.titulo);
        this.editform.get("prescripcion").setValue(data.nota);

      } catch (e) {

        //this._router.navigate(["./reservations"])
      }

    //

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
  arrdate(op: number) {
    moment.locale('es');

    if (op === 1) {
      return moment.weekdaysMin()
    }
    return moment.monthsShort()
  }
  params :any={
    titulo: "",
    id_medico:"",
    id_paciente:"",
    fecha:"",
    nota:""

  }
  local: any = {
    format: 'YYYY-MM-DD HH:mm:ss',
    direction: 'ltr', // could be rtl
    weekLabel: 'W',
    separator: ' a ', // default is ' - '

    applyLabel: 'Okay', // detault is 'Apply'
    clearLabel: 'Cerrar', // detault is 'Clear'
    daysOfWeek: this.arrdate(1),
    monthNames: this.arrdate(0),
    // firstDay: 1, // first day is monday




  }

  public crcita(obj:any) {
    if(this.validarDate(obj)){
      this.isvisible = false; // si el error es diferente se mostrara un mensajito en el front para ver el resultado busquen un paciente que no exista
        this.errLog = "Los campos de fecha tienen caracteres incorrectos";
        return;

    }
    this.params.titulo= this.editform.get("asunto").value;
    this.params.nota = this.editform.get("prescripcion").value;
    this.params.fecha = this.selected.startDate.toISOString();
    this.params.id_medico = this.selectMedico;
    this.params.id_paciente = this.selectPaciente;
    this._services.createCita(this.params).subscribe(rs=>{
      this.data.changeMessage("La Cita se creo  Correctamente")
        this._router.navigate(["/reservations"])
    },err=>{
      this.errorHandler(err);
    })

  }

  public hasError = (controlName: string, errorName: string) => {

    return this.editform.controls[controlName].hasError(errorName);


  };

  public validarDate(obj: any) {
    return Date.parse(obj.value) === NaN
  }

  filtroPacientes(): any[] {


    let search = this.editform.get("paciente_search").value
    if (search === "") {

      return this.pacientes;

    } else {
      search = String(search).toLowerCase();
    }

    return this.pacientes.filter(paciente => (String(paciente.nombre).toLowerCase().indexOf(search) > -1 || String(paciente.apellido).toLowerCase().indexOf(search) > -1 || String(paciente.cedula).toLowerCase().indexOf(search) > -1))
  }
  filtroMedicos(): any[] {


    let search = this.editform.get("medico_search").value
    if (search === "") {

      return this.medicos;

    } else {
      search = String(search).toLowerCase();
    }

    return this.medicos.filter(medico => (String(medico.nombreUser).toLowerCase().indexOf(search) > -1 || String(medico.apellidoUser).toLowerCase().indexOf(search) > -1 || String(medico.cedula).toLowerCase().indexOf(search) > -1))
  }








}
