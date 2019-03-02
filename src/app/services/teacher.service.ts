import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";



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

}
