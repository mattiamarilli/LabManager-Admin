import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { Gruppi } from '../model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGruppi(): Observable<Gruppi[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Gruppi[]>('/admin/gruppo');

  }
}
