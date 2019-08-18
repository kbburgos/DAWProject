import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#numero1').on('click', function() {
      // $('#entrada').val($(this).attr('id'));
      $('#parainfo').show();
      $('#paraconfiguracion').hide();
    });

    $('#numero2').on('click', function() {
      // $('#entrada').val($(this).attr('id'));
      $('#parainfo').hide();
      $('#paraconfiguracion').show();
    });


    $('#botoncito').on('click', function() {
      alert("Los datos fueron guardados");
    });




  }

}
