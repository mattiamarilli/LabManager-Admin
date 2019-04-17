import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { IUtensile, ICategoria } from '../model';
import { IUtensileBody } from '../model_body';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private http: HttpClient) { }
  
  apiURL:string;

  getUtensili(): Observable<IUtensile[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<IUtensile[]>(this.apiURL + '/admin/utensile');

  }

  setUtensile(utensile:IUtensileBody){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/utensile`,{ utensile }, { headers: headers })
  }

  getCategorie(): Observable<ICategoria[]>{
    let headers = new HttpHeaders({
    });
    return this.http.get<ICategoria[]>(this.apiURL + '/admin/categoria');

  }

  setCategoria(categoria:string){
    let headers = new HttpHeaders({
    });
    return this.http.post(this.apiURL + `/admin/utensile`,{ categoria }, { headers: headers })
  }

}
