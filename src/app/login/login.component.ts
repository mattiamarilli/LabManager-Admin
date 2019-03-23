import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService: AuthenticationService) { }
  username:string;
  password:string;
  login(){
    
    this.authService.login(this.username,this.password).subscribe((data: User ) => {
      if(User)
      this.router.navigate(['/home']);
		});
  }

  ngOnInit() {
  }

}
