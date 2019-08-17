import { Component, OnInit } from '@angular/core';
import {Config} from "./interface.json";
import {ConfigService} from "./config.json";

@Component({
  selector: 'app-view-exa',
  templateUrl: './view-exa.component.html',
  styleUrls: ['./view-exa.component.css']
})
export class ViewExaComponent implements OnInit {

  examenes:Config[]= [];
 // error;
 searchText = "";
  constructor(  private configJson: ConfigService) { }

  ngOnInit() {
    
    this.configJson.getConfig().subscribe(data=> this.examenes = data);

  }

}
