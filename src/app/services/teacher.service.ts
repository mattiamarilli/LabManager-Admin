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
  private docenti:Subject<Docenti[]>;

  constructor(private http: HttpClient){
    this.docenti = new Subject<Docenti[]>();
  }

  getDocenti(): Observable<Docenti[]> {
    return this.docenti.asObservable();
  }

  loadDocenti(): void {
    this.http.get<Docenti[]>('/admin/docente').subscribe(res => this.docenti.next(res));
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
        'cognome':docente.cognome
      };
      return this.http.put('/admin/docente', JSON.stringify(body), { headers: headers });

  }

  deleteDocente(id_docente:number){
    let headers  =new HttpHeaders({});
    return this.http.request('delete', `/admin/docente`, { body: { headers: headers, id_docente: id_docente } });
  }
}
