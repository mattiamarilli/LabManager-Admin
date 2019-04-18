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
  id_classe_input:number = null;
  anno_scolastico_input:number = null;
  classi:Classi[];

  //modal
  nome:string = '';
  cognome:string = '';
  id_classe:number;

  ngOnInit() {
      this.studente = new Studente();
      this.classService.getClassi().subscribe((data:Classi[]) => {
        this.classi = data;
      });
      this.classService.loadClassi();
      this.studentService.getStudenti().subscribe((data: Studenti []) => {
        this.studenti = data;
      });
      this.studentService.loadStudenti();
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

  onChangeIdClasse(id_classe:any){
    console.log(id_classe);
  }

  onChangeAnnoScolastico(anno_scolastico:any){
    console.log(anno_scolastico);
  }
}
