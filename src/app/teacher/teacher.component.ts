import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'
import { ClassService } from '../services/class.service'
import {Classi} from '../model';
import {Docenti} from '../model'
import {Docente} from '../model_body'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {TeacherService} from '../services/teacher.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private teacherService:TeacherService,  private modalService: NgbModal,private toastr: ToastrService) { }

  docenti:Docenti[];
  docente:Docente;
  id_docente:number;

  p:any;

  //modal
  nome:string = '';
  cognome:string = '';

  ngOnInit() {
      this.docente = new Docente();
      this.teacherService.getDocenti().subscribe((data:Docenti[]) => {
        this.docenti = data;
      });
      this.teacherService.loadDocenti();
  }
  resetPassword(id_docente:number){
    this.teacherService.resetPassword(id_docente).subscribe((data:any)=>{ 
      if(data.code == 200)
      this.toastr.success('Password Resettata', 'Successo');
      
      else
      this.toastr.error('Password non resettata', 'Errore');
    });
  }

  addDocente(){
    this.docente.nome = this.nome;
    this.docente.cognome = this.cognome;
    this.teacherService.setDocente(this.docente).subscribe(data => {
      if(data['code'] == 200){
        this.toastr.success('Docente aggiunto correttamente', 'Successo');
        this.teacherService.loadDocenti();
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  modifyDocente(){
    this.docente.nome = this.nome;
    this.docente.cognome = this.cognome;
    this.teacherService.modifyDocente(this.docente, this.id_docente).subscribe(data => {
      if(data['code'] == 200){
        this.teacherService.loadDocenti();
        this.toastr.success('Docente modificato correttamente', 'Successo');
        this.modalService.dismissAll('Reason');
      }else{
        this.modalService.dismissAll('Reason');
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  deleteDocente(id_docente){
    this.id_docente = id_docente;
    this.teacherService.deleteDocente(this.id_docente).subscribe(data => {
      if(data['code'] == 200){
        this.teacherService.loadDocenti();
        this.toastr.success('Docente eliminato correttamente', 'Successo');
      }else{
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  //Modal
  open(content){
    this.nome = '';
    this.cognome = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }

  openDocenteModify(modify, id_docente){
    this.nome = '';
    this.cognome = '';
    this.id_docente = id_docente;
    for(let d of this.docenti){
      if(id_docente == d.id_docente){
        this.nome = d.nome;
        this.cognome = d.cognome;
      }
    }
    this.modalService.open(modify, {ariaLabelledBy: 'modal-basic-titile'});
  }
}
