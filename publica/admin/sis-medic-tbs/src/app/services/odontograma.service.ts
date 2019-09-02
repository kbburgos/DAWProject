import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import constantes from "./../constantes";

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {
  private url_base: String = constantes.url_api_odontograma;
  constructor(private httpClient: HttpClient) { }

  getDatosById(cedula: String){
    return this.httpClient.get<any>(this.url_base+"user/"+cedula);
  }

  addTratatiento(tratamiento:any){
    return this.httpClient.post<any>(this.url_base+"add",tratamiento);
  }

  getTratamientosOdontograma(){
    return this.httpClient.get<any>(this.url_base+"tratamientos");
  }

  getCaras(){
    return this.httpClient.get<any>(this.url_base+"caras");
  }

  getDientes(cedula: String){
    return this.httpClient.get<any>(this.url_base+"dientes/"+cedula);
  }

  delTratamiento(id:String){
    return this.httpClient.delete<any>(this.url_base+"delete/"+id);
  }
}
