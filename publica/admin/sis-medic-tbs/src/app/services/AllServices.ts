import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './loginUtils/auth.service'

@Injectable()
export class AllServices {
    private _urlglobal = "https://api-sis-medic-tbs.herokuapp.com/api";
    private _urlPatient = "/pacientes/consultar";
    private _urlCitas = "/citas/consultar";
    private _urlmedics = "/medicos/consultar";
    private _urlUser = "/login";
    private _urlUser1 = "/usuarios/consultar";
    private _urlExam = "/examenes/consultar";
    private _urlEstadistica = "/estadisticas/consultar";


    constructor(private http: HttpClient, private router: Router, private login: AuthService) {


    }

    //Para las estadísticas
    getCitasNoAtendidas() {
      return this.http.get<any>(this._urlglobal + this._urlEstadistica + "/noatendidas");
    }

    //Para las estadísticas
    getCitasAtendidas() {
      return this.http.get<any>(this._urlglobal + this._urlEstadistica + "/atendidas");
    }

    //Para las estadísticas
    getMedicos() {
      return this.http.get<any>(this._urlglobal + this._urlEstadistica + "/medicos");
    }

        //Para las estadísticas

    getAdmin() {
      return this.http.get<any>(this._urlglobal + this._urlEstadistica + "/admin");
    }


    createCita(cita:any){
      return this.http.post<any>(this._urlglobal+this._urlCitas+"/newcita/",cita);
    }

    getMedicByParameter(parametro:String){
    return this.http.get<any>(this._urlglobal+this._urlmedics+"/filtro/"+parametro);
    }


    getTop10User() {
        return this.http.get<any>(this._urlglobal + this._urlUser + "/top10");
    }

    getTop10Medic(){
    return this.http.get<any>(this._urlglobal+this._urlmedics+"/top10");
    }

    getallMedics() {
        return this.http.get<any>(this._urlglobal + this._urlmedics + "/allmedics");
    }

    deleteMedic(id:String){
    return this.http.delete<any>(this._urlglobal+this._urlmedics+"/delete/"+id)
    }

    getTop10Patient() {
        return this.http.get<any>(this._urlglobal + this._urlPatient + "/top10");
    }
    getPatientByParameter(parametro: String) {
        return this.http.get<any>(this._urlglobal + this._urlPatient + "/filtro/" + parametro);
    }
    getUserByParameter(parametro: String) {
        return this.http.get<any>(this._urlglobal + this._urlUser1 + "/filtro/" + parametro);
    }
    createUser(usuario: any) {
        return this.http.post<any>(this._urlglobal + this._urlUser + "/newUser", usuario);
    }
    createPacient(paciente: any) {
        return this.http.post<any>(this._urlglobal + this._urlPatient + "/newPacient", paciente);
    }
    deletePatient(id: String) {
        return this.http.delete<any>(this._urlglobal + this._urlPatient + "/delete/" + id)
    }

    updatePatient(id: String, body: any) {
        return this.http.put<any>(this._urlglobal + this._urlPatient + "/update/" + id, body);
    }

    getTop10Citas(active: string) {
        return this.http.get<any>(this._urlglobal + this._urlCitas + "/top10/" + active);
    }

    getallPacientes() {
        return this.http.get<any>(this._urlglobal + this._urlPatient + "/getallpacientes");
    }

    deleteCita(id: String) {
        return this.http.delete<any>(this._urlglobal + this._urlCitas + "/delete/" + id)
    }

    getCitasbyParamDate(param: any) {
        return this.http.post<any>(this._urlglobal + this._urlCitas + "/filtrar", param)
    }

    getTop10CitasbyMed(id: String, active: String) {
        return this.http.get<any>(this._urlglobal + this._urlCitas + "/historial/" + id + "&" + active);
    }

    updateCita(id: string, cita: any) {
        return this.http.put<any>(this._urlglobal + this._urlCitas + "/update/" + id, cita);
    }
    updateUser(id: String, body: any) {
        return this.http.put<any>(this._urlglobal + this._urlUser1 + "/update/" + id, body);
    }
    getTop10Exam() {
        return this.http.get<any>(this._urlglobal + this._urlExam + "/top10");
    }
    filtrarExamen(cedula:string){
        return this.http.get<any>(this._urlglobal + this._urlExam +"/filtro/"+cedula);
    }

    deleteExam(id:string){
        return this.http.delete<any>(this._urlglobal+this._urlExam+"/delete/"+id);
    }

    getExamByCI(id:string){
        return this.http.get<any>(this._urlglobal+this._urlExam+"/getbyid/"+id);
    }

    getExamByCedula(ced:string){
        return this.http.get<any>(this._urlglobal+this._urlExam+"/pacienteCedula/"+ced);
    }

    updateExam(id:string,body:any){
        return this.http.put<any>(this._urlglobal+this._urlExam+"/updateexam/"+id,body);
    }

    
}
