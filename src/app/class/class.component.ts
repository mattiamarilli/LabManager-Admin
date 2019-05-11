import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { StudentService } from '../services/student.service';
import { Classi } from '../model';
import { Studenti } from '../model';
import { Classe } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {ToolService} from '../services/tool.service'

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit{

  constructor(private classService:ClassService,
     private modalService: NgbModal, 
     private studentService:StudentService,
     private toastr: ToastrService,
     private toolService:ToolService) { }

  classi:Classi[];
  elencoStudenti:Studenti[];
  id_classe:number;
  classe:Classe;
  result:string;
  filter:string;

  //Modal
  nomec:string = '';
  anno_scolastico:number = null;
  next_anno_scolastico:number = null;
  warning:string = '';

  ngOnInit() {
    this.classe = new Classe();
    this.classService.getClassi().subscribe((data: Classi []) => {
      this.classi = data;
    });
    this.classService.loadClassi();
  }

  validationClass(enable: any){
    this.warning = '';
    this.id_classe = enable.value;
    if(!enable.checked){
      this.classService.disable(this.id_classe).subscribe(data => {
        if(data['code'] == 200){
          this.toastr.warning('Classe Disattivata con successo', 'Disattivata');
          this.toolService.releaseAll().subscribe();
        }else{
          this.warning = data['message'];
        }
      });
    }else{
      
      this.classService.enable(this.id_classe).subscribe(data => {
       
          if(data['code'] == 200){
            this.toastr.success('Successo', 'Classe Attivata');
            this.classService.loadClassi();
            this.modalService.dismissAll('Reason');
          }
          else if(data['code'] == 403){
            this.toastr.error(data['message'],'Attenzione')
            this.classService.loadClassi();
          }
          else{
            this.toastr.error(data['message'],'Attenzione')
            this.classService.loadClassi();
          }
        }
      );
    }
  }

  //Modal
  open(content){
    this.anno_scolastico = null;
    this.next_anno_scolastico = null;
    this.nomec = '';
    this.warning = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }

  openClassModify(modify, id_classe){
    this.id_classe = id_classe;
    for(let c of this.classi){
      if(id_classe == c.id_classe){
        this.classe.nome = c.nome;
        this.classe.anno_scolastico = c.anno_scolastico;
      }
    }
    this.modalService.open(modify, {ariaLabelledBy: 'modal-basic-titile'});
  }

  openStudent(student, id_classe){
    this.id_classe = id_classe;
    this.getStudentByClass();
    this.modalService.open(student, {ariaLabelledBy: 'modal-basic-titile'});
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
    this.classService.setClasse(this.classe).subscribe(data => {
      if(data['code'] == 200){
        this.classService.loadClassi();
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.warning = data['message'];
      }
    });
  }

  getStudentByClass()
  {
    this.elencoStudenti = []
    this.studentService.getAllStudenti().subscribe((data:Studenti[])=>{
      for(let dato of data)
        {
          if(dato.id_classe = this.id_classe)
            this.elencoStudenti.push(dato);
        }
    })
  }

  modifyClass(){
    this.classService.modifyClass(this.classe, this.id_classe).subscribe(data => {
      if(data['code'] == 200){
        this.classService.loadClassi();
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.warning = data['message'];
      }
    });
  }

  deleteClass(id_classe){
    this.classService.deleteClass(id_classe).subscribe(data => {
      if(data['code'] == 200){
        this.classService.loadClassi();
      }else{
        this.modalService.dismissAll('Reason');
        this.warning = data['message'];
      }
    });
  }
}
