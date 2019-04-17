import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { IStudente } from '../model';
import { IStudenteBody } from '../model_body';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiURL:string;

  constructor(private http: HttpClient) { }

  getStudenti(): Observable<IStudente[]>{
    let headers = new HttpHeaders({
    });
    //return this.http.get<IStudente[]>(this.apiURL + '/admin/studente');
    return this.http.get<IStudente[]>('/admin/studente');
  }

  setStudente(studente:IStudenteBody){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/classe`,{ studente }, { headers: headers })
  }
}
