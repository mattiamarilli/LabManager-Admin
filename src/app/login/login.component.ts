import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {Auth} from '../model_body'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService: AuthenticationService) { }
  auth:Auth = new Auth();
  login(){
    state: RouterStateSnapshot;
  
    this.authService.login(this.auth).subscribe((data: boolean ) => {
      if(data == true)
          this.router.navigate(['/home']);
      else
        alert("Credenziali non corrette");
		}
    );;
  }

  fakelogin()
  {

    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }

}
