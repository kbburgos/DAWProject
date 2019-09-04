import { Component, OnInit } from '@angular/core';
import { MyReservationService } from "./../services/myreservation.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import Constantes from "./../constantes";
import { AuthService } from "../services/loginUtils/auth.service";
@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.component.html',
  styleUrls: ['./myreservation.component.css']
})
export class MyreservationComponent implements OnInit {
  private historico:any;
  private citaActual = {titulo: "titulo", fecha: "YYYY/MM/DD"};
  private cedula:String;
  private id_cita:String;
  private pageActual:number = 1;
  private url_add_exa = Constantes.url_api_add_examen;
  private localStorage:any;
  private token:any;


  constructor(private login: AuthService,private dialog: MatDialog,private router: Router,private rutaActiva: ActivatedRoute, private _service: MyReservationService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.cedula = this.rutaActiva.snapshot.params.cedula;
    this.id_cita = this.rutaActiva.snapshot.params.id;
    this.cargarHistorico(this.cedula);
    this.cargarCitaActual(this.id_cita);
    this.localStorage = this.login.getloginData();
    this.token = this.localStorage.Token;
  }

  async cargarHistorico(cedula:String){
    await this._service.getHistorico(cedula).toPromise().then(data=>{
      this.historico = data;
    }).catch(err=>{
      console.log(err);
    });
  }

  async cargarCitaActual(id:String){
    await this._service.getCitaActual(id).toPromise().then(data=>{
      this.citaActual.fecha = data.fecha;
      this.citaActual.titulo = data.titulo;
    }).catch(err=>{
      console.log(err);
      this._snackBar.open("No se pudo obtener la cita.", "OK", {
        duration: 5000,
      });
    });
  }

  atenderCita(){
    let nota = "" + $("#comment").val();
    if(nota.length == 0){
      this._snackBar.open("Llene el campo nota.", "OK", {
        duration: 10000,
      });
      return;
    }
    this.openDialog(nota,this.id_cita);
    //this._service.atenderCitaActual()
  }
 
  openDialog(nota:String, id:String){
    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width: "350px",
      data: "Seguro que desea cerrar la cita, recuerde que una vez atendida no puede agregar más datos al paciente hasta una próxima cita."
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this._service.atenderCitaActual({nota:nota},id).subscribe(data => {
          if(data.log){
            this._snackBar.open(data.log, "OK", {
              duration: 10000,
            });
            this.router.navigate(['/reservations']);
          }
        })
      }
    }, err => {
      console.log(err);
      this._snackBar.open("Algo salió mal vuelve a intentarlo.", "OK", {
        duration: 10000,
      });
    });
  }

}



