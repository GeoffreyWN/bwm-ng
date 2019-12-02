import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment'
import 'rxjs/Rx'


class DecodedToken {
 exp: number = 0;
 username: string = ''
}

@Injectable()


export class AuthService {

    private decodedToken;

    constructor(public http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('bwm-meta')) || new DecodedToken();
    }

    private saveToken(token: string): string {
        // debugger;
        this.decodedToken = jwt.decode(token);

        localStorage.setItem('bwm_ng', token)
        localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken))

        return token
    }
    private getExpiration() {
        return moment.unix(this.decodedToken.exp)
    }


    public register(userData: any): Observable<any> {
        return this.http.post('http://localhost:3001/api/v1/users/register', userData)
    }

    public login(userData: any): Observable<any> {
        return this.http.post('http://localhost:3001/api/v1/users/auth', userData).map(
            (token: string)=> this.saveToken(token));
    }

    public logout() {
        localStorage.removeItem('bwm_ng')
        localStorage.removeItem('bwm_meta')
        this.decodedToken = new DecodedToken()
    }

    public isAuthenticated(): boolean {
        return moment().isBefore(this.getExpiration())
    }

    public getAuthToken() {
      return localStorage.getItem('bwm_ng')  
    }

    public getUsername() {
        return this.decodedToken.username
    }

    
}