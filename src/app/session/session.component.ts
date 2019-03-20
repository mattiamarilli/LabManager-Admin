import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import {formatDate} from '@angular/common';
import { Session } from '../model';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(private teacherservice:TeacherService) { }

  sessions:Session;
  oldsessions:Session

  stopSession()
  { let date = formatDate(new Date(), 'yyyy-MM-dd h:MM:ss', 'en');
    this.teacherservice.closeCurrentSession(this.sessions[0].ses_id);
  }

  startSession(){

    this.teacherservice.newsession();
  }

  ngOnInit() {

    this.sessions = null;
    this.teacherservice.getActiveSessions().subscribe((data: Session ) => {
			this.sessions = data;
		}
    );;
    
    this.teacherservice.getOldSessions().subscribe((data: Session ) => {
			this.oldsessions = data;
		}
    );;
    
    
  }

}
