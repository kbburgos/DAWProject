import { Component, OnInit } from '@angular/core';
import { AllServices } from "./../services/AllServices";
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  constructor(private _services: AllServices, private login: AuthService,private data:DataService, private _router:Router) { }

  ngOnInit() {
  }

  

}
