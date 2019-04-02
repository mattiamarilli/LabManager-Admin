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
    return this.http.get<Classi[]>(this.apiURL + '/admin/classe');

  }

  enable(id_classe:number){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/classe/enable`, { id_classe }, { headers: headers })
  }

  disable(id_classe:number){
    let headers = new HttpHeaders({
    });
    return this.http.delete(this.apiURL + `/admin/classe/enable`, { headers: headers })
  }

  setClasse(classe:Classe){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/classe`,{ classe }, { headers: headers })
  }


}
