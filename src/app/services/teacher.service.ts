import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  url:string = 'http://marilliaws.ddns.net/qrmarconi-backend/';
 

  getActiveSessions(){
    let headers = new HttpHeaders({
    });
    return this.http.get(this.url + "currentsession.php", { headers: headers });
  }

  closeCurrentSession(ses_id:number){
    return this.http.get(this.url + "closecurrentsession.php?ses_id=" + ses_id);
  }

  getOldSessions(){
    let headers = new HttpHeaders({
    });
    return this.http.get(this.url + "oldsession.php", { headers: headers });
  }

  newsession(){
    let headers = new HttpHeaders({
    });
    this.http.get(this.url + "createsession.php", { headers: headers });
  }

}
