import { Component, OnInit } from '@angular/core';
import {ClassService} from '../services/class.service'
import {Classi} from '../model'

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private classService:ClassService) { }

  classi:Classi[];

  ngOnInit() {

    this.classService.getClasse().subscribe((data: Classi []) => {
      this.classi = data;
    })
  }

}
