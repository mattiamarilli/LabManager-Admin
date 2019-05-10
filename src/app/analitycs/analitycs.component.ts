import { Component, OnInit } from '@angular/core';
import { AnalitycsService } from '../services/analitycs.service';
import { DeletedTool } from '../model';
import { UsedTool } from '../model';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.css']
})
export class AnalitycsComponent implements OnInit {

  deletedTool:DeletedTool[];
  usedTool:UsedTool[];

  constructor(private analitycsService:AnalitycsService){}

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
}
