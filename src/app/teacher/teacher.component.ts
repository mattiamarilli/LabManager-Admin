import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'
import { ClassService } from '../services/class.service'
import {Classi} from '../model';
import {Docenti} from '../model'
import {Docente} from '../model_body'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {TeacherService} from '../services/teacher.service'
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private teacherService:TeacherService,  private modalService: NgbModal) { }

  docenti:Docenti[];
  docente:Docente;
  id_docente:number;

  //modal
  nome:string = '';
  admin:boolean = true;

  ngOnInit() {
      this.docente = new Docente();
      this.teacherService.getDocenti().subscribe((data: Docenti []) => {
        this.docenti = data;
      });
  }


  addDocente(){
    this.docente.nome = this.nome;
    this.docente.admin = this.admin;
    this.teacherService.setDocente(this.docente).subscribe();
  }

  modifyStudent(){
    this.docente.nome = this.nome;
    this.docente.admin = this.admin;
    this.teacherService.modifyDocente(this.docente,this.id_docente).subscribe();
   
  }

  deleteDocente(){
    this.teacherService.deleteDocente(this.id_docente).subscribe();
  }

}
