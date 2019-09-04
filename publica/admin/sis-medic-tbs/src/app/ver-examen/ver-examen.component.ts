import { Component, OnInit } from '@angular/core';
import { DataService } from "./../services/data.services";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AllServices } from "./../services/AllServices";
@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html',
  styleUrls: ['./ver-examen.component.css']
})
export class VerExamenComponent implements OnInit {

  constructor(private data: DataService, private _router: Router,private rutaActiva: ActivatedRoute,private _services: AllServices) { }
link:any;
  ngOnInit() {
    this._services.getExamByCI(this.rutaActiva.snapshot.params.id).subscribe(rs=>{
      console.log(rs);
      
      this.link = rs.imageURL;
    })
  }

}
