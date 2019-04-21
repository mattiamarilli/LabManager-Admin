import { Component, OnInit } from '@angular/core';
import {ToolService} from '../services/tool.service'
import { Utensili, Categorie, } from '../model'
import { Utensile } from '../model_body'
  @Component({
    selector: 'app-tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.css']
  })
  export class ToolComponent implements OnInit {

    constructor(private toolService:ToolService) { }
    idCategoria:number;
    categoria:Categorie;
    Categorie:Categorie[];
    Utensili:Utensili[];
    utensile:Utensile;
    
    nomec: string;
    nomeu:string;


      ngOnInit() {
        /*this.toolService.getCategorie().subscribe((data: Categorie[] ) => {
          this.Categorie = data;
        })*/
        this.Categorie = [
         {id_categoria: 1, nome: 'dummyClass1'},
         {id_categoria: 2, nome: 'dummyClass2'},
         {id_categoria: 3, nome: 'dummyClass3'},
         {id_categoria: 4, nome: 'dummyClass4'},
       ];
       this.Utensili = [
        {id_utensile: 1, nome: 'dummyClass1',segnala:true,id_categoria: 1,categoria: ''},
        {id_utensile: 2, nome: 'dummyClass2',segnala:true,id_categoria: 2,categoria: ''},
        {id_utensile: 3, nome: 'dummyClass3',segnala:false,id_categoria: 3,categoria: ''},
        {id_utensile: 4, nome: 'dummyClass4',segnala:true,id_categoria: 4,categoria: ''},
      ];
     }
   
    setNewTool()
    {
      this.toolService.setUtensile(this.utensile);
    }
    getToolByCategory()
  {
    this.toolService.getUtensili().subscribe((data:Utensili[])=>{

      for(let dato of data)
        {
          if(dato.id_categoria = this.idCategoria)
            this.Categorie.push(dato);
        }
    })
  }
  setNewCategory(){
    this.toolService.setCategoria(this.nomec);
  }
}