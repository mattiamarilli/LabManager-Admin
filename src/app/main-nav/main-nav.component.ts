import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service'
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { AuthUser } from '../model';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {


  userString:string = "";
  authUser:AuthUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private router: Router,private breakpointObserver: BreakpointObserver,private authService: AuthenticationService,) {



  }

  ngOnInit()
  {
      this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.userString += this.authUser.nome;
      
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(['/login']);

  }

}
