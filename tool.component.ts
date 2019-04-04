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
    idCategoria:number;
    elencoCategorie:Categorie[];
    elencoUtensili:Utensili[];
    utensile:Utensile;

    setNewTool()
    {
      this.toolService.setUtensile(this.utensile);
    }
    getToolbyCategory()
  {
    this.toolService.getUtensili().subscribe((data:Utensili[])=>{
      for(let dato of data)
      {
        if(dato.id_categoria=this.idCategoria)
        this.elencoUtensili.push(dato);
      }
    })
  }
    ngOnInit() {
      this.toolService.getUtensili().subscribe((data: Categorie[] ) => {
        this.elencoCategorie = data;
    })
  }

}
