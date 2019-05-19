import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'
import { ClassService } from '../services/class.service'
import { Classi, StrumentiUtilizzati } from '../model';
import { Studenti } from '../model';
import { Studente } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService:StudentService,private classService:ClassService, private modalService: NgbModal,private toastr: ToastrService) { }

  studenti:Studenti[];
  studente:Studente;
  id_studente:number;
  classi:Classi[];
  anno_scolastico_array = [];
  studenti_per_gruppo:Studenti[] = [];

  id_classe_input:any;
  anno_scolastico_input:any;
  p:any;

  get filteredStudent() {
    return this.studenti.filter(k => true);
  }

  //modal
  nome:string = '';
  cognome:string = '';
  id_classe:number = null;
  anno_scolastico:number = null;
  useTools:StrumentiUtilizzati[];

  ngOnInit() {
      this.studente = new Studente();
      this.classService.getClassi().subscribe((data:Classi[]) => {
        this.classi = data;
        let appoggio = [];
        for(let dato of data){
          appoggio.push(dato.anno_scolastico);
        }
        this.anno_scolastico_array = Array.from(new Set(appoggio));
      });
      this.classService.loadClassi();
      this.filter();
  }

  getInUseTools(tools,id_studente:number)
  {
    console.log(id_studente)
    this.studentService.showTools(id_studente).subscribe((data:StrumentiUtilizzati[])=>
    {
      this.useTools = data;
      console.log(this.useTools)
      if(this.useTools.length == 0)
        this.toastr.warning("Nessuno strumento in uso","Attenzione")
      else
      this.modalService.open(tools, {ariaLabelledBy: 'modal-basic-titile'});
    }
    );
  }

  resetPassword(id_studente:number){
    this.studentService.resetPassword(id_studente).subscribe((data:any)=>{ 
      if(data.code == 200)
      this.toastr.success('Password Resettata', 'Successo');
      
      else
      this.toastr.error('Password non resettata', 'Errore');
    });
  }

  addStudent(){
    this.studente.nome = this.nome;
    this.studente.cognome = this.cognome;
    this.studente.id_classe = this.id_classe;
    this.studentService.setStudent(this.studente).subscribe(data => {
      if(data['code'] == 200){
        this.studentService.loadStudenti();
        this.toastr.success('Studente aggiunto correttamente', 'Successo');
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  modifyStudent(){
    this.studente.nome = this.nome;
    this.studente.cognome = this.cognome;
    this.studente.id_classe = this.id_classe;
    this.studentService.modifyStudent(this.studente, this.id_studente).subscribe(data => {
      if(data['code'] == 200){
        this.toastr.success('Studente aggiunto correttamente', 'Successo');
        this.studentService.loadStudenti();
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  deleteStudent(id_studente){
    this.id_studente = id_studente;
    this.studentService.deleteStudent(this.id_studente).subscribe(data => {
      if(data['code'] == 200){
        this.toastr.success('Studente eliminato correttamente', 'Successo');
        this.studentService.loadStudenti();
      }else{
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  //Modal
  open(content){
    this.nome = '';
    this.cognome = '';
    this.id_classe = null;
    this.id_studente = null;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }

  openStudentModify(modify, id_studente){
    this.nome = '';
    this.cognome = '';
    this.id_classe = null;
    this.id_studente = id_studente;
    for(let s of this.studenti){
      if(id_studente == s.id){
        this.nome = s.nome;
        this.cognome = s.cognome;
        this.id_classe = s.id_classe;
      }
    }
    this.modalService.open(modify, {ariaLabelledBy: 'modal-basic-titile'});
  }

  openGroupMates(group, id_gruppo){
    this.studenti_per_gruppo = [];
    this.studentService.getAllStudenti().subscribe((data:Studenti[]) => {
      for(let dato of data){
        if(dato.id_gruppo == id_gruppo){
          this.studenti_per_gruppo.push(dato);
        }
      }
      this.modalService.open(group, {ariaLabelledBy: 'modal-basic-titile'});
    });
  }

  onChangeIdClasse(id_classe:any){
    this.id_classe = id_classe;
    this.filter();
  }

  onChangeIdClasseForAdd(id_classe:any){
    this.id_classe = id_classe;
  }

  onChangeAnnoScolastico(anno_scolastico:any){
    this.anno_scolastico = anno_scolastico;
    this.filter();
  }

  //Filter
  filter(){
    if(this.id_classe == null && this.anno_scolastico == null){
      this.studentService.getStudenti().subscribe((data: Studenti []) => {
        this.studenti = data;
      });
      this.studentService.loadStudenti();
    }else if(this.anno_scolastico == null){
      this.studenti = [];
      this.studentService.getAllStudenti().subscribe((data:Studenti[]) => {
        for(let dato of data){
          if(dato.id_classe == this.id_classe){
            this.studenti.push(dato);
          }
        }
      });
    }else if(this.id_classe == null){
      this.studenti = [];
      this.studentService.getAllStudenti().subscribe((data:Studenti[]) => {
        this.classService.getAllClassi().subscribe((classi:Classi[]) => {
          for(let dato of data){
            for(let classe of classi){
              if(classe.anno_scolastico == this.anno_scolastico){
                if(classe.id_classe == dato.id_classe){
                  this.studenti.push(dato);
                }
              }
            }
          }
        });
      });
    }else{
      this.studenti = [];
      this.studentService.getAllStudenti().subscribe((data:Studenti[]) => {
        this.classService.getAllClassi().subscribe((classi:Classi[]) => {
          for(let dato of data){
            for(let classe of classi){
              if(classe.id_classe == this.id_classe){
                if(classe.anno_scolastico == this.anno_scolastico){
                  if(dato.id_classe == classe.id_classe){
                    this.studenti.push(dato);
                  }
                }
              }
            }
          }
        });
      });
    }
  }
}
