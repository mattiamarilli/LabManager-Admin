import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    url:string = 'http://marilliaws.ddns.net/qrmarconi-backend/';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<boolean> {
        let headers = new HttpHeaders({
        });
        return this.http.post<User>(this.url + `login.php`, { username, password }, { headers: headers }).pipe(
            map((user: User ) => {
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