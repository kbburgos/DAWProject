import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AutonomoService {
  private _urlAPI = "http://localhost:3000/";
  constructor(private http: HttpClient) {
    console.log("Trabajando") ;
  }
    getData(){
      return this.http.get<any>(this._urlAPI+"get");
    };

    addData(comida:any){
      return this.http.post<any>(this._urlAPI+'post',comida,{observe: 'response'});
    };

    deleteDate(id:any){
      return this.http.delete<any>(this._urlAPI+"delete",id);
    }

    updateData(comida:any){
      return this.http.put<any>(this._urlAPI+'update',comida,{observe: 'response'});
    }


  }

