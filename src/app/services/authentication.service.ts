import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {AuthUser} from '../model'
import {Auth} from '../model_body'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<AuthUser>;
    public currentUser: Observable<AuthUser>;
    fakeloginvar:boolean = false;
    apiURL:string = '';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
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
        });
        return this.http.post<AuthUser>(this.apiURL + `admin/auth`, { auth }, { headers: headers }).pipe(
            map((user: AuthUser ) => {
                
                console.log(user);
                if (user) {

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                    return true;
                }

                return false;
            })
        )
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}