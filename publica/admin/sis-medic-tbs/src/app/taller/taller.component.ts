import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.css']
})
export class TallerComponent implements OnInit {
  dicData = new Map();
  dicNombres = new Map();
  maximo: number;
  listaAutores = [];
  bandera = true;
  cont = 0;
  cont2 = 1;


  constructor(private data: DataService) {
    data.getDataEscritores().subscribe(data => {
      for (let dato of data.escritores) {
        if (this.dicNombres.get(dato.id) == null) {
          this.dicNombres.set(dato.id, dato.nombre);
          this.listaAutores.push(dato.id);
        }
      }
      //extra codigo
      var principal = $("#principal");
      var maximo = this.listaAutores.length - (this.listaAutores.length % 5);
      for (var i = 0; i < maximo; i++) {
        var divA = $("<div></div>").addClass("col-sm-2 ml-1");
        var name = $("<h5></h5>");
        var name = $("<h5></h5>").text(this.dicNombres.get(this.listaAutores[i]));
        divA.append(name);
        principal.append(divA);
        this.cont++;
        let idAutor= this.listaAutores[i];
        let identificador = this.cont2;
        if (this.cont % 5 == 0) {
          var divG = $("<div></div>").addClass("col-sm-12");
          divG.attr("id", "divG" + this.cont2);
          divG.addClass("bg-dark mt-2 mb-2");
          principal.append(divG);
          name.click({param1: idAutor, param2:identificador, dic1:this.dicData, contador: this.cont2},function(event){
            let idAutor =event.data.param1;
            let identificador = event.data.param2;
            let dicData = event.data.dic1;
            let cont2 = event.data.contador;
            for (var id of dicData.keys()) {
              if (id == idAutor) {
                $("#divG" + identificador).empty();
                for (var i = 0; i < dicData.get(id).length; i++) {
                  var pa = $("<p></p>").text(dicData.get(id)[i]);
                  pa.addClass("text-center text-light")
                  $("#divG" + identificador).append(pa);
                }
              }
            }
            for (var j = 1; j <= cont2; j++) {
              if (j != identificador) {
                $("#divG" + j).hide();
              }
              else {
                $("#divG" + j).show();
              }
            }
          });
          this.cont2++;
        }
        else {
          name.click({param1: idAutor, param2:identificador, dic1:this.dicData, contador: this.cont2},function(event){
            let idAutor =event.data.param1;
            let identificador = event.data.param2;
            let dicData = event.data.dic1;
            let cont2 = event.data.contador;
            for (var id of dicData.keys()) {
              if (id == idAutor) {
                $("#divG" + identificador).empty();
                for (var i = 0; i < dicData.get(id).length; i++) {
                  var pa = $("<p></p>").text(dicData.get(id)[i]);
                  pa.addClass("text-center text-light")
                  $("#divG" + identificador).append(pa);
                }
              }
            }
            for (var j = 1; j <= cont2; j++) {
              if (j != identificador) {
                $("#divG" + j).hide();
              }
              else {
                $("#divG" + j).show();
              }
            }
          });
        }
      }
      for (i; i < this.listaAutores.length; i++) {
        var divA = $("<div></div>").addClass("col-sm-2 ml-1");
        var name = $("<h5></h5>").text(this.dicNombres.get(this.listaAutores[i]));
        divA.append(name);
        principal.append(divA);
        if (i + 1 == this.listaAutores.length) {
          var divG = $("<div></div>").addClass("col-sm-12");
          divG.attr("id", "divG" + this.cont2);
          divG.addClass("bg-dark mt-2 mb-2");
          principal.append(divG);
          let idAutor= this.listaAutores[i];
          let identificador = this.cont2;
          name.click({param1: idAutor, param2:identificador, dic1:this.dicData, contador: this.cont2},function(event){
            let idAutor =event.data.param1;
            let identificador = event.data.param2;
            let dicData = event.data.dic1;
            let cont2 = event.data.contador;
            for (var id of dicData.keys()) {
              if (id == idAutor) {
                $("#divG" + identificador).empty();
                for (var i = 0; i < dicData.get(id).length; i++) {
                  var pa = $("<p></p>").text(dicData.get(id)[i]);
                  pa.addClass("text-center text-light")
                  $("#divG" + identificador).append(pa);
                }
              }
            }
            for (var j = 1; j <= cont2; j++) {
              if (j != identificador) {
                $("#divG" + j).hide();
              }
              else {
                $("#divG" + j).show();
              }
            }
          });
        }
      }
    });

    data.getDataFrases().subscribe(data => {
      for (let dato of data.frases) {
        if (this.dicData.get(dato.id_autor) == null) {
          let lista: string[] = [];
          lista.push(dato.texto);
          this.dicData.set(dato.id_autor, lista);
        }
        else {
          this.dicData.get(dato.id_autor).push(dato.texto);
        }
      }
    });

  }

  ngOnInit() {
  }
  imprimir(idAutor, identificador) {
    console.log(idAutor);
    console.log(identificador);
    for (var id of this.dicData.keys()) {
      if (id == idAutor) {
        $("#divG" + identificador).empty();
        for (var i = 0; i < this.dicData.get(id).length; i++) {
          var pa = $("<p></p>").text(this.dicData.get(id)[i]);
          pa.addClass("text-center text-light")
          $("#divG" + identificador).append(pa);
        }
      }
    }
    for (var j = 1; j <= this.cont2; j++) {
      if (j != identificador) {
        $("#divG" + j).hide();
      }
      else {
        $("#divG" + j).show();
      }
    }
  }



}
