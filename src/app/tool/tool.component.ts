import { Component, OnInit } from '@angular/core';
import {ToolService} from '../services/tool.service'
import { Utensili } from '../model'
import { Utensile } from '../model_body'

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  constructor(private toolService:ToolService) { }

  ngOnInit() {
  }

}
