import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { EstadisticaService } from "./../services/estadistica.service";
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-estadistica-usuarios',
  templateUrl: './estadistica-usuarios.component.html',
  styleUrls: ['./estadistica-usuarios.component.css']
})
export class EstadisticaUsuariosComponent implements OnInit {
  private cant_medicos: number;
  private cant_admin: number;
  constructor(private _service: EstadisticaService) { }

  async ngOnInit() {
    await this._service.getDatosAdmin().toPromise().then(data => {
      this.cant_admin = data.length;
    }).catch(err => {
      console.log(err);
    });
    await this._service.getDatosAllMedics().toPromise().then(data => {
      this.cant_medicos = data.length;
    }).catch(err => {
      console.log(err);
    });
    let options: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Reporte de cantidad de usuarios registrads.'
      },
      xAxis: {
        categories: [
          'Administración',
          'Médicos'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cantidad de usuarios. '
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Administradores',
        data: [this.cant_admin]

      }, {
        name: 'Médicos',
        data: [this.cant_medicos]

      }]
    };
    Highcharts.chart('gcontainer3', options);

  }

}
