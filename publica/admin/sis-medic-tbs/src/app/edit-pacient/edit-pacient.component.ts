import { Component, OnInit } from '@angular/core';
import { AllServices } from "./../services/AllServices";
import { DataService } from "./../services/data.services";
import { AuthService } from "../services/loginUtils/auth.service";
@Component({
  selector: 'app-edit-pacient',
  templateUrl: './edit-pacient.component.html',
  styleUrls: ['./edit-pacient.component.css']
})
export class EditPacientComponent implements OnInit {
  
  constructor(private _services: AllServices, private login: AuthService,private data:DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe ( message => {
      console.log(message)


    }
      
      );
     
  }



}
