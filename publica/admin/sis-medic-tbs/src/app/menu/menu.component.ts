import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as $ from 'jquery';
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
    $(document).ready(() =>{
      $("body").removeClass("modal-open");
      $(".modal-backdrop.show").removeClass("modal-backdrop show");
      $("body").removeAttr("style");
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
