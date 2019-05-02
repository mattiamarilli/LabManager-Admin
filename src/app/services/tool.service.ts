import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import '../model'
import '../model_body'
import { Utensili, Categorie } from '../model';
import { Utensile } from '../model_body';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  apiURL:string;
  private utensili:Subject<Utensili[]>;
  private categorie:Subject<Categorie[]>;

  constructor(private http: HttpClient){
    this.utensili = new Subject<Utensili[]>();
    this.categorie = new Subject<Categorie[]>();
  }

  getUtensili(): Observable<Utensili[]> {
    return this.utensili.asObservable();
  }

  loadUtensili(): void {
    this.http.get<Utensili[]>('/admin/utensile').subscribe(res => this.utensili.next(res));
  }

  setUtensile(nome:string, id_categoria:number){
    let headers = new HttpHeaders({});
    let body = {
      "id_categoria":id_categoria,
      "nome":nome
    };
    return this.http.post(`/admin/utensile`, JSON.stringify(body), { headers: headers });
  }

  modifyUtensile(nome:string, id_categoria:number, id_utensile:number){
    let headers = new HttpHeaders({});
    let body = {
      "id_utensile":id_utensile,
      "id_categoria":id_categoria,
      "nome":nome
    };
    return this.http.put('/admin/utensile', JSON.stringify(body), { headers: headers });
  }

  deleteUtensile(id_utensile:number){
    let headers  =new HttpHeaders({});
    return this.http.request('delete', `/admin/utensile`, { body: { headers: headers, id: id_utensile } });
  }

  removeAlert(id_utensile:number){
    let headers  =new HttpHeaders({});
    return this.http.request('delete', `/admin/utensile/segnalazione`, { body: { headers: headers, id: id_utensile } });
  }

  //Categoria
  getCategorie(): Observable<Categorie[]> {
    return this.categorie.asObservable();
  }

  loadCategorie(): void {
    this.http.get<Categorie[]>('/admin/categoria').subscribe(res => this.categorie.next(res));
  }

  setCategoria(nome:string){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/categoria`, nome, { headers: headers });
  }

  modifyCategoria(nome:string, id_categoria:number){
    let headers = new HttpHeaders({});
    let body = {
      "id_categoria":id_categoria,
      "nome":nome
    };
    return this.http.put('/admin/categoria', JSON.stringify(body), { headers: headers });
  }

  deleteCategoria(id:number){
    let headers  =new HttpHeaders({});
    return this.http.request('delete', `/admin/categoria`, { body: { headers: headers, id_categoria: id } });
  }
}
