import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { Classi } from '../model';
import { Classe } from '../model_body';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit{

  constructor(private classService:ClassService, private modalService: NgbModal) { }

  classi:Classi[];
  id_classe:number;
  classe:Classe;
  result:string;
  filter:string;

  //Modal
  nomec:string = '';
  anno_scolastico:number = null;
  next_anno_scolastico:number = null;
  warning:string = '';

  ngOnInit() {
    this.classe = new Classe();
    this.classService.getClasse().subscribe((data: Classi []) => {
      this.classi = data;
    })
  }

  validationClass(enable: any){
    this.warning = '';
    this.id_classe = enable.value;
    if(!enable.checked){
      console.log(this.id_classe);
      this.classService.disable(this.id_classe).subscribe(data => {
        if(data['code'] == 200){
          window.location.reload();
        }else{
          this.warning = data['message'];
        }
      });
    }else{
      this.classService.enable(this.id_classe).subscribe(data => {
          if(data['code'] == 200){
            window.location.reload();
          }else{
            this.warning = data['message'];
          }
        }
      );
    }
  }

  //Modal
  open(content){
    this.anno_scolastico = null;
    this.next_anno_scolastico = null;
    this.nomec = '';
    this.warning = '';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }

  onKey(event: any){
    if(event.target.value.length ==  4){
      this.next_anno_scolastico = event.target.value;
      this.next_anno_scolastico ++;
    }
  }

  addClass(){
    this.classe.nome = this.nomec;
    this.classe.anno_scolastico = this.anno_scolastico;
    this.classService.setClasse(this.classe).subscribe(data => {
      if(data['code'] == 200){
        window.location.reload();
      }else{
        this.modalService.dismissAll('Reason');
        this.warning = data['message'];
      }
    });
  }

}
