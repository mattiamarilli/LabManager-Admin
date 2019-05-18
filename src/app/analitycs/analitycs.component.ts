import { Component, OnInit } from '@angular/core';
import { AnalitycsService } from '../services/analitycs.service';
import { DeletedTool } from '../model';
import { UsedTool } from '../model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.css']
})
export class AnalitycsComponent implements OnInit {

  deletedTool:DeletedTool[];
  usedTool:UsedTool[];
  p: any;
  storico:any[] = [];

  constructor(private analitycsService:AnalitycsService, private toastr: ToastrService, private modalService: NgbModal){}

  ngOnInit() {
    this.analitycsService.deletedTool().subscribe((data:DeletedTool[]) => {
      this.deletedTool = data;
    });
    this.analitycsService.usedTool().subscribe((data:UsedTool[]) => {
      this.usedTool = data;
    });
  }

  convertTime(secondi: number){
    const ore = Math.floor(secondi / 3600);
    secondi = secondi % 3600;
    const minuti = Math.floor(secondi / 60);
    secondi = secondi % 60;

    const pad = (n) => ("0" + n).slice(-2);

    return `${pad(ore)}:${pad(minuti)}:${pad(secondi)}`;
  }

  restoreUtensile(value:any){
    let c = value.split(',');
    let id_categoria = c[1];
    let id_utensile = c[0];
    this.analitycsService.restoreTool(id_utensile, id_categoria).subscribe((data) => {
      if(data['code'] == 200){
        this.analitycsService.deletedTool().subscribe((data:DeletedTool[]) => {
          this.deletedTool = data;
        });
        this.toastr.success('Restore avvenuto con successo','Ottimo');
      }else{
        this.toastr.error(data['message'],'Attenzione')
      }
    });
  }

  openStoricoClassi(content:any, id_utensile:any){
    this.storico = [];
    this.analitycsService.storicoClassi(id_utensile).subscribe((data:any) => {
      for(let dato of data){
        for(let d of dato){
          if(d.id_utensile == id_utensile){
            this.storico.push(d);
          }
        }
      }
    });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }
}
