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
    selector: 'app-estadistica-dona',
    templateUrl: './estadistica-dona.component.html',
    styleUrls: ['./estadistica-dona.component.css']
})
export class EstadisticaDonaComponent implements OnInit {
    private mapDatos = new Map();
    private datos: Array<any> = [];
    constructor(private _service: EstadisticaService) { }
    async ngOnInit() {
        await this._service.getDatosTop10().toPromise().then(data => {
            for (let i = 0; i < data.length; i++) {
                if (this.mapDatos.get(data[i].nombre) == null) {
                    this.mapDatos.set(data[i].nombre, 1);
                }
                else {
                    let cant = this.mapDatos.get(data[i].nombre);
                    cant += 1;
                    this.mapDatos.set(data[i].nombre, cant);
                }
            }
            for (let [key, value] of this.mapDatos) {
                let datosArray = [key, value];
                this.datos.push(datosArray);
            }
        }).catch(err => {
            console.log(err);
        });
        let options: any = {
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
                data: this.datos
            }]
        }
        Highcharts.chart('gcontainer2', options);
    }

}
