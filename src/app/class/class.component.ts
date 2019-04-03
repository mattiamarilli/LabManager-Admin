import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service'
import { Classi } from '../model'
import { Classe } from '../model_body'

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private classService:ClassService) { }

  classi:Classi[];
  id_classe:number;
  classe:Classe;

  ngOnInit() {
    /*this.classService.getClasse().subscribe((data: Classi []) => {
      this.classi = data;
    })*/
    //Fictitious classes for tests
    this.classi = [
      {id_classe: 1, nome: 'dummyClass1', anno_scolastico: 2019, scadenza: 18, enabled: false},
      {id_classe: 2, nome: 'dummyClass2', anno_scolastico: 2019, scadenza: 19, enabled: true},
      {id_classe: 3, nome: 'dummyClass3', anno_scolastico: 2019, scadenza: 20, enabled: false},
      {id_classe: 4, nome: 'dummyClass4', anno_scolastico: 2019, scadenza: 21, enabled: true},
    ];
  }

  setNewClass(){
    this.classService.setClasse(this.classe);
  }

  validateClass(){
    this.classService.enable(this.id_classe);
  }

  unvalidateClass(){
    this.classService.disable(this.id_classe);
  }

}
