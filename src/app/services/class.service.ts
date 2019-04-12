import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { Classi } from '../model';
import { Classe } from '../model_body';


@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  apiURL:string;

  getClasse(): Observable<Classi[]>{
    let headers = new HttpHeaders({
    });
    //return this.http.get<Classi[]>(this.apiURL + '/admin/classe');
    return this.http.get<Classi[]>('/admin/classe');

  }

  enable(id_classe:number){
    let headers = new HttpHeaders({});
    //return this.http.post(this.apiURL + `/admin/classe/enable`, { id_classe }, { headers: headers })
    return this.http.post(`/admin/classe/enable`, JSON.stringify(id_classe), { headers: headers });
  }

  disable(id_classe:number){
    let headers = new HttpHeaders({});
    let body = {
      'headers': headers,
      'id_classe': id_classe
    };
    //return this.http.delete(this.apiURL + `/admin/classe/enable`, { headers: headers })
    return this.http.request('delete', `/admin/classe/enable`, { body: { headers: headers, id_classe: id_classe } });
  }

  setClasse(classe:Classe){
    let headers = new HttpHeaders({});
    //return this.http.post(this.apiURL + `/admin/classe`,{ classe }, { headers: headers })
    return this.http.post(`/admin/classe`, JSON.stringify(classe), { headers: headers });
  }

}
