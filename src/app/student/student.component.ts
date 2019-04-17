import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'
import { ClassService } from '../services/class.service'
import {IClasse} from '../model'
import {IStudente} from '../model'
import {IStudenteBody} from '../model_body'
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private studentService:StudentService,private classService:ClassService) { }

  idCLasse:number;
  elencoClassi:IClasse[];
  elencoStudenti:IStudente[];
  studente:IStudenteBody;

  setNewStudent()
  {
    this.studentService.setStudente(this.studente);
  }

  getStudentByClass()
  {
    this.studentService.getStudenti().subscribe((data:IStudente[])=>{

      for(let dato of data)
        {
          if(dato.id_classe = this.idCLasse)
            this.elencoStudenti.push(dato);
        }
    })
  }

  ngOnInit() {
    this.studentService.getStudenti().subscribe((data: IStudente[] ) => {
      this.elencoStudenti = data;
    });
  }

}
