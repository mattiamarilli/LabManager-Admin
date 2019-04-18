import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { IStudente } from "../model";
import { IStudenteBody } from "../model_body";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  apiURL: string;

  constructor(private http: HttpClient) { }

  getStudenti(): Observable<Array<IStudente>> {
    return this.http.get<Array<IStudente>>("/admin/studente");
  }

  setStudente(studente: IStudenteBody) {
    return this.http.post(this.apiURL + `/admin/classe`, { studente });
  }
}
