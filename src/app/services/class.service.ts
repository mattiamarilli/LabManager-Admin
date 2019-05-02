import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import '../model'
import '../model_body'
import { Classi } from '../model';
import { Classe } from '../model_body';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';



@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {
    this.classi = new Subject<Classi[]>();
  }

  private classi:Subject<Classi[]>;

  public getClassi(): Observable<Classi[]> {
    
    return this.classi.asObservable();
  }

  public loadClassi(): void {
    this.http.get<Classi[]>('/admin/classe').subscribe(res => this.classi.next(res));
  }

  getAllClassi(): Observable<Classi[]>{
    let headers = new HttpHeaders({});
    return this.http.get<Classi[]>('/admin/classe', { headers: headers });
  }

  enable(id_classe:number){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/classe/enable`, JSON.stringify(id_classe), { headers: headers });
  }

  disable(id_classe:number){
    let headers = new HttpHeaders({});
    let body = {
      'headers': headers,
      'id_classe': id_classe
    };
    return this.http.request('delete', `/admin/classe/enable`, { body: { headers: headers, id_classe: id_classe } });
  }

  setClasse(classe:Classe){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/classe`, JSON.stringify(classe), { headers: headers });
  }

  modifyClass(classe:Classe, id_classe:number){
    let headers  =new HttpHeaders({});
    console.log(classe);
    let body = {
      'id_classe':id_classe,
      'nome':classe.nome,
      'anno_scolastico':classe.anno_scolastico
    };
    return this.http.put('/admin/classe', JSON.stringify(body), { headers: headers });
  }

  deleteClass(id_classe:number){
    let headers  =new HttpHeaders({});
    return this.http.request('delete', `/admin/classe`, { body: { headers: headers, id_classe: id_classe } });
  }
}
