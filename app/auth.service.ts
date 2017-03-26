import { Injectable } from '@angular/core';
import { User } from './login/user';
import { Login } from './login/login';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private url = 'http://localhost:3000/user/';
  constructor(private http: Http) { }
  public isLoggedIn: boolean = false;
  user: User;
  errorMessage: any;


  login(username: string, password: string): Observable<Login> {
    return (this.http.get(this.url + username + "/" + password)
      .map(this.extractData)
      .catch(this.handleError))
  }

  logout(): void {
    this.isLoggedIn = false;
  }


  private extractData(res: Response) {
    let body = <Login>res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

