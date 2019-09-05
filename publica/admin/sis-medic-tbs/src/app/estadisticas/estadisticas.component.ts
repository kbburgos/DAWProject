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
    selector: 'app-estadisticas',
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
    private atendidas: number;
    private noAtendidas: number;

    constructor(private _service: EstadisticaService) { }

    async ngOnInit() {
        await this._service.getDatosnoAtendidas().toPromise().then(data => {
            this.noAtendidas = data.length;
        }).catch(err => {
            console.log(err);
        });
        await this._service.getDatosAtendidas().toPromise().then(data => {
            this.atendidas = data.length;
        }).catch(err => {
            console.log(err)
        });
        let options: any = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Reporte de citas atendidas y no atendidas.'
            },
            xAxis: {
                categories: [
                    'Atendidas',
                    'No atendidas'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cantidad de citas. '
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
                name: 'Atendidas',
                data: [this.atendidas]

            }, {
                name: 'No Atendidas',
                data: [this.noAtendidas]

            }]
        };
        Highcharts.chart('gcontainer1', options);

    }
}
