import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './loginUtils/auth.service'

@Injectable()
export class AllServices{
    private _urlglobal = "http://localhost:3000/api";
    private _urlPatient = "/pacientes/consultar";
    private _urlCitas = "/citas/consultar";

    constructor(private http: HttpClient, private router: Router, private login:AuthService ) {
   

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

    getTop10Citas(){
        return this.http.get<any>(this._urlglobal+this._urlCitas+"/top10");
    }

    deleteCita(id:String){
        return this.http.delete<any>(this._urlglobal+this._urlCitas+"/delete/"+id)
    }

    getCitasbyParamDate(param:any){
        return this.http.post<any>(this._urlglobal+this._urlCitas+"/filtrar",param)
    }

    getTop10CitasbyMed(id:String,active:String){
        return this.http.get<any>(this._urlglobal+this._urlCitas+"/historial/"+id+"&"+active);
    }

  

}