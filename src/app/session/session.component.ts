import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';

import { Session } from '../model';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(private teacherservice:TeacherService) { }

  sessions:Session;

  ngOnInit() {
    this.teacherservice.getActiveSessions().subscribe((data: Session ) => {
			this.sessions = data;
		}
		);;
    
  }

}
