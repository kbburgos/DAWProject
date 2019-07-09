import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escritores } from './objetos/Escritores';
import { Frase } from './objetos/Frase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {
      console.log("trabajando en datos");
   }

   getDataEscritores(){
    return this.httpClient.get<Escritores>("https://dataserverdaw.herokuapp.com/escritores");
  };

  getDataFrases(){
    return this.httpClient.get<Frase>("https://dataserverdaw.herokuapp.com/escritores/frases");
  }
}
