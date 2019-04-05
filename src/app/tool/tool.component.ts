import { Component, OnInit } from '@angular/core';
import {ToolService} from '../services/tool.service'
import { Utensili, Categorie } from '../model'
import { Utensile } from '../model_body'
  @Component({
    selector: 'app-tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.css']
  })
  export class ToolComponent implements OnInit {

    constructor(private toolService:ToolService) { }
    id_categoria:number;
    Categorie:Categorie[];
    Utensili:Utensili[];
    utensile:Utensile;
    
    nomec: string;
    nomeu:string;

    ngOnInit() {
      this.Categorie = [
       {id_categoria: 1, nome: 'dummyClass1'},
       {id_categoria: 2, nome: 'dummyClass2'},
       {id_categoria: 3, nome: 'dummyClass3'},
       {id_categoria: 4, nome: 'dummyClass4'},
     ];
   }
    setNewTool()
    {
      this.toolService.setUtensile(this.utensile);
    }


}