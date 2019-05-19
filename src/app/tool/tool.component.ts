import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool.service';
import { Utensili, Categorie, StudentiUtilizzatori, } from '../model';
import { Utensile } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Studenti } from '../model'


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
    quantitaInput:number;
    idInput:number;
    id_categoria:number;
    elencoStudenti:StudentiUtilizzatori[];

    pc:any;
    pu:any;
    counter:number = 0;

    constructor(private toolService:ToolService, private modalService: NgbModal, private toastr: ToastrService){

    }

    ngOnInit(){
      this.toolService.getUtensili().subscribe((data: Utensili []) => {
        this.utensili = data;
        /*
        for(let tool of this.utensili)
        {
          if(tool.segnala)
            this.counter++;
          
        }

        if(this.counter>0)
          this.toastr.warning(this.counter + " strumenti sono stati segnalati","Attenzione");


        this.counter = 0;
        */
       
      });
      this.toolService.loadUtensili();

      this.toolService.getCategorie().subscribe((data: Categorie []) => {
        this.categorie = data;
      });
      this.toolService.loadCategorie();

      
      
    
    }

    //Method
    AddCategoria(nome,quantita){
      this.toolService.setCategoria(nome,quantita).subscribe((data) => {
        if(data['code'] == 200){
          this.toastr.success('Categoria aggiunta correttamente', 'Successo');
          this.toolService.loadCategorie();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.toastr.error(data['message'],'Attenzione')
        }
      });
    }

    showStudent(student,id_utensile:number){
      this.toolService.showStudent(id_utensile).subscribe((data: StudentiUtilizzatori[])=>
      {
        
        this.elencoStudenti = data;

        if(this.elencoStudenti.length == 0) 
          this.toastr.warning("L'attrezzo è al momento inutilizzato","Attenzione");
        else
          this.modalService.open(student, {ariaLabelledBy: 'modal-basic-titile'});
      });
     

    }

    ModifyCategoria(nome){
      this.toolService.modifyCategoria(nome, this.idInput).subscribe((data) => {
        if(data['code'] == 200){
          this.toastr.success('Categoria modificata correttamente', 'Successo');
          this.toolService.loadCategorie();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.toastr.error(data['message'],'Attenzione')
        }
      });
    }

    DeleteCategoria(id){
      this.toolService.deleteCategoria(id).subscribe((data) => {
        if(data['code'] == 200){
          this.toastr.success('Categoria eliminata correttamente', 'Successo');
          this.toolService.loadCategorie();
        }else{
          this.toastr.error(data['message'],'Attenzione')
        }
      });
    }

    AddAttrezzo(nome){
      this.toolService.setUtensile(nome, this.id_categoria).subscribe((data) => {
        if(data['code'] == 200){
          this.toolService.loadCategorie();
          this.toastr.success('Strumento aggiunto correttamente', 'Successo');
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.toastr.error(data['message'],'Attenzione')
        }
      });
    }

    ModifyUtensile(nome){
      this.toolService.modifyUtensile(nome, this.id_categoria, this.idInput).subscribe((data) => {
        if(data['code'] == 200){
          this.toastr.success('Strumento rimosso correttamente', 'Successo');
          this.toolService.loadUtensili();
          this.modalService.dismissAll('Reason');
        }else{
          this.modalService.dismissAll('Reason');
          this.toastr.error(data['message'],'Attenzione')
        }
      });
    }

    DeleteUtensile(id){
      this.toolService.deleteUtensile(id).subscribe((data) => {
        if(data['code'] == 200){
          this.toastr.success('Strumento eliminato correttamente', 'Successo');
          this.toolService.loadUtensili();
        }else{
          this.toastr.error(data['message'],'Attenzione')
        }
      });
    }

    //Modal
    open(content){
      this.nomeInput="";
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
          this.toastr.success('Segnalazione rimossa con successo', 'Successo');
          this.toolService.loadUtensili();
        }else{
          this.toastr.error(data['message'],'Attenzione')
          this.toolService.loadUtensili();
        }
      });
    }
    lockf(id_attrezzo:number, enable:boolean){
      if(enable){
        //Mette
        this.toolService.lock(id_attrezzo).subscribe((data) => {
          if(data['code'] == 200){
            this.toolService.loadUtensili();
            this.toastr.success('Non è più utilizzabile dagli studenti', 'Attrezzo bloccato');
          }else{
            this.toolService.loadUtensili();
            this.toastr.error(data['message'],'Attenzione')
          }
        });
      }else{
        //Toglie
        this.toolService.removeLock(id_attrezzo).subscribe((data) => {
          if(data['code'] == 200){
            this.toolService.loadUtensili();
            this.toastr.success('Nuovamente utilizzabile dagli studenti', 'Attrezzo sbloccato');
          }else{
            this.toolService.loadUtensili();
            this.toastr.error(data['message'],'Attenzione')
          }
        });
      }
    }

    //Generazione QR
    generateqrcat(id:number){
        window.open('http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={"type":"category","id": ' + id + '}', "_blank");
    }

    generateqrtool(id:number){
      window.open('http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl={"type":"tool","id": ' + id + '}', "_blank");
    }
}
