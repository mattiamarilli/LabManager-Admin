import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IGruppo } from "../model";

@Injectable({
  providedIn: "root"
})
export class GroupService {

  apiURL: string;

  constructor(private http: HttpClient) { }

  getGruppi(): Observable<Array<IGruppo>> {
    const headers = new HttpHeaders({
    });

    return this.http.get<Array<IGruppo>>(this.apiURL + "/admin/gruppo");
  }
}
