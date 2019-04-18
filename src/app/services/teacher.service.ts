import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import {formatDate} from '@angular/common';
import {Docenti} from '../model'
import {Docente} from '../model_body'
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getDocenti(): Observable<Docenti[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Docenti[]>(environment.apiUrl + '/admin/docente');
  }

  setDocente(docente:Docente){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/docente`, JSON.stringify(docente), { headers: headers });
  }

  modifyDocente(docente:Docente,id_docente:number){
   
      let headers  =new HttpHeaders({});

      let body = {
        'id_docente':id_docente,
        'nome':docente.nome,
        'admin': docente.admin
      };
      return this.http.put('/admin/docente', JSON.stringify(body), { headers: headers });
    
  }

  deleteDocente(id_docente:number){
    let headers  =new HttpHeaders({});
    return this.http.request('delete', `/admin/docente`, { body: { headers: headers, id_docente: id_docente } });
  }
}
