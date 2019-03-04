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
    return this.http.get(this.url + "session.php", { headers: headers });
  }

  closeCurrentSession(ses_id:number,ses_chiusura:string){

    console.log(this.url + "closecurrentsession.php?ses_id=" + ses_id + "&ses_chiusura= " + ses_chiusura);
    return this.http.get(this.url + "closecurrentsession.php?ses_id=" + ses_id + "&ses_chiusura= " + ses_chiusura);
  }

}
