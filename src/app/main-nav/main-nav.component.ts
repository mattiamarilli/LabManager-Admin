import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service'
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
<<<<<<< HEAD
import { AuthUser } from '../model';
=======
>>>>>>> 5a4ed047eb8155f2e4273a3caeaac5d6026e6cf1
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {


  userString:string = "Ciao, ";
  authUser:AuthUser;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

<<<<<<< HEAD
  constructor(private router: Router,private breakpointObserver: BreakpointObserver,private authService: AuthenticationService,) {
=======
  constructor(private breakpointObserver: BreakpointObserver,private authService: AuthenticationService,private router: Router) {
>>>>>>> 5a4ed047eb8155f2e4273a3caeaac5d6026e6cf1



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

  fakelogout()
  {
    this.authService.fakelogout();
    this.router.navigate(['/login']);
  }

}
