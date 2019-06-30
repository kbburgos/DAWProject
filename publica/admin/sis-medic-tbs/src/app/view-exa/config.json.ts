import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Config} from "./interface.json.js";

@Injectable()
export class ConfigService {
    configUrl = './../../assets/resources/JSON/data_examenes.json';
    constructor(private http: HttpClient) { }

    getConfig(): Observable<Config[]> {
        return this.http.get<Config[]>(this.configUrl);
        //.pipe(tap(data => alert(JSON.stringify(data))) , catchError(this.errorHandler));
    }
    
}