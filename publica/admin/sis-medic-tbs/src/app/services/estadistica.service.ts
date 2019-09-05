import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import constantes from "./../constantes";
@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {
  private url_base = constantes.url_api_estadistica;
  constructor(private httpClient: HttpClient) { }

  getDatosAtendidas(){
    return this.httpClient.get<any>(this.url_base+"atendidas");
  }

  getDatosnoAtendidas(){
    return this.httpClient.get<any>(this.url_base+"noatendidas");
  }

  getDatosAllMedics(){
    return this.httpClient.get<any>(this.url_base+"allmedics");
  }

  getDatosAdmin(){
    return this.httpClient.get<any>(this.url_base+"admin");
  }

  getDatosTop10(){
    return this.httpClient.get<any>(this.url_base+"top10");
  }
  //top10
}
