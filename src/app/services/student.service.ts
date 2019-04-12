import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { Studenti } from '../model';
import { Studente } from '../model_body';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiURL:string;

  constructor(private http: HttpClient) { }

  getStudenti(): Observable<Studenti[]>{
    let headers = new HttpHeaders({
    });
    //return this.http.get<Studenti[]>(this.apiURL + '/admin/studente');
    return this.http.get<Studenti[]>('/admin/studente');
  }

  setStudente(studente:Studente){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/classe`,{ studente }, { headers: headers })
  }
}
