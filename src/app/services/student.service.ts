import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  private studenti:Subject<Studenti[]>;

  constructor(private http: HttpClient) {
    this.studenti = new Subject<Studenti[]>();
  }

  getStudenti(): Observable<Studenti[]> {
    return this.studenti.asObservable();
  }

  loadStudenti(): void {
    this.http.get<Studenti[]>('/admin/studente').subscribe(res => this.studenti.next(res));
  }

  getAllStudenti(): Observable<Studenti[]>{
    let headers = new HttpHeaders({});
    return this.http.get<Studenti[]>('/admin/studente', { headers: headers });
  }

  setStudent(studente:Studente){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/studente`, JSON.stringify(studente), { headers: headers });
  }

  modifyStudent(studente:Studente, id_studente:number){
    let headers = new HttpHeaders({});
    let body = {
      'id_studente': id_studente,
      'nome': studente.nome,
      'cognome': studente.cognome,
      'id_classe': studente.id_classe
    }
    return this.http.put(`/admin/studente`, JSON.stringify(body), { headers: headers });
  }

  deleteStudent(id_studente:number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/studente`, { body: { headers: headers, id_studente: id_studente } });
  }
}
