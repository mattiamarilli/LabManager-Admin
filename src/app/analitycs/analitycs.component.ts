import { Component, OnInit } from '@angular/core';
import { AnalitycsService } from '../services/analitycs.service';
import { DeletedTool } from '../model';
import { UsedTool } from '../model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.css']
})
export class AnalitycsComponent implements OnInit {

  deletedTool:DeletedTool[];
  usedTool:UsedTool[];
  p: any;

  constructor(private analitycsService:AnalitycsService, private toastr: ToastrService){}

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
}
