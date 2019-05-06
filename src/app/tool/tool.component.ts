import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { Utensili, Categorie, } from '../model';
import { Utensile } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


  @Component({
    selector: 'app-tool',
    templateUrl: './tool.component.html',
    styleUrls: ['./tool.component.css']
  })
  export class ToolComponent implements OnInit {

    categorie:Categorie[];
    utensili:Utensili[];
    utensile:Utensile;

    nomeInput:String;
    idInput:number;
    id_categoria:number;
    warning:string;

    constructor(private toolService:ToolService, private modalService: NgbModal){

    }

    generateqrcat(id:number){
        window.open('http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={"type":"category","id": ' + id + '}', "_blank");
    }

    generateqrtool(id:number){
      window.open('http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={"type":"tool","id": ' + id + '}', "_blank");
  }



    ngOnInit(){
      this.toolService.getUtensili().subscribe((data: Utensili []) => {
        this.utensili = data;
      });
      this.toolService.loadUtensili();

      this.toolService.getCategorie().subscribe((data: Categorie []) => {
        this.categorie = data;
      });
      this.toolService.loadCategorie();
    }

    //Method
    AddCategoria(nome){
      this.toolService.setCategoria(nome).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadCategorie();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.warning = data['message'];
        }
      });
    }

    ModifyCategoria(nome){
      this.toolService.modifyCategoria(nome, this.idInput).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadCategorie();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.warning = data['message'];
        }
      });
    }

    DeleteCategoria(id){
      this.toolService.deleteCategoria(id).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadCategorie();
        }else{
          this.warning = data['message'];
        }
      });
    }

    AddAttrezzo(nome){
      this.toolService.setUtensile(nome, this.id_categoria).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadCategorie();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.warning = data['message'];
        }
      });
    }

    ModifyUtensile(nome){
      this.toolService.modifyUtensile(nome, this.id_categoria, this.idInput).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadUtensili();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.warning = data['message'];
        }
      });
    }

    DeleteUtensile(id){
      this.toolService.deleteUtensile(id).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadUtensili();
        }else{
          this.warning = data['message'];
        }
      });
    }

    //Modal
    open(content){
      this.nomeInput="";
      this.warning="";
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
    }

    openCategoriaModify(modify, id){
      this.idInput = id;
      for(let c of this.categorie){
        if(id == c.id_categoria){
          this.nomeInput = c.nome;
        }
      }
      this.modalService.open(modify, {ariaLabelledBy: 'modal-basic-titile'});
    }

    openUtensileModify(modify, id){
      this.idInput = id;
      for(let u of this.utensili){
        if(u.id_utensile == id){
          this.nomeInput = u.nome;
          this.id_categoria = u.id_categoria;
        }
      }
      this.modalService.open(modify, {ariaLabelledBy: 'modal-basic-titile'});
    }

    //Utili
    onChangeCategoria(id_categoria:any){
      this.id_categoria = id_categoria;
    }

    removeAlert(id_utensile){
      this.toolService.removeAlert(id_utensile).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadUtensili();
        }else{
          this.warning = data['message'];
        }
      });
    }
/*
    constructor(private toolService:ToolService) { }

      ngOnInit() {
        /*this.toolService.getCategorie().subscribe((data: Categorie[] ) => {
          this.Categorie = data;
        })
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
  }*/
}
