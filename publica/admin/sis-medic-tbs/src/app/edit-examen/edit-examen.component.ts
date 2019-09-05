import { Component, OnInit } from '@angular/core';
import { DataService } from "./../services/data.services";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AllServices } from "./../services/AllServices"
import {DialogService}from './../services/dialogService'
@Component({
  selector: 'app-edit-examen',
  templateUrl: './edit-examen.component.html',
  styleUrls: ['./edit-examen.component.css']
})
export class EditExamenComponent implements OnInit {

  constructor(private data: DataService, private _router: Router,private popup:DialogService, private rutaActiva: ActivatedRoute,private _services: AllServices) { }
  exam= { 
    
   
    cedula: "",
    imageURL: "",
    
    fecha: "",
    paciente:""
  }
  ngOnInit() {
    this._services.getExamByCI(this.rutaActiva.snapshot.params.id).subscribe(rs=>{
      console.log(rs);
      
     this.exam.cedula=rs.cedula;
     this.exam.imageURL=rs.imageURL;
     this.exam.fecha =rs.fecha.split("T")[0];
     this.exam.paciente = rs.paciente
    }, err=>{
      this._router.navigate(["./view-exa"]);
      this.popup.openConfirmDialog(err.error.log);
    });
  }

  public updateExam(){
    this._services.updateExam(this.rutaActiva.snapshot.params.id,this.exam).subscribe(rs=>{
      this._router.navigate(["./view-exa"])
      this.popup.openConfirmDialog("Paciente Actualizado Correctamente");
    },err=>{
      this.popup.openConfirmDialog(err.error.log);
    })
  }

}
