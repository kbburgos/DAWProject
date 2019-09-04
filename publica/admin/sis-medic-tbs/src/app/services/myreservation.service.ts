import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import constantes from "../constantes";

@Injectable({
  providedIn: 'root'
})
export class MyReservationService {
  private url_base: String = constantes.url_api_reservaciones;
  constructor(private httpClient: HttpClient) { }

  getHistorico(cedula:String){
    return this.httpClient.get<any>(this.url_base+"usuario/"+cedula);
  }

  getCitaActual(id:String){
    return this.httpClient.get<any>(this.url_base+"cita/"+id);
  }

  atenderCitaActual(datos:any,id:String){
    return this.httpClient.put<any>(this.url_base+"atender/"+id,datos);
  }
}
