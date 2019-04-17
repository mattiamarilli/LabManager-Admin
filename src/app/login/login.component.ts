import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {IAuthBody} from '../model_body'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService: AuthenticationService) { }
  auth:IAuthBody;
  login(){
    state: RouterStateSnapshot;
    
    this.authService.login(this.auth).subscribe((data: boolean ) => {
      if(data == true)
        {
          console.log('ciao');
          this.router.navigate(['/home']);
      }
		}
    );;
  }
  ngOnInit() {
  }

}
