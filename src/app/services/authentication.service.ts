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
    url:string = '';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    currentUserValue(): AuthUser {
        return this.currentUserSubject.value;
    }

    login(auth:Auth): Observable<boolean> {
        let headers = new HttpHeaders({
        });
        return this.http.post<AuthUser>(this.url + `login.php`, { auth }, { headers: headers }).pipe(
            map((user: AuthUser ) => {
                // login successful if there's a jwt token in the response
                console.log(user);
                if (user) {
                    
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
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