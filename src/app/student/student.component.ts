import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'
import { ClassService } from '../services/class.service'
import { Classi } from '../model';
import { Studenti } from '../model';
import { Studente } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService:StudentService,private classService:ClassService, private modalService: NgbModal) { }

  studenti:Studenti[];
  studente:Studente;
  warning:string;
  id_studente:number;
  classi:Classi[];
  anno_scolastico_array = [];
  studenti_per_gruppo:Studenti[] = [];

  //modal
  nome:string = '';
  cognome:string = '';
  id_classe:number = null;
  anno_scolastico:number = null;

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

  addStudent(){
    this.studente.nome = this.nome;
    this.studente.cognome = this.cognome;
    this.studente.id_classe = this.id_classe;
    this.studentService.setStudent(this.studente).subscribe(data => {
      if(data['code'] == 200){
        this.studentService.loadStudenti();
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.warning = data['message'];
      }
    });
  }

  modifyStudent(){
    this.studente.nome = this.nome;
    this.studente.cognome = this.cognome;
    this.studente.id_classe = this.id_classe;
    this.studentService.modifyStudent(this.studente, this.id_studente).subscribe(data => {
      if(data['code'] == 200){
        this.studentService.loadStudenti();
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.warning = data['message'];
      }
    });
  }

  deleteStudent(id_studente){
    this.id_studente = id_studente;
    this.studentService.deleteStudent(this.id_studente).subscribe(data => {
      if(data['code'] == 200){
        this.studentService.loadStudenti();
      }else{
        this.warning = data['message'];
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

//CSS

$(function(){

$(document).on("focusout",".showActions",function(){
	
		$(".ActionsDiv").hide();
		$(".showActions").text("►");
		$(".showActions").data("status", "close");
	
});

$(document).on("click",".showActions",function(){
	

	if($(this).data("status") == "close"){
		
		$(".ActionsDiv").hide();
		$(".showActions").text("►");
		$(".showActions").data("status", "close");
		
		$(this).next().show();
		$(this).text("◄");
		$(this).data("status", "open");
	}
	else if($(this).data("status") == "open"){
		$(this).next().hide();
		$(this).text("►");
		$(this).data("status", "close");
	}
});

});
