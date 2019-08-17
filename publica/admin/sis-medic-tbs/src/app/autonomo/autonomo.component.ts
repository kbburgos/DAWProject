import { Component, OnInit } from '@angular/core';
import { AutonomoService } from './../autonomo.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-autonomo',
  templateUrl: './autonomo.component.html',
  styleUrls: ['./autonomo.component.css']
})
export class AutonomoComponent implements OnInit {

  constructor(private servicio: AutonomoService, private _router: Router) { 

  }

  ngOnInit() {
  }

  getData(){
    this.servicio.getData().subscribe((data:any) =>{
      console.log(data);
    },(err:any)=>{
      console.log(err);
    })
  }

}
