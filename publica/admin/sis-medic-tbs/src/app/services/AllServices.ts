import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AllServices{
    private _urlglobal = "http://localhost:3000/api";
    private _urlPatient = "/pacientes/consultar";

    constructor(private http: HttpClient, private router: Router ) {
   

    }

    getTop10Patient(){
       return this.http.get<any>(this._urlglobal+this._urlPatient+"/top10");
    }
    getPatientByParameter(parametro:String){
        return this.http.get<any>(this._urlglobal+this._urlPatient+"/filtro/"+parametro);
    }
    createPacient(paciente:any){
        return this.http.post<any>(this._urlglobal+this._urlPatient+"/newPacient",paciente);
    }
    deletePatient(id:String){
        return this.http.delete<any>(this._urlglobal+this._urlPatient+"/delete/"+id)
    }

    updatePatient(id:String,body:any){
        return this.http.put<any>(this._urlglobal+this._urlPatient+"/update/"+id,body);
    }


    

}