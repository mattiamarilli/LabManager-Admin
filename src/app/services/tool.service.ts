import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { Utensili, Categorie } from '../model';
import { Utensile } from '../model_body';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private http: HttpClient) { }
  
  apiURL:string;

  getUtensili(): Observable<Utensili>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Utensili>(this.apiURL + '/admin/utensile');

  }

  setUtensile(utensile:Utensile){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/utensile`,{ utensile }, { headers: headers })
  }

  getCategorie(): Observable<Categorie>{
    let headers = new HttpHeaders({
    });
    return this.http.get<Categorie>(this.apiURL + '/admin/categoria');

  }

  setCategoria(categoria:string){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/utensile`,{ categoria }, { headers: headers })
  }

}
