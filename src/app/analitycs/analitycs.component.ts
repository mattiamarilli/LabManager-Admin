import { Component, OnInit } from '@angular/core';
import { AnalitycsService } from '../services/analitycs.service';
import { DeletedTool } from '../model';

@Component({
  selector: 'app-analitycs',
  templateUrl: './analitycs.component.html',
  styleUrls: ['./analitycs.component.css']
})
export class AnalitycsComponent implements OnInit {

  deletedTool:DeletedTool[];

  constructor(private analitycsService:AnalitycsService){}

  ngOnInit() {
    this.analitycsService.deletedTool().subscribe((data:DeletedTool[]) => {
      this.deletedTool = data;
    });
  }

}
