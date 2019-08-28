import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OdontogramaService } from "./../services/odontograma.service";
import {MatSnackBar} from '@angular/material/snack-bar';

//declare var jQuery:any;
//declare var $:any;

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {
  private id:number = 0;
  private cedula:String = "";
  private bandera:boolean = false;
  private tratamientos = {
    carie : 7,
    sellante: 4,
    corona: 5,
    protesis_removible: 6,
    protesis_fija: 13,
    restauracion: 8,
    endodoncia: 9,
    extraccion: 10,
    protesis_total: 11,
    extraccion_indicada: 12
  }
  private caras = {
    O :1,
    L : 2,
    D: 3,
    P: 4,
    M: 5,
    V: 6
  }

  constructor(private rutaActiva: ActivatedRoute, private _service: OdontogramaService,private _snackBar: MatSnackBar) {
   }

   updateDataForm(id:string){
     this.id = parseInt(id);
     $('#entrada').val(this.id);
     $("#id2").hide();
     $('#id1').show();
   }

   setBandera(){
     this.bandera = !this.bandera;
   }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    this.cedula = this.rutaActiva.snapshot.params.cedula;
    $('#id1').show();
    $('#id2').hide();
    $('#customCheck1').click(function() {
      if ($('#customCheck1').prop('checked')) {
        $('#id1').hide();
        $('#id2').show();
      } else {
        $('#id1').show();
        $('#id2').hide();
      }
    });
  }

  guardarDatos(){
    let tratamiento:any;
    if(this.bandera){
      let tipo = $('input:radio[name=optradio]:checked').val();
      let cod = 0;
      if(tipo == "Carie"){
          cod = this.tratamientos.carie;
      }
      else {
        cod = this.tratamientos.restauracion;
      }
      let cara:number[];
      if ($('#customCheck').prop('checked')){
        cara.push(this.caras.O)
      }
      if ($('#customCheck9').prop('checked')){
        cara.push(this.caras.L)
      }
      if ($('#customCheck2').prop('checked')){
        cara.push(this.caras.D)
      }
      if ($('#customCheck3').prop('checked')){
        cara.push(this.caras.P)
      }
      if ($('#customCheck4').prop('checked')){
        cara.push(this.caras.M)
      }
      if ($('#customCheck5').prop('checked')){
        cara.push(this.caras.V)
      }
      for(let i=0; i < cara.length; i++){
        tratamiento = {
          cara : this.id,
          tratamiento : cod,
          pos:  cara[i],
          createdAt:new Date(),
          updatedAt:new Date(),
          cedula: this.cedula
        }
        this._service.addTratatiento(tratamiento).subscribe(data=>{
          this._snackBar.open("Tratamiento agregago.", "OK", {
            duration: 1000,
          });
        },
        err => {
          console.log(err);
        })
      }
      return;
      
    }
    
  }




}
