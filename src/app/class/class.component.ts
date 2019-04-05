import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { Classi } from '../model';
import { Classe } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private classService:ClassService, private modalService: NgbModal) { }

  classi:Classi[];
  id_classe:number;
  classe:Classe;

  //Modal
  nomec:string = '';
  anno_scolastico:number = null;
  next_anno_scolastico:number = null;
  ngOnInit() {
    /*this.classService.getClasse().subscribe((data: Classi []) => {
      this.classi = data;
    })*/
    //Fictitious classes for tests
    this.classi = [
      {id_classe: 1, nome: 'dummyClass1', anno_scolastico: 2019, enabled: false},
      {id_classe: 2, nome: 'dummyClass2', anno_scolastico: 2019, enabled: true},
      {id_classe: 3, nome: 'dummyClass3', anno_scolastico: 2019, enabled: false},
      {id_classe: 4, nome: 'dummyClass4', anno_scolastico: 2019, enabled: true},
    ];
  }

  setNewClass(){
    this.classService.setClasse(this.classe);
  }

  validateClass(){
    this.classService.enable(this.id_classe);
  }

  unvalidateClass(){
    this.classService.disable();
  }

  //Modal
  open(content){
    this.anno_scolastico = null;
    this.nomec = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }

  onKey(event: any){
    if(event.target.value.length ==  4){
      this.next_anno_scolastico = event.target.value;
      this.next_anno_scolastico ++;
    }
  }

  addClass(){
    this.classe.nome = this.nomec
    this.classe.anno_scolastico = this.anno_scolastico;
    this.classService.setClasse(this.classe);
  }

}
