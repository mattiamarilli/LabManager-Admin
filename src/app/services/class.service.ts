import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { IClasse } from "../model";
import { IClasseBody } from "../model_body";
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ClassService {

  private classi: Subject<Array<IClasse>>;

  constructor(private http: HttpClient) {
    this.classi = new Subject<Array<IClasse>>();
  }

  getClassi(): Observable<Array<IClasse>> {
    return this.classi.asObservable();
  }

  loadClassi(): void {
    this.http.get<Array<IClasse>>("/admin/classe")
      .pipe(
        map((classi) =>
          classi.map((classe) =>
            ({
              ...classe,
              id_classe: +classe.id_classe,
              anno_scolastico: +classe.anno_scolastico,
              anno_scolastico_display: `${+classe.anno_scolastico}/${+classe.anno_scolastico + 1}`
            })
          )
        ),
        tap(console.log)
      )
      .subscribe((res) => this.classi.next(res));
  }

  enable(id_classe: number) {
    return this.http.post("/admin/classe/enable", { id_classe });
  }

  disable(id_classe: number) {
    return this.http.request("delete", "/admin/classe/enable", { body: { id_classe }});
  }

  addClasse(classe: IClasseBody) {
    return this.http.post(`/admin/classe`, classe);
  }

  modifyClass(classe: IClasseBody, id_classe: number) {
    const body = {
      id_classe,
      nome: classe.nome,
      anno_scolastico: classe.anno_scolastico
    };

    return this.http.put("/admin/classe", body);
  }

  deleteClass(id_classe: number) {
    return this.http.request("delete", `/admin/classe`, { body: { id_classe } });
  }
}
