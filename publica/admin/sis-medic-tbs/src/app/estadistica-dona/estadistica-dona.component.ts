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
  selector: 'app-estadistica-dona',
  templateUrl: './estadistica-dona.component.html',
  styleUrls: ['./estadistica-dona.component.css']
})
export class EstadisticaDonaComponent implements OnInit {

  constructor() { }
  public options: any ={
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false
      },
      title: {
          text: 'Tratamientos<br>diarios',
          align: 'center',
          verticalAlign: 'middle',
          y: 40
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
          }
      },
      series: [{
          type: 'pie',
          name: 'Browser share',
          innerSize: '50%',
          data: [
              ['Caries', 58.9],
              ['Puentes', 13.29],
              ['Placas', 13],
              ['Limpieza', 3.78],
              ['Extracción ', 3.42]
          ]
      }]
  }
  ngOnInit() {
    Highcharts.chart('gcontainer2', this.options);
  }

}
