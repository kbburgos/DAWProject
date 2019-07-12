import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor() { }

  public options:any = {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Reporte de visitas por género de la semana.'
      },
      xAxis: {
          categories: [
              'Lunes',
              'Martes',
              'Miércoles',
              'Jueves',
              'Viernes'
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Visitas por día. '
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
          name: 'Hombres',
          data: [49.9, 71.5, 106.4, 129.2, 144.0]

      }, {
          name: 'Mujeres',
          data: [83.6, 78.8, 98.5, 93.4, 106.0]

      }]
  };

  ngOnInit() {
    Highcharts.chart('gcontainer1', this.options);
  }
}
