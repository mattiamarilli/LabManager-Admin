import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser :boolean
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
<<<<<<< HEAD
        const currentUser = this.authenticationService.currentUserValue();
        console.log(currentUser)
        if (currentUser) {
=======
         this.currentUser  = this.authenticationService.returnfakelogin();
        if (this.currentUser) {
>>>>>>> 5a4ed047eb8155f2e4273a3caeaac5d6026e6cf1
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}