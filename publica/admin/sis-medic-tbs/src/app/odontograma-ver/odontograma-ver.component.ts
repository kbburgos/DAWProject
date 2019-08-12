import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odontograma-ver',
  templateUrl: './odontograma-ver.component.html',
  styleUrls: ['./odontograma-ver.component.css']
})
export class OdontogramaVerComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  let bandera = true;
  let diente = '';

  $('.img-thumbnail').on('click', function() {
      // $('#entrada').val($(this).attr('id'));
      diente = $(this).attr('id');
      // console.log($(this).attr('id'));
      console.log(diente);
      if (bandera) {
        $('#modaltratamiento').show();
        $('#numeroDienteparrafo').text('Diente número:  ' + diente);
        bandera = false;
        $('.w3-button').on('click', function() {
          $('#modaltratamiento').hide();
        });
      } else {
        $('#modaltratamiento').hide();
        $('#numeroDienteparrafo').text('');
        bandera = true;
      }
    });




  }

}
