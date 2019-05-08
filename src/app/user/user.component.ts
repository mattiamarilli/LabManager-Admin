import { Component, OnInit } from '@angular/core';
import {AuthUser} from '../model'
import {AuthenticationService} from '../services/authentication.service'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user:AuthUser = new AuthUser;
  oldpassword:string;
  newpassword:string;
  modifyPassword(){
    this.authService.modifyPassword(this.user.id,this.oldpassword,this.newpassword).subscribe();
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

}
