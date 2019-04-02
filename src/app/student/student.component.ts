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

    this.classService.getClasse().subscribe((data: Classi[] ) => {
      this.elencoClassi = data;
    })

  }

}
