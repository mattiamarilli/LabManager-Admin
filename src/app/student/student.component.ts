import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'
import { ClassService } from '../services/class.service'
import {Classi} from '../model'
import {Studenti} from '../model'
import {Studente} from '../model_body'
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService:StudentService,private classService:ClassService) { }

  idCLasse:number;
  elencoClassi:Classi[];
  elencoStudenti:Studenti[];
  studente:Studente;

  setNewStudent()
  {
    this.studentService.setStudente(this.studente);
  }

  getStudentByClass()
  {
    this.studentService.getStudenti().subscribe((data:Studenti[])=>{

      for(let dato of data)
        {
          if(dato.id_classe = this.idCLasse)
            this.elencoStudenti.push(dato);
        }
    })
  }

  ngOnInit() {

    /*this.classService.getClasse().subscribe((data: Classi[] ) => {
      this.elencoClassi = data;
    })*/
    this.elencoStudenti =  [
      {id: 1, nome: 'untente1', cognome: 'utente1', id_classe: 1, classe: 'dummyClass1', id_gruppo: 1, username: 'utente.1'},
      {id: 2, nome: 'untente2', cognome: 'utente2', id_classe: 2, classe: 'dummyClass2', id_gruppo: 1, username: 'utente.2'},
      {id: 3, nome: 'untente3', cognome: 'utente3', id_classe: 3, classe: 'dummyClass3', id_gruppo: 2, username: 'utente.3'},
      {id: 4, nome: 'untente4', cognome: 'utente4', id_classe: 4, classe: 'dummyClass4', id_gruppo: 4, username: 'utente.4'}
    ];

  }

}
