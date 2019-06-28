import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  options: FormGroup;
  dropExamen = false;
  dropOdonto = false;
  dropPerfil = false;
  constructor(fb: FormBuilder) {
    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });
  }
  ngOnInit() {
  }
  DropExamen() {
    this.dropExamen = !this.dropExamen;
  }
  DropOdonto() {
    this.dropOdonto = !this.dropOdonto;
  }
  DropPerfil() {
    this.dropPerfil = !this.dropPerfil;
  }
}
