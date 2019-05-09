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
}
