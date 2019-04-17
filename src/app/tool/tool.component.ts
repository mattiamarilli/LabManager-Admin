import { Component, OnInit } from '@angular/core';
import {ToolService} from '../services/tool.service'
import { IUtensile } from '../model'
import { IUtensileBody } from '../model_body'

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
