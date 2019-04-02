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
    this.classService.getClasse().subscribe((data: Classi []) => {
      this.classi = data;
    })
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
