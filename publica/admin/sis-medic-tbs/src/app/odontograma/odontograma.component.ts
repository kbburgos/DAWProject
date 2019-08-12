import { Component, OnInit } from '@angular/core';

//declare var jQuery:any;
//declare var $:any;

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {

  constructor() {





   }



  ngOnInit() {
    $('.col-odonto').on('click', function() {
      $('#entrada').val($(this).attr('id'));
    });

    // tslint:disable-next-line:only-arrow-functions
    $('#customCheck1').click(function() {
      if ($('#customCheck1').prop('checked')) {
        $('#id1').show();
        $('#id2').hide();
      } else {
        $('#id1').hide();
        $('#id2').show();
      }

    });


  }

}
