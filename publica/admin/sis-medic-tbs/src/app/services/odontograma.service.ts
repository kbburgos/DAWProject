import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Odontogramas } from './../objetos/Odontograma';
import constantes from "./../constantes";

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {
  private url_base: string = constantes.url_api_odontograma;
  constructor(private httpClient: HttpClient) { }

  getDatosById(cedula: number){
    return this.httpClient.get<Odontogramas>(this.url_base+"user/"+cedula);
  }

  addTratatiento(tratamiento:any){
    return this.httpClient.post<any>(this.url_base+"add",tratamiento);
  }
}
