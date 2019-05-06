import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AuthUser} from '../model'
import {Auth} from '../model_body'
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;
<<<<<<< HEAD

=======
    fakeloginvar:boolean = false;
    apiURL:string = '';
>>>>>>> 5a4ed047eb8155f2e4273a3caeaac5d6026e6cf1

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }

    fakelogin()
    {
        this.fakeloginvar = true;
    }

    fakelogout()
    {
        this.fakeloginvar = false
    }

    returnfakelogin():boolean
    {
        return this.fakeloginvar;
    }

    login(auth:Auth): Observable<boolean> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        console.log(auth)
        return this.http.post<AuthUser>(environment.apiUrl + `/admin/auth`, JSON.stringify(auth), { headers: headers}).pipe(
           
            map((user: AuthUser ) => {
                console.log(user);
                if (user.id) {
                   sessionStorage.setItem('currentUser', JSON.stringify(user));
                   this.currentUserSubject.next(user);
                   return true;
                 }
                 else 
                    return false;
   
   
               })
        )
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}