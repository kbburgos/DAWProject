import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OdontogramaService } from "./../services/odontograma.service";
import { MatSnackBar } from '@angular/material/snack-bar';

//declare var jQuery:any;
//declare var $:any;

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {
  private id: number = 0;
  private cedula: String = "";
  private bandera: boolean = false;
  private tratamientos = new Map();
  private caras = new Map();

  constructor(private rutaActiva: ActivatedRoute, private _service: OdontogramaService, private _snackBar: MatSnackBar) {
  }

  updateDataForm(id: string) {
    this.id = parseInt(id);
    $('#entrada').val(this.id);
    $("#id2").hide();
    $('#id1').show();
  }

  setBandera() {
    this.bandera = !this.bandera;
  }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    this.cedula = this.rutaActiva.snapshot.params.cedula;
    $('#id1').show();
    $('#id2').hide();
    $('#customCheck1').click(function () {
      if ($('#customCheck1').prop('checked')) {
        $('#id1').hide();
        $('#id2').show();
      } else {
        $('#id1').show();
        $('#id2').hide();
      }
    });
    this.llenarTratamientos();
    this.llenarCaras();
  }

  llenarCaras() {
    this._service.getCaras().subscribe(data => {
      if (data.log != null) {
        this._snackBar.open(data.log, "OK", {
          duration: 5000,
        });
      }
      for (let i = 0; i < data.length; i++) {
        this.caras.set(data[i].nombre, data[i]);
      }
    })

  }

  llenarTratamientos() {
    this._service.getTratamientosOdontograma().subscribe(data => {
      if (data.log != null) {
        this._snackBar.open(data.log, "OK", {
          duration: 5000,
        });
      }
      for (let i = 0; i < data.length; i++) {
        this.tratamientos.set(data[i].nombre, data[i]);
      }
    });
  }

  guardarOtrosTratamientosOdontograma(clave: string) {
    let tratamiento: any;
    if (clave.length == 4) {
      this._snackBar.open("Seleccione un tratamiento.", "OK", {
        duration: 4000,
      });
    }
    else {
      let cod = this.tratamientos.get(clave).codigo;
      tratamiento = {
        cara: 7,
        tratamiento: cod,
        pos: this.id,
        cedula: this.cedula
      }
      this._service.addTratatiento(tratamiento).subscribe(data => {
        this._snackBar.open(data.log, "OK", {
          duration: 1000,
        });
      },
        err => {
          console.log(err);
        });
    }

  }

  guardarCarieUObturacion() {
    let tratamiento: any;
    let tipo = $('input:radio[name=optradio]:checked').val();
    let cod = 0;
    if (tipo == "Carie") {
      cod = this.tratamientos.get("caries").codigo;
    }
    else {
      cod = this.tratamientos.get("restauracion").codigo;
    }
    let cara: Array<number> = [];
    if ($('#customCheck').prop('checked')) {
      cara.push(this.caras.get("O").codigo);
    }
    if ($('#customCheck9').prop('checked')) {
      cara.push(this.caras.get("L").codigo);
    }
    if ($('#customCheck2').prop('checked')) {
      cara.push(this.caras.get("D").codigo);
    }
    if ($('#customCheck3').prop('checked')) {
      cara.push(this.caras.get("P").codigo);
    }
    if ($('#customCheck4').prop('checked')) {
      cara.push(this.caras.get("M").codigo);
    }
    if ($('#customCheck5').prop('checked')) {
      cara.push(this.caras.get("V").codigo);
    }
    for (let i = 0; i < cara.length; i++) {
      tratamiento = {
        cara: cara[i],
        tratamiento: cod,
        pos: this.id,
        cedula: this.cedula
      }
      this._service.addTratatiento(tratamiento).subscribe(data => {
        this._snackBar.open(data.log, "OK", {
          duration: 1000,
        });
      },
        err => {
          console.log(err);
        });

    }
    return;

  }

  guardarDatos() {
    if (this.id == 0) {
      this._snackBar.open("Debe seleccionar un diente para guardar el tratamiento", "OK", {
        duration: 3000,
      });
    }
    else{
      if (this.bandera) {
        this.guardarCarieUObturacion();
        return;
      }
      let clave = "" + $('select[name=cars]').val();
      clave = clave.toLowerCase();
      this.guardarOtrosTratamientosOdontograma(clave);
      $('.custom-control-input').prop('checked', false);
      $('#id1').show();
      $('#id2').hide();
      $('#entrada').val("");
    }
  }




}
