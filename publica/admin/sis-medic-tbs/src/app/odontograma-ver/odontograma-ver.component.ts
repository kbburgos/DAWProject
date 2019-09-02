import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OdontogramaService } from "./../services/odontograma.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import url_base from "./../constantes";

@Component({
  selector: 'app-odontograma-ver',
  templateUrl: './odontograma-ver.component.html',
  styleUrls: ['./odontograma-ver.component.css']
})
export class OdontogramaVerComponent implements OnInit {
  private cedula: String = "";
  private dientes_list: any;
  private dientes_map = new Map();
  constructor(private rutaActiva: ActivatedRoute, private _service: OdontogramaService, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.cedula = this.rutaActiva.snapshot.params.cedula;
    await this.getDientesAfectador(this.cedula);
    await this.getTratamientosOdontograma(this.cedula);
    this.pintarTratamientos();
    this.mostrarTratamientos(this.dientes_map,this._service, this._snackBar);
  }

  async getDientesAfectador(cedula: String) {
    await this._service.getDientes(cedula).toPromise().then(data => {
      if (data.log != null) {
        this._snackBar.open(data.log, "OK", {
          duration: 5000,
        });
        return;
      }
      this.dientes_list = data;
    }).catch(err => {
      if (err.log) {
        this._snackBar.open(err.log, "OK", {
          duration: 10000,
        });
      }
      else {
        this._snackBar.open("Algo salio mal vuelva a iniciar sesión.", "OK", {
          duration: 10000,
        });
      }
    });
  }

  async getTratamientosOdontograma(cedula: String) {
    await this._service.getDatosById(cedula).toPromise().then(data => {
      if (data.length == 0) {
        this._snackBar.open("No hay datos a mostrar.", "OK", {
          duration: 5000,
        });
        return;
      }
      if (data.log != null) {
        this._snackBar.open(data.log, "OK", {
          duration: 5000,
        });
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (this.dientes_map.get(data[i].pos) == null) {
          let arr_tmp: Array<any> = [];
          arr_tmp.push(data[i]);
          this.dientes_map.set(data[i].pos, arr_tmp);
        }
        else {
          this.dientes_map.get(data[i].pos).push(data[i]);
        }
      }
    }).catch(err => {
      if (err.log) {
        this._snackBar.open(err.log, "OK", {
          duration: 10000,
        });
      }
      else {
        this._snackBar.open("Algo salio mal vuelva a iniciar sesión.", "OK", {
          duration: 10000,
        });
      }
    });
  }

  pintarTratamientos() {
    for (let i = 0; i < this.dientes_list.length; i++) {
      $("#" + this.dientes_list[i].pos).addClass("pintar");
    }

  }

  mostrarTratamientos(dientes_map: Map<any, any>, servicio: OdontogramaService, alerta_anack:MatSnackBar) {
    let bandera = true;
    let diente = 0;
    $('.col-odonto').on('click', function () {
      diente = Number($(this).attr('id'));
      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", "#modaltratamiento");
      $('#numeroDienteparrafo').text('Diente número:  ' + diente);
      if (bandera) {
        $('#modaltratamiento').show();
        bandera = false;
        $('.close').on('click', function () {
          $('#modaltratamiento').hide();
        });
      } else {
        $('#modaltratamiento').hide();
        bandera = true;
      }
      $("#tableCuerpo").remove();
      let tbody = $("<tbody></tbody>");
      tbody.attr("id", "tableCuerpo");
      for (let [key, value] of dientes_map) {
        if (key == diente) {
          for (let i = 0; i < value.length; i++) {
            let cara = "";
            if (value[i].cara != 7) {
              cara += value[i].caradiente.nombre;
            }
            let btn = $("<button></button>");
            let id_t = value[i].codigo;
            btn.addClass("btn btn-danger");
            btn.text("Eliminar");
            btn.attr("type","button");
            btn.on("click",{mapa: dientes_map,service : servicio, id: id_t, alerta :alerta_anack, diente:diente},(event:any) =>{
              event.data.service.delTratamiento(event.data.id).toPromise().then(data =>{
                if(data.log && data.log == true){
                    event.data.alerta.open("Tratamiento eliminado con éxito, vuelva abrir los detalles para ver los cambios.", "OK", {
                      duration: 10000,
                    });
                    for(let j=0; j < event.data.mapa.get(event.data.diente).length; j++ ){
                      if(event.data.mapa.get(event.data.diente)[j].codigo == event.data.id){
                        event.data.mapa.get(event.data.diente).splice(j,1);
                      }
                    }
                }
              }).catch(err => {
                event.data.alerta.open("Algo salio mal.", "OK", {
                  duration: 10000,
                });
                console.log(err);
              })
            });
            let img = $("<img>");
            img.attr("src", url_base.url_base + value[i].tratamientoodontograma.ruta);
            img.attr("style", "width: 25px; height: 30px;")
            let row = $("<tr></tr>");
            row.append("<td>" + cara + "</td>");
            let td = $("<td></td>");
            td.append(img);
            row.append(td);
            let td2 = $("<td></td>");
            td2.append(btn);
            row.append(td2);
            tbody.append(row);
          }
        }
      }
      $("table").append(tbody);
    });
  }

}
