import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {IAuthUser} from '../model'
import {IAuthBody} from '../model_body'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<IAuthUser>;
    public currentUser: Observable<IAuthUser>;
    apiURL:string = '';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<IAuthUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    currentUserValue(): IAuthUser {
        return this.currentUserSubject.value;
    }

    login(auth:IAuthBody): Observable<boolean> {
        let headers = new HttpHeaders({
        });
        return this.http.post<IAuthUser>(this.apiURL + `admin/auth`, { auth }, { headers: headers }).pipe(
            map((user: IAuthUser ) => {
                
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
