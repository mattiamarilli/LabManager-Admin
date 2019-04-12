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
export class ClassComponent implements OnInit{

  constructor(private classService:ClassService, private modalService: NgbModal) { }

  classi:Classi[];
  id_classe:number;
  classe:Classe;
  result:string;
  filter:string;

  //Modal
  nomec:string = '';
  anno_scolastico:number = null;
  next_anno_scolastico:number = null;

  ngOnInit() {
    this.classe = new Classe();
    this.classService.getClasse().subscribe((data: Classi []) => {
      this.classi = data;
    })
    //Fictitious classes for tests
    /*this.classi = [
      {id_classe: 1, nome: 'dummyClass1', anno_scolastico: 2019, enabled: false},
      {id_classe: 2, nome: 'dummyClass2', anno_scolastico: 2019, enabled: true},
      {id_classe: 3, nome: 'dummyClass3', anno_scolastico: 2019, enabled: false},
      {id_classe: 4, nome: 'dummyClass4', anno_scolastico: 2019, enabled: true},
    ];*/
  }

  validationClass(enable: any){
    console.log(enable.checked);
    console.log(enable.value);
    if(!enable.checked){
      this.classService.disable().subscribe((res : any)=>{
        console.log(res);
      });
    }else{
      this.id_classe = enable.value;
      this.classService.enable(this.id_classe).subscribe(data => {
          console.log(data);
        }
      );
    }
  }

  //Modal
  open(content){
    this.anno_scolastico = null;
    this.next_anno_scolastico = null;
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
    this.classe.nome = this.nomec;
    this.classe.anno_scolastico = this.anno_scolastico;
    console.log(this.classe);
    this.classService.setClasse(this.classe).subscribe(data => {
      console.log(data);
    });
  }

}
