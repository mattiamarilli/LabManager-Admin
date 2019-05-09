import { Component, OnInit } from '@angular/core';
import {ClassService} from '../services/class.service'
import {Classi} from '../model'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

constructor(private classService:ClassService) { }

time = new Date();
classi:Classi[];
classe:Classi = new Classi();


ngOnInit() {
  this.classService.getClassi().subscribe((data: Classi []) => {
    this.classi = data;
  });

  for(let classe of this.classi)
  {
    if(classe.enabled)
      this.classe = classe;
  }

    setInterval(() => {
       this.time = new Date();
    }, 1000);
}

}
