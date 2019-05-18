import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalitycsService {

  constructor(private http: HttpClient) { }

  deletedTool(){
    let headers = new HttpHeaders({});
    return this.http.get('/admin/statistiche/utensili/eliminati', { headers: headers });
  }

  usedTool(){
    let headers = new HttpHeaders({});
    return this.http.get('/admin/statistiche/utensili/usati', { headers: headers });
  }

  restoreTool(id_utensile:number, id_categoria:number){
    let headers = new HttpHeaders({});
    let body = {
      'id_utensile': id_utensile,
      'id_categoria': id_categoria
    }
    return this.http.post('/admin/statistiche/utensili/restore', JSON.stringify(body), { headers: headers });
  }

  storicoClassi(id_utensile:number){
    let headers = new HttpHeaders({});
    return this.http.get('/admin/statistiche/utensili/storico', { headers: headers });
  }
}
